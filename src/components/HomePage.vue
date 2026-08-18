<template>
  <main class="page home">
    <div class="glitch-wrap">
      <h1 class="glitch" data-text="AI嘉豪浓度测试">AI嘉豪浓度测试</h1>
    </div>
    <p class="sub">测测你是真懂 AI，还是懂装 AI</p>

    <div class="intro">
      <p>
        AI 火了大半年，人人都在聊大模型。有人真懂，有人装懂，还有人一边不懂一边指点江山——
        后者我们统称为「AI 嘉豪」。
      </p>
      <p>
        本测试从 <b>40 题题库</b> 中随机抽取 25 题，用 6 大行为模块 + 4 个维度，
        检测你体内的嘉豪浓度，并生成你的专属嘉豪档案。
      </p>
    </div>

    <div class="badges">
      <span>🎲 每测抽题不同</span>
      <span>⏱️ 约 3 分钟</span>
      <span>🧬 25 题 · 双轨计分</span>
    </div>

    <button class="btn primary big" @click="$emit('start')">开始检测</button>
    <p class="tip">凭第一反应作答，别装，反正你装不过 AI。</p>

    <footer class="foot">
      <span class="blink">▍</span> 测评模型：分层抽样 · 交叉验证 · 置信度评估
    </footer>
  </main>
</template>