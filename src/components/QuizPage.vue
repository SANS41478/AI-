<template>
  <main class="page quiz">
    <header class="quiz-top">
      <div class="counter">
        第 <b>{{ current + 1 }}</b> / {{ quiz.quiz.value.length }} 题
      </div>
      <div class="progress">
        <div class="progress-fill" :style="{ width: quiz.progress.value + '%' }"></div>
      </div>
    </header>

    <transition name="slide" mode="out-in">
      <div :key="current" class="q-card">
        <div class="q-module">{{ moduleName }}</div>
        <h2 class="q-text">{{ q.text }}</h2>
        <div class="options">
          <button
            v-for="(opt, i) in q.options"
            :key="i"
            class="option"
            :class="{ selected: selected === i, answered: selected !== -1 && selected !== i }"
            @click="quiz.select(i)"
          >
            <span class="opt-tag">{{ 'ABCD'[i] }}</span>
            <span class="opt-text">{{ opt.text }}</span>
            <span v-if="selected === i" class="opt-check">✓</span>
          </button>
        </div>
      </div>
    </transition>

    <div class="nav-row">
      <button class="btn ghost" :disabled="current === 0" @click="quiz.prev()">上一题</button>
      <button v-if="!quiz.isDone.value" class="btn" :disabled="selected === -1" @click="quiz.next()">
        下一题
      </button>
      <button v-else class="btn primary" :disabled="selected === -1" @click="$emit('finish')">
        检测完成 → 查看结果
      </button>
    </div>

    <div class="meter" :class="'tone-' + quiz.meter.value.tone">
      <div class="meter-head">
        <span class="meter-title">▚ 嘉豪探测仪</span>
        <span class="meter-label">{{ quiz.meter.value.label }}</span>
        <span class="meter-pct">{{ quiz.meter.value.pct }}%</span>
      </div>
      <div class="meter-track">
        <div class="meter-fill" :style="{ width: quiz.meter.value.pct + '%' }"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  quiz: { type: Object, required: true }
})
defineEmits(['finish'])

const MODULES = {
  M1: '炫耀行为',
  M2: '术语话术',
  M3: '真实知识',
  M4: '跟风 FOMO',
  M5: '态度嘴硬',
  M6: '自我认知'
}

const current = computed(() => props.quiz.current.value)
const q = computed(() => props.quiz.quiz.value[current.value])
const selected = computed(() => props.quiz.answers.value[current.value])
const moduleName = computed(() => MODULES[q.value?.module] || '')
</script>