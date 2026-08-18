<script setup>
import { ref, shallowRef } from 'vue'
import { useQuiz } from './composables/useQuiz.js'
import HomePage from './components/HomePage.vue'
import QuizPage from './components/QuizPage.vue'
import ResultPage from './components/ResultPage.vue'

const view = ref('home')
const quiz = useQuiz()
const result = shallowRef(null)

function start() {
  quiz.startNew(true)
  result.value = null
  view.value = 'quiz'
}

function finish() {
  result.value = quiz.computeResult()
  view.value = 'result'
}

function retest(samePool) {
  quiz.startNew(!samePool)
  result.value = null
  view.value = 'quiz'
}

function goHome() {
  view.value = 'home'
}
</script>

<template>
  <div class="shell">
    <HomePage v-if="view === 'home'" @start="start" />
    <QuizPage v-else-if="view === 'quiz'" :quiz="quiz" @finish="finish" />
    <ResultPage
      v-else-if="view === 'result'"
      :result="result"
      @retest="retest(false)"
      @resample="retest(true)"
      @home="goHome"
    />
  </div>
</template>