<template>
  <main class="page home">
    <header class="home-header">
      <div class="brand-lockup">
        <span class="brand-mark">A</span>
        <span>AI 嘉豪实验室</span>
        <span class="brand-meta">PERSONALITY SIGNALS · 2026</span>
      </div>
      <div class="eyebrow">PERSONALITY SIGNAL REPORT</div>
      <h1>你的 AI 浓度，<span>到底有多高？</span></h1>
      <p class="sub">一份 3 分钟完成的轻量测评，看看你是真懂、会用，还是只是很会聊。</p>
    </header>

    <section class="home-grid">
      <div class="intro">
        <div class="section-label">这份报告会告诉你</div>
        <p>
          AI 浪潮里，有人把工具用得很稳，有人把术语说得很响。我们从
          <b>40 题题库</b> 中随机抽取 25 题，观察你的真实选择，生成一份专属的嘉豪档案。
        </p>
        <div class="feature-list">
          <div class="feature-item"><span>01</span><div><b>六大行为模块</b><small>从炫耀行为到自我认知，覆盖日常语境</small></div></div>
          <div class="feature-item"><span>02</span><div><b>四维人格画像</b><small>懂 / 装、藏 / 秀、稳 / 热、诚 / 吹</small></div></div>
          <div class="feature-item"><span>03</span><div><b>交叉验证机制</b><small>同一件事，换个问法再看一次</small></div></div>
        </div>
      </div>

      <aside class="launch-panel">
        <div class="panel-topline"><span>TEST READY</span><span class="status-dot"></span></div>
        <div class="launch-title">准备好面对<br /><strong>真实的你</strong>了吗？</div>
        <div class="stat-grid">
          <div><strong>25</strong><span>道题目</span></div>
          <div><strong>03</strong><span>分钟完成</span></div>
          <div><strong>04</strong><span>维度报告</span></div>
        </div>
        <button class="btn primary big" @click="$emit('start')">
          开始测评 <span aria-hidden="true">↗</span>
        </button>
        <p class="tip">凭第一反应作答，不需要搜索，也不用表现得很懂。</p>
      </aside>
    </section>

    <footer class="foot">
      <span class="blink">●</span> 分层抽样 · 动态计分 · 纯娱乐测评
    </footer>
  </main>
</template>
