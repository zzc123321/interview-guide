export interface PricingFeatureGroup {
  title: string;
  items: string[];
}

export interface PricingPlan {
  name: string;
  badge?: string;
  price: string;
  period: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  accent: 'light' | 'dark' | 'highlight';
  featureGroups: PricingFeatureGroup[];
}

export interface AddOnPackage {
  name: string;
  price: string;
  description: string;
  highlights: string[];
}

export interface CompetitorSnapshot {
  name: string;
  pricing: string;
  model: string;
  takeaway: string;
}

export interface ExperimentItem {
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  description: string;
}

export const pricingHeroHighlights = [
  '不限次文本模拟面试',
  '真实岗位 / JD 定制题目',
  '语音面试 + AI 复盘报告',
  '简历、面试、知识点复习一站式闭环',
];

export const pricingPlans: PricingPlan[] = [
  {
    name: '免费体验',
    badge: '先试再买',
    price: '¥0',
    period: '/入门',
    summary: '给第一次使用 AI 面试训练的候选人，先跑通完整练习闭环。',
    ctaLabel: '立即登录体验',
    ctaHref: '/login',
    accent: 'light',
    featureGroups: [
      {
        title: '体验额度',
        items: [
          '3 次文本模拟面试',
          '1 次简历分析',
          '1 份基础评估报告',
          '语音面试体验 5 分钟',
        ],
      },
      {
        title: '限制说明',
        items: [
          '不开放 PDF 导出',
          '不支持历史表现趋势对比',
          '不包含高级专项报告',
        ],
      },
    ],
  },
  {
    name: 'Pro 月卡',
    badge: '主推方案',
    price: '¥79',
    period: '/月',
    summary: '适合稳定练习 2-4 周的求职者，用低门槛月付完成一轮系统准备。',
    ctaLabel: '查看开通方式',
    ctaHref: '/login',
    accent: 'highlight',
    featureGroups: [
      {
        title: '核心权益',
        items: [
          '文本模拟面试不限次',
          '每月 10 次简历分析',
          '每月 150 分钟语音面试',
          '完整评分报告 + PDF 导出',
        ],
      },
      {
        title: '进阶能力',
        items: [
          '真实岗位 / JD 定制题目',
          '历史表现趋势对比',
          '项目深挖与追问练习',
          '多方向专项 Skill 题库',
        ],
      },
    ],
  },
  {
    name: '30 天 Offer 冲刺包',
    badge: '高强度冲刺',
    price: '¥239',
    period: '/30 天',
    summary: '给面试窗口临近、希望短期高强度刷题和复盘的候选人。',
    ctaLabel: '开始冲刺计划',
    ctaHref: '/login',
    accent: 'dark',
    featureGroups: [
      {
        title: '冲刺资源',
        items: [
          '文本模拟面试不限次',
          '8 次简历分析',
          '300 分钟语音面试',
          '1 份目标岗位专项报告',
        ],
      },
      {
        title: '专项训练',
        items: [
          'JD 定制题库与岗位画像',
          '历史表现趋势对比',
          '重点薄弱项复盘',
          '适合 30 天内集中备战',
        ],
      },
    ],
  },
];

export const addOnPackages: AddOnPackage[] = [
  {
    name: '语音加油包',
    price: '¥29 / 60 分钟',
    description: '把高成本语音能力从主订阅中拆开，避免免费用户过度消耗模型预算。',
    highlights: [
      '适合临时补充练习时长',
      '和月卡、冲刺包叠加使用',
      '保障语音功能毛利率',
    ],
  },
  {
    name: '深度报告包',
    price: '¥19 / 份',
    description: '给超出会员额度后的高级 PDF 导出、专项报告和目标岗位诊断留出单独付费口。',
    highlights: [
      '可做高价值单次付费',
      '便于测试用户对深度复盘的付费意愿',
      '适合后续拆出企业诊断模板',
    ],
  },
  {
    name: 'Pro 季卡',
    price: '¥219 / 季',
    description: '作为定价页的隐藏增强项存在，主要承接已经认可产品价值的高意向用户。',
    highlights: [
      '提升现金流和留存',
      '对比月卡形成性价比锚点',
      '适合后续在支付页展示',
    ],
  },
];

export const competitorSnapshots: CompetitorSnapshot[] = [
  {
    name: 'Huru',
    pricing: '$24.99/月',
    model: '订阅无限练习',
    takeaway: '说明单人订阅是成熟路径，但更适合用语音时长做成本护栏。',
  },
  {
    name: 'Exponent',
    pricing: '$79/月',
    model: '会员 + 课程 + 社区',
    takeaway: '高价格成立的前提是品牌和内容资产，你当前更适合轻订阅切入。',
  },
  {
    name: 'LockedIn AI',
    pricing: '订阅 + Credits',
    model: '混合计费',
    takeaway: '验证了高成本能力适合积分或时长包控制，而不是无上限放开。',
  },
  {
    name: 'Google Interview Warmup',
    pricing: '免费',
    model: '基础训练工具',
    takeaway: '免费产品可以教育市场，但很难提供完整复盘和成长体系。',
  },
];

export const pricingExperiments: ExperimentItem[] = [
  {
    title: '价格实验',
    description: '对比 ¥69、¥79、¥99 月卡转化率，找到首单和毛利之间的平衡点。',
  },
  {
    title: '权益实验',
    description: '在文本不限次不变的前提下，对比 120 分钟和 180 分钟语音时长的 ROI。',
  },
  {
    title: '入口实验',
    description: '测试先展示月卡还是先展示 30 天冲刺包，验证不同人群的首屏偏好。',
  },
  {
    title: '免费额度实验',
    description: '验证 3 次免费文本面试是否足够形成付费意愿，避免免费层级过重。',
  },
];

export const pricingMetrics: MetricItem[] = [
  {
    label: '免费到付费转化率',
    description: '判断免费体验额度是否真正推动首单，而不是只消耗资源。',
  },
  {
    label: '首单客单价',
    description: '衡量用户更偏向月卡还是冲刺包，辅助决定首推档位。',
  },
  {
    label: '7 日 / 30 日留存',
    description: '验证训练产品是不是形成了持续复盘和多次回访。',
  },
  {
    label: '单付费用户模型成本',
    description: '监控语音时长、报告导出和整体毛利，避免高价值功能失控。',
  },
];
