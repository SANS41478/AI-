<template>
  <main class="page result" v-if="result">
    <div class="scan-card">
      <div class="scan-head">
        <span class="scan-tag">FINAL REPORT / 01</span>
        <span class="conf">置信度 {{ result.confidence }}%</span>
      </div>

      <div class="score-context">AI 嘉豪浓度</div>
      <div class="big-score">
        <span class="num" ref="scoreRef">{{ displayScore }}</span>
        <span class="pct">%</span>
      </div>
      <div class="tier-icon">{{ result.tier.icon }}</div>
      <div class="tier-title">{{ result.tier.title }}</div>
      <p class="tier-line">{{ result.tierLine }}</p>

      <div v-if="result.contradictions > 0" class="contra-warn">
        ⚠️ 检测到 {{ result.contradictions }} 处自相矛盾的信号——你的答案有点薛定谔，又懂又不懂，测完即坍缩。
      </div>
    </div>

    <section class="type-card">
      <div class="type-head"><span>PERSONALITY TYPE</span><strong>{{ result.type.code }}</strong></div>
      <div class="type-title">{{ result.type.title }}</div>
      <p class="type-desc">{{ result.type.desc }}</p>
    </section>

    <section class="dims">
      <div class="section-heading"><span>02 / PROFILE</span><h3 class="sec-title">维度拆解</h3></div>
      <div v-for="d in result.dims" :key="d.key" class="dim-row">
        <div class="dim-name">{{ d.name }}</div>
        <div class="dim-bars">
          <div class="bar-left">
            <span class="bar-label">{{ d.a.pole }} {{ d.a.pct }}%</span>
            <div class="bar-track">
              <div class="bar-fill left" :class="{ win: d.pole === d.a.pole }" :style="{ width: d.a.pct + '%' }"></div>
            </div>
          </div>
          <div class="bar-right">
            <span class="bar-label">{{ d.b.pct }}% {{ d.b.pole }}</span>
            <div class="bar-track">
              <div class="bar-fill right" :class="{ win: d.pole === d.b.pole }" :style="{ width: d.b.pct + '%' }"></div>
            </div>
          </div>
        </div>
        <p class="dim-comment">「{{ d.comment }}」</p>
      </div>
    </section>

    <section v-if="result.achievements.length" class="ach">
      <div class="section-heading"><span>03 / UNLOCKED</span><h3 class="sec-title">成就解锁</h3></div>
      <div v-for="a in result.achievements" :key="a.id" class="ach-item">
        <span class="ach-icon">{{ a.icon }}</span>
        <div>
          <b>{{ a.name }}</b>
          <p>{{ a.desc }}</p>
        </div>
      </div>
    </section>

    <section class="share">
      <div class="section-heading"><span>04 / SHARE</span><h3 class="sec-title">分享你的浓度</h3></div>
      <ShareCard :result="result" />
      <div class="btn-row">
        <button class="btn primary" @click="$emit('resample')">换一批题再测</button>
        <button class="btn" @click="$emit('retest')">再测一次</button>
        <button class="btn ghost" @click="$emit('home')">返回首页</button>
      </div>
    </section>

    <footer class="foot">AI嘉豪浓度测试 · 分层抽样 + 交叉验证 + 置信度评估 · 纯娱乐，别当真</footer>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ShareCard from './ShareCard.vue'

const props = defineProps({
  result: { type: Object, required: true }
})
defineEmits(['retest', 'resample', 'home'])

const displayScore = ref(0)
const scoreRef = ref(null)

function countUp(target) {
  const duration = 1200
  const start = performance.now()
  function frame(now) {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    displayScore.value = Math.round(target * eased)
    if (t < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(() => countUp(props.result.concentration))
watch(
  () => props.result,
  () => countUp(props.result.concentration)
)
</script>
