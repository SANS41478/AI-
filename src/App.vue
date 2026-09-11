<script setup>
import { ref, shallowRef } from 'vue'
import { useQuiz } from './composables/useQuiz.js'
import HomePage from './components/HomePage.vue'
import QuizPage from './components/QuizPage.vue'
import ResultPage from './components/ResultPage.vue'

const view = ref('home')
const quiz = useQuiz()
const result = shallowRef(null)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function start() {
  quiz.startNew(true)
  result.value = null
  view.value = 'quiz'
  scrollToTop()
}

function finish() {
  result.value = quiz.computeResult()
  view.value = 'result'
  scrollToTop()
}

function retest(samePool) {
  quiz.startNew(!samePool)
  result.value = null
  view.value = 'quiz'
  scrollToTop()
}

function goHome() {
  view.value = 'home'
  scrollToTop()
}
</script>

<template>
  <div class="shell">
    <Transition name="page" mode="out-in">
      <HomePage v-if="view === 'home'" key="home" @start="start" />
      <QuizPage v-else-if="view === 'quiz'" key="quiz" :quiz="quiz" @finish="finish" />
      <ResultPage
        v-else-if="view === 'result'"
        key="result"
        :result="result"
        @retest="retest(false)"
        @resample="retest(true)"
        @home="goHome"
      />
    </Transition>
  </div>
</template>
