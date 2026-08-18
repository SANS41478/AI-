// 题库池：40 题，每次测试按模块分层抽样 25 题
// 每题：module(模块) / mainDim(主维度) / contra(交叉验证分组，可选)
// 选项：weight = 嘉豪值 0~3；votes = 维度投票 { 维度: { 极性: 票数 } }，主 1 分 / 次 0.5 分
// 四维：know(知识 懂/装) show(表达 藏/秀) motiv(动机 稳/热) att(态度 诚/吹)

export const QUESTIONS = [
  {
    id: 1,
    module: 'M2',
    mainDim: 'know',
    text: '朋友聊起 AI 时，你会？',
    options: [
      { text: '默默听，不懂的地方悄悄查', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '简单附和两句', weight: 1, votes: {} },
      { text: '用"大模型、Transformer、多模态"接话，氛围越装越好', weight: 3, votes: { know: { 装: 1 } } },
      { text: '顺势纠正对方："你连 prompt 都写不明白"', weight: 2, votes: { know: { 装: 0.5 }, att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 2,
    module: 'M1',
    mainDim: 'show',
    contra: { group: 'C' },
    text: '你多久发一次和 AI 有关的朋友圈？',
    options: [
      { text: '从不发', weight: 0, votes: { show: { 藏: 1 } }, c: 0 },
      { text: '偶尔发点有用的干货', weight: 1, votes: { show: { 藏: 0.5 } }, c: 0 },
      { text: '经常晒 AI 生成的图/代码/心得', weight: 3, votes: { show: { 秀: 1 } }, c: 1 },
      { text: '深夜发"我悟了"，配一句抽象感叹', weight: 2, votes: { show: { 秀: 0.5 }, motiv: { 热: 0.5 } }, c: 1 }
    ]
  },
  {
    id: 3,
    module: 'M5',
    mainDim: 'att',
    text: '有人说"我让 AI 帮我写了个小程序"，你的第一反应？',
    options: [
      { text: '挺厉害，问问他用的啥', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '这也算写程序？', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '"我上周让 AI 帮我部署了一整套 K8s"', weight: 3, votes: { know: { 装: 1 } } },
      { text: '无感，跟我没啥关系', weight: 1, votes: { motiv: { 稳: 0.5 } } }
    ]
  },
  {
    id: 4,
    module: 'M4',
    mainDim: 'motiv',
    text: '你怎么看待"现在人人都在聊 AI"？',
    options: [
      { text: '正常，技术浪潮而已', weight: 0, votes: { motiv: { 稳: 1 } } },
      { text: '大多数人都是装懂，只有我真懂', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '风口来了，得赶紧上车', weight: 3, votes: { motiv: { 热: 1 } } },
      { text: 'AI 爱咋咋地，跟我关系不大', weight: 1, votes: { motiv: { 稳: 0.5 }, show: { 藏: 0.5 } } }
    ]
  },
  {
    id: 5,
    module: 'M2',
    mainDim: 'know',
    text: '别人问你"什么是大模型"，你会？',
    options: [
      { text: '用大白话讲清楚原理和局限', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '讲个大概，再推几个教程', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '甩一句"你去看看论文，很简单的"', weight: 2, votes: { know: { 装: 1 } } },
      { text: '术语轰炸：参数、上下文窗口、涌现能力……', weight: 3, votes: { know: { 装: 0.5 }, show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 6,
    module: 'M5',
    mainDim: 'att',
    text: '别人在你面前炫耀他的 AI 玩法，你会？',
    options: [
      { text: '觉得挺有意思，认真聊', weight: 0, votes: { att: { 诚: 1 }, know: { 懂: 0.5 } } },
      { text: '默默记下，回去自己试', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '心里对比：我的肯定比他高级', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '当场掏出一个更秀的，谁也不服谁', weight: 3, votes: { know: { 装: 0.5 }, att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 7,
    module: 'M4',
    mainDim: 'motiv',
    contra: { group: 'B' },
    text: '你手机里的 AI 相关 App / 收藏夹有多少？',
    options: [
      { text: '就几个常用的', weight: 0, votes: { motiv: { 稳: 1 } }, c: 0 },
      { text: '十几个，每天换着试"哪个最好用"', weight: 3, votes: { motiv: { 热: 1 } }, c: 1 },
      { text: '几十个，大部分装完没打开过', weight: 2, votes: { motiv: { 热: 0.5 }, know: { 装: 0.5 } }, c: 1 },
      { text: '一个没装，但不妨碍我跟别人聊 AI', weight: 2, votes: { att: { 吹: 0.5 } }, c: 0 }
    ]
  },
  {
    id: 8,
    module: 'M2',
    mainDim: 'know',
    text: '你会在聊天中主动抛出 AI 专业名词吗？',
    options: [
      { text: '基本不会，能说人话就说人话', weight: 0, votes: { know: { 懂: 1 }, show: { 藏: 0.5 } } },
      { text: '看场合，跟懂的人聊才用', weight: 1, votes: { motiv: { 稳: 0.5 } } },
      { text: '会，"RAG、Agent、上下文窗口"张嘴就来', weight: 3, votes: { know: { 装: 1 } } },
      { text: '只发英文缩写，显得更专业', weight: 2, votes: { know: { 装: 0.5 }, show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 9,
    module: 'M4',
    mainDim: 'motiv',
    text: '看到"AI 将取代 XX 职业"的热搜，你会？',
    options: [
      { text: '理性看待，标题党而已', weight: 0, votes: { motiv: { 稳: 1 }, know: { 懂: 0.5 } } },
      { text: '转发朋友圈："我早就说了"', weight: 2, votes: { show: { 秀: 1 } } },
      { text: '焦虑，赶紧报课学习', weight: 3, votes: { motiv: { 热: 1 } } },
      { text: '觉得全是炒作，嗤之以鼻', weight: 1, votes: { motiv: { 稳: 0.5 } } }
    ]
  },
  {
    id: 10,
    module: 'M3',
    mainDim: 'know',
    text: '你让 AI 干过最"厉害"的事是什么？',
    options: [
      { text: '写文案/翻译/总结，日常效率工具', weight: 0, votes: { motiv: { 稳: 1 } } },
      { text: '生成了一堆好看的图', weight: 1, votes: { show: { 秀: 0.5 } } },
      { text: '用 AI 写脚本，然后跟人说"我做了个项目"', weight: 2, votes: { know: { 装: 1 } } },
      { text: '"我训练了自己的模型"（其实是调现成接口）', weight: 3, votes: { att: { 吹: 1 } } }
    ]
  },
  {
    id: 11,
    module: 'M1',
    mainDim: 'show',
    text: '自我介绍 / 个人简介里，你会怎么提 AI？',
    options: [
      { text: '完全不提', weight: 0, votes: { show: { 藏: 1 } } },
      { text: '"会用一些 AI 工具"', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '"AI 深度使用者"', weight: 2, votes: { show: { 秀: 1 } } },
      { text: '"AI 从业者 / AI 布道者"（其实只是重度使用）', weight: 3, votes: { att: { 吹: 1 } } }
    ]
  },
  {
    id: 12,
    module: 'M5',
    mainDim: 'att',
    text: '当别人指出你说的 AI 知识有错时？',
    options: [
      { text: '感谢对方，马上去核实', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '有点尴尬，含糊过去', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '坚持自己没错："你那是过时信息"', weight: 3, votes: { att: { 吹: 1 } } },
      { text: '反手一句："你自己懂吗？"', weight: 2, votes: { att: { 吹: 0.5 }, know: { 装: 0.5 } } }
    ]
  },
  {
    id: 13,
    module: 'M1',
    mainDim: 'show',
    contra: { group: 'C' },
    text: '在群里分享 AI 内容时，你是什么心态？',
    options: [
      { text: '觉得有用才分享', weight: 0, votes: { att: { 诚: 1 } }, c: 0 },
      { text: '分享是为了显得自己懂', weight: 3, votes: { show: { 秀: 1 } }, c: 1 },
      { text: '很少分享', weight: 0, votes: { show: { 藏: 1 } }, c: 0 },
      { text: '分享自己用 AI 做的"大作"', weight: 2, votes: { show: { 秀: 0.5 }, know: { 装: 0.5 } }, c: 1 }
    ]
  },
  {
    id: 14,
    module: 'M6',
    mainDim: 'att',
    contra: { group: 'A' },
    text: '遇到听不懂的 AI 概念，你通常？',
    options: [
      { text: '当场问，不懂就说不懂', weight: 0, votes: { att: { 诚: 1 } }, c: 0 },
      { text: '先记下来，回头查清楚', weight: 1, votes: { att: { 诚: 0.5 }, know: { 懂: 0.5 } }, c: 0 },
      { text: '装作听懂了，点头附和', weight: 2, votes: { know: { 装: 1 } }, c: 1 },
      { text: '不但装懂，还能顺着往下编一段', weight: 3, votes: { att: { 吹: 1 } }, c: 1 }
    ]
  },
  {
    id: 15,
    module: 'M4',
    mainDim: 'motiv',
    text: '你关注了多少 AI 公众号 / 博主？',
    options: [
      { text: '几个，取关比关注多', weight: 0, votes: { motiv: { 稳: 1 } } },
      { text: '十几个，每天刷"AI 日报"', weight: 2, votes: { motiv: { 热: 1 } } },
      { text: '几十个，置顶一堆"未来已来"', weight: 3, votes: { motiv: { 热: 0.5 }, show: { 秀: 0.5 } } },
      { text: '一个不关注，但吹得比谁都响', weight: 2, votes: { att: { 吹: 1 } } }
    ]
  },
  {
    id: 16,
    module: 'M3',
    mainDim: 'know',
    text: '有人请你推荐 AI 工具，你会？',
    options: [
      { text: '推荐自己真用的，说清优缺点', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '推荐最新最火的，自己其实没用过', weight: 2, votes: { motiv: { 热: 1 } } },
      { text: '列一串术语让他自己选', weight: 1, votes: { know: { 装: 0.5 } } },
      { text: '"这都要问我？你先去搜搜吧"', weight: 3, votes: { att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 17,
    module: 'M6',
    mainDim: 'att',
    text: '客观评价，你对 AI 的理解在什么水平？',
    options: [
      { text: '还在学习中，差得远', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '比身边大多数人强一点', weight: 1, votes: {} },
      { text: '已经比"大多数人"高出好几个维度了', weight: 3, votes: { att: { 吹: 1 } } },
      { text: '"我已经是 AI 本体了"（玩梗）', weight: 2, votes: { know: { 装: 0.5 } } }
    ]
  },
  {
    id: 18,
    module: 'M4',
    mainDim: 'motiv',
    text: '深夜一个人的时候，你会想什么？',
    options: [
      { text: '明天中午吃啥', weight: 0, votes: { motiv: { 稳: 1 } } },
      { text: '工作/生活的琐事', weight: 0, votes: { motiv: { 稳: 0.5 } } },
      { text: 'AI 会不会取代我？我要怎么抓住风口', weight: 3, votes: { motiv: { 热: 1 } } },
      { text: '在焦虑和兴奋间反复横跳，然后发条"赛博孤独"', weight: 2, votes: { show: { 秀: 0.5 }, motiv: { 热: 0.5 } } }
    ]
  },
  {
    id: 19,
    module: 'M5',
    mainDim: 'att',
    text: '看到别人用 AI 用得"很菜"，你会？',
    options: [
      { text: '热心教他几招', weight: 0, votes: { att: { 诚: 1 }, know: { 懂: 0.5 } } },
      { text: '心里暗爽：看，我比他强', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '当面点评："你这个 prompt 写得也太烂了"', weight: 3, votes: { know: { 装: 0.5 }, show: { 秀: 0.5 } } },
      { text: '默默截图发小群吐槽', weight: 1, votes: { show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 20,
    module: 'M3',
    mainDim: 'know',
    text: '你了解"AI 幻觉"吗？',
    options: [
      { text: '了解，能举出真实案例', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '听过，大概知道意思', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '"幻觉？AI 也会做梦吗哈哈"', weight: 1, votes: { know: { 装: 0.5 } } },
      { text: '"幻觉只是小问题，AI 早就全面超越人类了"', weight: 3, votes: { att: { 吹: 1 } } }
    ]
  },
  {
    id: 21,
    module: 'M1',
    mainDim: 'show',
    text: '你折腾 AI 环境 / 工具卡住时？',
    options: [
      { text: '看文档查报错，慢慢啃', weight: 0, votes: { know: { 懂: 1 }, motiv: { 稳: 0.5 } } },
      { text: '卡住就找人帮忙', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '死磕到凌晨，然后发"终于跑通了"', weight: 2, votes: { show: { 秀: 1 } } },
      { text: '其实没成功，但对外说"早跑起来了"', weight: 3, votes: { know: { 装: 1 } } }
    ]
  },
  {
    id: 22,
    module: 'M4',
    mainDim: 'motiv',
    text: '有人当面对你说"我不太懂 AI"，你会？',
    options: [
      { text: '安利几个简单的工具', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '"现在不懂 AI 就要被淘汰了"', weight: 3, votes: { motiv: { 热: 1 }, att: { 吹: 0.5 } } },
      { text: '嘴上不说，心里觉得比他先进', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '"你居然不懂？"+ 意味深长的表情', weight: 2, votes: { know: { 装: 0.5 }, show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 23,
    module: 'M6',
    mainDim: 'att',
    contra: { group: 'A' },
    text: '你有没有为了"显得懂"而假装听懂 AI 话题？',
    options: [
      { text: '从不，不懂就说', weight: 0, votes: { att: { 诚: 1 } }, c: 0 },
      { text: '偶尔，但事后会补课', weight: 1, votes: { att: { 诚: 0.5 }, know: { 懂: 0.5 } }, c: 0 },
      { text: '经常，反正没人较真', weight: 2, votes: { know: { 装: 1 } }, c: 1 },
      { text: '每次都这样，还主动加入讨论', weight: 3, votes: { know: { 装: 0.5 }, att: { 吹: 0.5 } }, c: 1 }
    ]
  },
  {
    id: 24,
    module: 'M1',
    mainDim: 'show',
    text: '你的技能清单 / 简介里，AI 占什么位置？',
    options: [
      { text: '只是众多工具之一', weight: 0, votes: { motiv: { 稳: 1 }, know: { 懂: 0.5 } } },
      { text: '单独一行加粗："精通 AI"', weight: 3, votes: { show: { 秀: 1 } } },
      { text: '重要，但不会刻意提', weight: 1, votes: { show: { 藏: 1 } } },
      { text: '其实没系统学过，但清单里必须有', weight: 2, votes: { know: { 装: 1 } } }
    ]
  },
  {
    id: 25,
    module: 'M6',
    mainDim: 'att',
    text: '朋友夸"你真的很懂 AI"，你会？',
    options: [
      { text: '"不敢当，还在学"', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '"还行吧，够用"', weight: 1, votes: { motiv: { 稳: 0.5 } } },
      { text: '"低调，基本操作"', weight: 2, votes: { know: { 装: 1 } } },
      { text: '"我早说过 AI 是未来，现在验证了吧"', weight: 3, votes: { att: { 吹: 0.5 }, show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 26,
    module: 'M2',
    mainDim: 'att',
    text: '有人跟你说"我准备学 AI"，你会？',
    options: [
      { text: '给点实在的建议', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '"劝退，现在入行太晚了"', weight: 2, votes: { att: { 吹: 1 } } },
      { text: '"跟我学，三个月带你飞"', weight: 3, votes: { att: { 吹: 0.5 }, show: { 秀: 0.5 } } },
      { text: '"先去把 Python 学了再说"', weight: 1, votes: { know: { 懂: 0.5 } } }
    ]
  },
  {
    id: 27,
    module: 'M1',
    mainDim: 'show',
    text: '你在社交平台晒过"AI 跑出来的成果"吗？',
    options: [
      { text: '晒过，标注了是 AI 生成', weight: 1, votes: { show: { 秀: 1 } } },
      { text: '晒过，故意不说是 AI 的', weight: 3, votes: { know: { 装: 0.5 }, show: { 秀: 0.5 } } },
      { text: '没晒过，自己留着', weight: 0, votes: { show: { 藏: 1 } } },
      { text: '晒过，还写了"我创作的"', weight: 2, votes: { att: { 吹: 0.5 }, show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 28,
    module: 'M4',
    mainDim: 'motiv',
    text: '你对"AI 要替代程序员"这话的看法？',
    options: [
      { text: '言之过早，看具体场景', weight: 0, votes: { motiv: { 稳: 1 }, know: { 懂: 0.5 } } },
      { text: '说得对，我都开始转行了', weight: 3, votes: { motiv: { 热: 1 } } },
      { text: '正好，反正我也不会写代码', weight: 1, votes: { know: { 装: 0.5 } } },
      { text: '我被这句话整焦虑过', weight: 2, votes: { motiv: { 热: 1 } } }
    ]
  },
  {
    id: 29,
    module: 'M6',
    mainDim: 'att',
    text: '你会把 AI 的功劳算在自己头上吗？',
    options: [
      { text: '会说明"AI 帮我做的"', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '看情况，有时含糊', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '会，反正没人查', weight: 3, votes: { know: { 装: 1 } } },
      { text: '不算，但我描述时会添油加醋', weight: 1, votes: { att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 30,
    module: 'M3',
    mainDim: 'know',
    text: '你真正跑通过几个 AI 项目 / 脚本？',
    options: [
      { text: '好几个，有产出', weight: 0, votes: { know: { 懂: 1 }, motiv: { 稳: 0.5 } } },
      { text: '一个 hello world 级的', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '从没跑通过，但简历里写了"精通"', weight: 3, votes: { know: { 装: 1 }, att: { 吹: 0.5 } } },
      { text: '我用的都是现成的，没写过', weight: 2, votes: { know: { 装: 0.5 } } }
    ]
  },
  {
    id: 31,
    module: 'M4',
    mainDim: 'motiv',
    text: '遇到 AI 相关的新东西，你的第一动作是？',
    options: [
      { text: '先看它解决什么问题', weight: 0, votes: { motiv: { 稳: 1 }, know: { 懂: 0.5 } } },
      { text: '先转发收藏，之后再说', weight: 3, votes: { motiv: { 热: 1 } } },
      { text: '先发朋友圈"AI 又出新东西了"', weight: 2, votes: { show: { 秀: 0.5 }, motiv: { 热: 0.5 } } },
      { text: '先装个试试', weight: 1, votes: { motiv: { 稳: 0.5 } } }
    ]
  },
  {
    id: 32,
    module: 'M5',
    mainDim: 'att',
    text: '当有人质疑"你用的 AI 是不是不太行"？',
    options: [
      { text: '承认有局限', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '"那是因为你不会用"', weight: 3, votes: { att: { 吹: 1 } } },
      { text: '"我这个是付费版，懂？"', weight: 2, votes: { show: { 秀: 0.5 }, att: { 吹: 0.5 } } },
      { text: '"行不行的，看谁用"', weight: 1, votes: { att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 33,
    module: 'M4',
    mainDim: 'motiv',
    contra: { group: 'B' },
    text: '你的收藏夹里躺着多少没打开的 AI 教程？',
    options: [
      { text: '0 个，收藏即学', weight: 0, votes: { motiv: { 稳: 1 }, att: { 诚: 0.5 } }, c: 0 },
      { text: '5 个以内', weight: 1, votes: { motiv: { 稳: 0.5 } }, c: 0 },
      { text: '50+ 个，"已收藏 = 已学会"', weight: 3, votes: { motiv: { 热: 1 }, know: { 装: 0.5 } }, c: 1 },
      { text: '收藏了但从不看，还说"学习资料我有的是"', weight: 2, votes: { motiv: { 热: 0.5 }, att: { 吹: 0.5 } }, c: 1 }
    ]
  },
  {
    id: 34,
    module: 'M2',
    mainDim: 'know',
    text: '你能一句话说清"你平时怎么用 AI 的"吗？',
    options: [
      { text: '能，说得很清楚', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '能说个大概', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '说不清，但能说一堆术语', weight: 2, votes: { know: { 装: 1 } } },
      { text: '"三言两语说不清，这行水很深"', weight: 3, votes: { att: { 吹: 0.5 }, know: { 装: 0.5 } } }
    ]
  },
  {
    id: 35,
    module: 'M1',
    mainDim: 'show',
    text: '你的头像 / 昵称和 AI 有关吗？',
    options: [
      { text: '无关', weight: 0, votes: { show: { 藏: 1 } } },
      { text: '用 AI 生成的头像', weight: 1, votes: { show: { 秀: 0.5 } } },
      { text: '昵称带"AI""GPT""模型"等字样', weight: 2, votes: { show: { 秀: 1 } } },
      { text: '全平台改名"AI 布道者"', weight: 3, votes: { show: { 秀: 0.5 }, att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 36,
    module: 'M3',
    mainDim: 'know',
    text: '你知道"提示词工程"具体指什么吗？',
    options: [
      { text: '知道，就是跟模型有效沟通的方法', weight: 0, votes: { know: { 懂: 1 } } },
      { text: '知道个大概', weight: 1, votes: { att: { 诚: 0.5 } } },
      { text: '知道，我天天给 AI 上"心理课"', weight: 2, votes: { know: { 装: 1 }, att: { 吹: 0.5 } } },
      { text: '"这是我最擅长的领域"（其实只会说"请详细一点"）', weight: 3, votes: { know: { 装: 0.5 }, att: { 吹: 0.5 } } }
    ]
  },
  {
    id: 37,
    module: 'M6',
    mainDim: 'att',
    text: '测完这套题，你会怎么分享结果？',
    options: [
      { text: '觉得准就转，不准就删', weight: 0, votes: { att: { 诚: 1 } } },
      { text: '不管准不准，先秀个高分', weight: 3, votes: { show: { 秀: 1 }, att: { 吹: 0.5 } } },
      { text: '不分享，自己知道就好', weight: 0, votes: { show: { 藏: 1 } } },
      { text: '分享前先想好配文，显得自己很懂', weight: 1, votes: { show: { 秀: 0.5 } } }
    ]
  },
  {
    id: 38,
    module: 'M5',
    mainDim: 'att',
    text: '有人说"AI 永远取代不了人"，你？',
    options: [
      { text: '同意，人是主体', weight: 0, votes: { motiv: { 稳: 1 }, att: { 诚: 0.5 } } },
      { text: '反驳："你太保守了，AI 早就超越人类了"', weight: 3, votes: { att: { 吹: 1 } } },
      { text: '"取决于你指的是哪种人"（深沉脸）', weight: 2, votes: { know: { 装: 0.5 }, att: { 吹: 0.5 } } },
      { text: '懒得争，心里觉得他不懂', weight: 1, votes: { motiv: { 稳: 0.5 } } }
    ]
  },
  {
    id: 39,
    module: 'M2',
    mainDim: 'know',
    text: '你解释东西时，会硬扯上 AI 吗？',
    options: [
      { text: '不会，就事论事', weight: 0, votes: { know: { 懂: 1 }, att: { 诚: 0.5 } } },
      { text: '偶尔，为了显得前沿', weight: 2, votes: { know: { 装: 1 }, show: { 秀: 0.5 } } },
      { text: '经常："这问题用 AI 都能解决"', weight: 3, votes: { know: { 装: 0.5 }, motiv: { 热: 0.5 } } },
      { text: '别人听不懂我就说"这是 AI 时代的常识"', weight: 2, votes: { att: { 吹: 0.5 }, know: { 装: 0.5 } } }
    ]
  },
  {
    id: 40,
    module: 'M4',
    mainDim: 'motiv',
    text: '你为"AI 学习"花过多少钱？',
    options: [
      { text: '一分没花，免费够用', weight: 0, votes: { motiv: { 稳: 1 } } },
      { text: '花了会员费，用得上', weight: 1, votes: { motiv: { 稳: 0.5 }, att: { 诚: 0.5 } } },
      { text: '报了 9999 的课，还没听完第一课', weight: 3, votes: { motiv: { 热: 1 }, know: { 装: 0.5 } } },
      { text: '花钱买了"AI 社群"门票，天天在里面潜水', weight: 2, votes: { motiv: { 热: 0.5 }, att: { 吹: 0.5 } } }
    ]
  }
]

// 每测抽样数量（分层抽样，保证每模块覆盖）
export const SAMPLE_SIZE = 25

export const MODULE_SAMPLES = {
  M1: 4, // 炫耀行为（7 题）
  M2: 4, // 术语话术（6 题）
  M3: 3, // 真实知识（5 题）
  M4: 6, // 跟风 FOMO（10 题）
  M5: 4, // 态度嘴硬（6 题）
  M6: 4  // 自我认知（6 题）
}

// 交叉验证组：组内两题都抽中且答案方向相反 → 计 1 处矛盾
// side: high = 嘉豪侧，low = 清醒侧
export const CONTRA_GROUPS = ['A', 'B', 'C']