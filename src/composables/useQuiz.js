import { ref, computed } from 'vue'
import { QUESTIONS, SAMPLE_SIZE, MODULE_SAMPLES } from '../data/questions.js'
import { TIERS, TYPES, DIMS, DIM_COMMENTS, DIM_NEUTRAL, ACHIEVEMENTS } from '../data/results.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n)
}

// 分层抽样：每模块按配额抽题，保证 6 大模块全覆盖
function sampleQuestions() {
  const picked = []
  for (const [module, count] of Object.entries(MODULE_SAMPLES)) {
    const pool = QUESTIONS.filter((q) => q.module === module)
    picked.push(...pickRandom(pool, Math.min(count, pool.length)))
  }
  // 暖场：前 2 题放行为观察类（M1/M2/M3），建立代入感
  const behavioral = picked.filter((q) => ['M1', 'M2', 'M3'].includes(q.module))
  const rest = picked.filter((q) => !['M1', 'M2', 'M3'].includes(q.module))
  const warmup = pickRandom(behavioral, Math.min(2, behavioral.length))
  const others = shuffle(behavioral.filter((q) => !warmup.includes(q)).concat(rest))
  return warmup.concat(others).slice(0, SAMPLE_SIZE)
}

export function useQuiz() {
  const quiz = ref([]) // 本次抽到的题目（顺序即作答顺序）
  const answers = ref([]) // answer[i] = 选中选项的 index（-1 = 未答）
  const current = ref(0)
  const noise = ref(0) // 探测仪模糊噪声（每次作答重掷，防反推权重）

  function startNew(resample = true) {
    if (resample) quiz.value = sampleQuestions()
    else quiz.value = shuffle(quiz.value)
    answers.value = new Array(quiz.value.length).fill(-1)
    current.value = 0
    noise.value = 0
  }

  function select(optionIndex) {
    answers.value[current.value] = optionIndex
    // 探测仪噪声：±8% 内的随机扰动，只展示大致趋势
    noise.value = Math.round((Math.random() * 16 - 8) * 10) / 10
  }

  function next() {
    if (current.value < quiz.value.length - 1) current.value++
  }

  function prev() {
    if (current.value > 0) current.value--
  }

  const answeredCount = computed(() => answers.value.filter((a) => a !== -1).length)
  const isDone = computed(() => answeredCount.value === quiz.value.length)
  const progress = computed(() =>
    quiz.value.length ? (answeredCount.value / quiz.value.length) * 100 : 0
  )

  // 探测仪：模糊实时读数（真实值 ± 噪声）
  const meter = computed(() => {
    if (!quiz.value.length) return { pct: 0, label: '待机中', tone: 'idle' }
    let sum = 0
    let max = 0
    quiz.value.forEach((q, i) => {
      max += 3
      if (answers.value[i] !== -1) sum += q.options[answers.value[i]].weight
    })
    const real = max ? (sum / max) * 100 : 0
    const pct = Math.max(0, Math.min(100, Math.round(real + noise.value)))
    let label = '信号微弱'
    let tone = 'green'
    if (pct >= 25 && pct < 50) { label = '信号增强中'; tone = 'green' }
    else if (pct >= 50 && pct < 75) { label = '检测到高浓度样本'; tone = 'yellow' }
    else if (pct >= 75) { label = '警告：浓度即将爆表'; tone = 'red' }
    return { pct, label, tone }
  })

  // 计分 + 结果
  function computeResult() {
    const totalWeight = quiz.value.reduce((s, q) => s + q.options[answers.value[quiz.value.indexOf(q)]].weight, 0)

    // —— 浓度分 ——
    const maxWeight = quiz.value.length * 3
    const concentration = Math.round((totalWeight / maxWeight) * 100)

    // —— 维度分（每极按动态满分归一化：满分 = Σ 每题该极最大可得票数）——
    const voteSum = {}
    const voteMax = {}
    DIMS.forEach((d) => {
      voteSum[d.key] = { [d.poles[0]]: 0, [d.poles[1]]: 0 }
      voteMax[d.key] = { [d.poles[0]]: 0, [d.poles[1]]: 0 }
    })
    quiz.value.forEach((q, qi) => {
      const qMax = {}
      DIMS.forEach((d) => {
        qMax[d.key] = { [d.poles[0]]: 0, [d.poles[1]]: 0 }
      })
      q.options.forEach((opt) => {
        DIMS.forEach((d) => {
          d.poles.forEach((pole) => {
            const v = opt.votes?.[d.key]?.[pole] ?? 0
            if (v > qMax[d.key][pole]) qMax[d.key][pole] = v
          })
        })
      })
      DIMS.forEach((d) => {
        d.poles.forEach((pole) => {
          voteMax[d.key][pole] += qMax[d.key][pole]
        })
      })
      const opt = q.options[answers.value[qi]]
      if (opt.votes) {
        DIMS.forEach((d) => {
          d.poles.forEach((pole) => {
            const v = opt.votes[d.key]?.[pole] ?? 0
            if (v) voteSum[d.key][pole] += v
          })
        })
      }
    })

    const dims = DIMS.map((d) => {
      const [p0, p1] = d.poles
      const pct = (p) =>
        voteMax[d.key][p] ? Math.round((voteSum[d.key][p] / voteMax[d.key][p]) * 100) : 0
      const a = pct(p0)
      const b = pct(p1)
      const pole = a === b ? d.lowPole : a > b ? p0 : p1
      let comment
      const winnerPct = Math.max(a, b)
      if (winnerPct >= 60) {
        const lines = DIM_COMMENTS[pole] || []
        comment = lines[Math.floor(Math.random() * lines.length)]
      } else {
        comment = DIM_NEUTRAL
      }
      return {
        key: d.key,
        name: d.name,
        poles: d.poles,
        pole,
        pct: (p) => pct(p),
        a: { pole: p0, pct: a },
        b: { pole: p1, pct: b },
        comment
      }
    })

    const code = dims.map((d) => d.pole).join('')
    const type = TYPES[code]

    // —— 交叉验证：矛盾检测（组内两题答案方向相反 → 1 处矛盾）——
    const groups = {}
    quiz.value.forEach((q, i) => {
      if (q.contra) {
        if (!groups[q.contra.group]) groups[q.contra.group] = []
        const side = q.options[answers.value[i]].c
        if (side !== undefined) groups[q.contra.group].push(side)
      }
    })
    let contradictions = 0
    Object.values(groups).forEach((pair) => {
      if (pair.length >= 2 && pair[0] !== pair[1]) contradictions++
    })
    const confidence = Math.max(55, 100 - contradictions * 15)

    // —— 附加统计（成就用）——
    let zeroCount = 0
    let maxStreak = 0
    let streak = 0
    quiz.value.forEach((q, i) => {
      const opt = q.options[answers.value[i]]
      if (opt.weight === 0) zeroCount++
      if (opt.weight === 3) {
        streak++
        maxStreak = Math.max(maxStreak, streak)
      } else {
        streak = 0
      }
    })

    const tier = TIERS.find((t) => concentration >= t.min && concentration <= t.max)
    const achievements = ACHIEVEMENTS.filter((a) =>
      a.check({
        concentration,
        type: { code },
        dims,
        zeroShare: zeroCount / quiz.value.length,
        maxStreak,
        contradictions
      })
    )

    return {
      concentration,
      tier,
      tierLine: tier.lines[Math.floor(Math.random() * tier.lines.length)],
      type: { code, title: type.title, desc: type.desc },
      dims,
      contradictions,
      confidence,
      achievements,
      totalQuestions: quiz.value.length
    }
  }

  return { quiz, answers, current, startNew, select, next, prev, answeredCount, isDone, progress, meter, computeResult }
}