<template>
  <div class="share-wrap">
    <canvas ref="canvasRef" :width="W" :height="H" class="share-canvas" role="img" aria-label="AI嘉豪浓度检测报告分享卡片"></canvas>
    <button class="btn primary small" @click="download">保存图片</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { SHARE_TAGLINES } from '../data/results.js'

const props = defineProps({
  result: { type: Object, required: true }
})

const W = 750
const H = 1000
const canvasRef = ref(null)
const tagline = SHARE_TAGLINES[Math.floor(Math.random() * SHARE_TAGLINES.length)]

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const r = props.result

  // 背景渐变
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#0b0e12')
  bg.addColorStop(0.55, '#12181f')
  bg.addColorStop(1, '#182129')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // 轻微纸张纹理
  ctx.fillStyle = 'rgba(255,255,255,0.025)'
  for (let y = 0; y < H; y += 8) ctx.fillRect(0, y, W, 1)

  // 四角装饰点阵
  ctx.fillStyle = 'rgba(167,232,207,0.62)'
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath()
      ctx.arc(40 + i * 22, 40 + j * 22, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 顶部标题
  ctx.fillStyle = '#a7e8cf'
  ctx.font = 'bold 34px "Microsoft YaHei", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('AI嘉豪浓度测试', W / 2, 90)

  ctx.fillStyle = 'rgba(244,246,245,0.5)'
  ctx.font = '24px "Microsoft YaHei", sans-serif'
  ctx.fillText('— 检测报告 —', W / 2, 130)

  // 分数
  ctx.shadowColor = '#a7e8cf'
  ctx.shadowBlur = 40
  ctx.fillStyle = '#a7e8cf'
  ctx.font = 'bold 200px "Microsoft YaHei", sans-serif'
  ctx.fillText(r.concentration + '%', W / 2, 380)
  ctx.shadowBlur = 0

  // 段位称号
  ctx.fillStyle = '#f4f6f5'
  ctx.font = 'bold 44px "Microsoft YaHei", sans-serif'
  ctx.fillText(r.tier.icon + ' ' + r.tier.title, W / 2, 460)

  // 分隔线
  ctx.strokeStyle = 'rgba(167,232,207,0.35)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(120, 520)
  ctx.lineTo(W - 120, 520)
  ctx.stroke()

  // 类型
  ctx.fillStyle = '#a7e8cf'
  ctx.font = 'bold 30px "Microsoft YaHei", sans-serif'
  ctx.fillText('类型 · ' + r.type.code + ' 「' + r.type.title + '」', W / 2, 580)

  // 卡片区
  const cardX = 90
  const cardY = 640
  const cardW = W - 180
  const cardH = 190
  ctx.fillStyle = 'rgba(167,232,207,0.09)'
  rr(ctx, cardX, cardY, cardW, cardH, 20)
  ctx.fill()
  ctx.strokeStyle = 'rgba(167,232,207,0.4)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.fillStyle = 'rgba(244,246,245,0.85)'
  ctx.font = '28px "Microsoft YaHei", sans-serif'
  const lines = wrapText(ctx, r.type.desc, cardW - 60)
  const startY = cardY + 60
  lines.slice(0, 4).forEach((line, i) => {
    ctx.fillText(line, W / 2, startY + i * 40)
  })

  // 底部文案
  ctx.fillStyle = '#a7e8cf'
  ctx.font = '26px "Microsoft YaHei", sans-serif'
  ctx.fillText('「' + tagline + '」', W / 2, 890)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '22px "Microsoft YaHei", sans-serif'
  ctx.fillText('扫描上方报告 · 看看谁是下一个嘉豪', W / 2, 940)
}

function wrapText(ctx, text, maxWidth) {
  const chars = text.split('')
  const lines = []
  let line = ''
  for (const ch of chars) {
    if (ctx.measureText(line + ch).width > maxWidth) {
      lines.push(line)
      line = ch
    } else {
      line += ch
    }
  }
  if (line) lines.push(line)
  return lines
}

function download() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '我的AI嘉豪浓度-' + props.result.concentration + '%.png'
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}

onMounted(draw)
watch(() => props.result, draw)
</script>
