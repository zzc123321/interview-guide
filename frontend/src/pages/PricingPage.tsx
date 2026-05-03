import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  FileText,
  Mic,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  addOnPackages,
  competitorSnapshots,
  pricingExperiments,
  pricingHeroHighlights,
  pricingMetrics,
  pricingPlans,
} from '../content/pricing';

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

const planAccentStyles = {
  light: {
    panel:
      'bg-white/88 dark:bg-slate-900/70 border-slate-200/70 dark:border-slate-700/70',
    badge:
      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    price: 'text-slate-900 dark:text-white',
    copy: 'text-slate-600 dark:text-slate-300',
    button:
      'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
  },
  highlight: {
    panel:
      'bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-500 border-primary-400/40 text-white shadow-xl shadow-primary-500/20',
    badge: 'bg-white/14 text-primary-50',
    price: 'text-white',
    copy: 'text-primary-50/90',
    button: 'bg-white text-primary-700 hover:bg-primary-50',
  },
  dark: {
    panel:
      'bg-slate-900/95 dark:bg-slate-900/95 border-slate-800 text-white shadow-xl shadow-slate-900/25',
    badge: 'bg-white/10 text-slate-200',
    price: 'text-white',
    copy: 'text-slate-300',
    button: 'bg-primary-500 text-white hover:bg-primary-400',
  },
} as const;

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_28%)]" />

      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/pricing" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                AI Interview
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">智能面试助手</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              登录后台
            </Link>
            <Link
              to="/login"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
            >
              立即体验
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-18 pt-16 md:pb-24 md:pt-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.82))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_25%_80%,rgba(168,85,247,0.16),transparent_20%)]" />

          <div className="relative mx-auto grid min-h-[calc(100svh-180px)] max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl self-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-xl">
                <BarChart3 className="h-4 w-4 text-primary-300" />
                Monetization Blueprint
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white md:text-7xl">
                统一产品体验的同时
                <span className="block text-primary-300">把收费方案讲清楚</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                定价围绕你的现有产品能力展开：简历分析、文本模拟面试、语音面试、复盘报告和面试安排。
                先用免费体验建立信任，再用月卡和冲刺包完成转化，用语音加油包控制高成本能力。
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {pricingHeroHighlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 * index, ease: 'easeOut' }}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-slate-100 backdrop-blur-xl"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
                >
                  开始免费体验
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-5 py-3 text-sm text-white transition-colors hover:bg-white/12"
                >
                  查看产品后台
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
              className="self-end"
            >
              <div className="rounded-[28px] border border-white/10 bg-slate-900/55 p-6 backdrop-blur-2xl md:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Launch Stack</div>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">首发收费组合</h2>
                  </div>
                  <span className="rounded-full bg-primary-500/18 px-3 py-1 text-xs font-medium text-primary-200">
                    推荐上线
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <div className="text-sm text-slate-400">免费版</div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      3 次文本 + 1 次简历分析 + 5 分钟语音
                    </div>
                  </div>
                  <div className="rounded-2xl border border-primary-400/20 bg-primary-500/10 px-4 py-4">
                    <div className="text-sm text-primary-200">Pro 月卡</div>
                    <div className="mt-1 text-lg font-semibold text-white">¥79 / 月</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <div className="text-sm text-slate-400">Pro 季卡</div>
                    <div className="mt-1 text-lg font-semibold text-white">¥219 / 季</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <div className="text-sm text-slate-400">30 天 Offer 冲刺包</div>
                    <div className="mt-1 text-lg font-semibold text-white">¥239 / 30 天</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                    <div className="text-sm text-slate-400">语音加油包</div>
                    <div className="mt-1 text-lg font-semibold text-white">¥29 / 60 分钟</div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-950/60 px-4 py-4 text-sm text-slate-300">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                  用语音时长做成本护栏，避免高价值能力被免费层级无限消耗。
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-18">
          <div className="mx-auto max-w-6xl">
            <motion.div {...sectionReveal} className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Default Packages
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                前台默认展示 3 档，信息足够清楚，也不打断现有产品风格
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                页面主推免费体验、Pro 月卡和 30 天 Offer 冲刺包。季卡和增值包继续保留，但放在后方补充，
                用户第一次访问时只需要做一个简单选择。
              </p>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-3">
              {pricingPlans.map((plan, index) => {
                const styles = planAccentStyles[plan.accent];

                return (
                  <motion.article
                    key={plan.name}
                    {...sectionReveal}
                    transition={{ ...sectionReveal.transition, delay: index * 0.08 }}
                    className={`rounded-[28px] border p-6 md:p-7 ${styles.panel}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}>
                          {plan.badge}
                        </div>
                        <h3 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                          {plan.name}
                        </h3>
                      </div>
                      {index === 1 && (
                        <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                          推荐
                        </div>
                      )}
                    </div>

                    <div className="mt-7 flex items-end gap-2">
                      <span className={`font-display text-4xl font-semibold md:text-5xl ${styles.price}`}>
                        {plan.price}
                      </span>
                      <span className={`pb-1 text-sm ${styles.copy}`}>{plan.period}</span>
                    </div>

                    <p className={`mt-4 text-sm leading-7 ${styles.copy}`}>{plan.summary}</p>

                    <div className="mt-8 space-y-6">
                      {plan.featureGroups.map((group) => (
                        <div key={group.title}>
                          <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.copy}`}>
                            {group.title}
                          </div>
                          <ul className="mt-3 space-y-3">
                            {group.items.map((item) => (
                              <li key={item} className="flex gap-3 text-sm leading-6">
                                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={plan.ctaHref}
                      className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors ${styles.button}`}
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div {...sectionReveal}>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Why This Structure
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                不是卖题库，而是卖一整套训练闭环
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <p>免费体验负责教育市场和首轮转化，不需要一开始就把客单价抬高。</p>
                <p>订阅负责稳定收入，最适合你当前已经成熟的文本面试、简历分析和复盘报告能力。</p>
                <p>加油包负责保护语音成本，也为更贵的音色、WebRTC 和真人陪练保留升级空间。</p>
              </div>
            </motion.div>

            <motion.div
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: 0.08 }}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/70 dark:bg-slate-900/70">
                <FileText className="h-5 w-5 text-primary-500" />
                <div className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  文本面试做订阅主权益
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  用户最容易理解，也最适合形成高频练习和连续留存。
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/70 dark:bg-slate-900/70">
                <Mic className="h-5 w-5 text-primary-500" />
                <div className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  语音能力做时长护栏
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  高价值也高成本，拆成额度和加油包更适合首期上线。
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/70 dark:bg-slate-900/70">
                <TrendingUp className="h-5 w-5 text-primary-500" />
                <div className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  冲刺包拉升 ARPU
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  对临近面试的人群来说，短期高强度训练的价值比单纯月卡更直观。
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 dark:border-slate-700/70 dark:bg-slate-900/70">
                <Clock3 className="h-5 w-5 text-primary-500" />
                <div className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  后续还有扩展空间
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  等留存数据跑稳，再加年卡、积分制和企业版，不必首发一次铺开。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-18">
          <div className="mx-auto max-w-6xl">
            <motion.div {...sectionReveal} className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Competitor Anchors
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                价格锚点来自真实竞品，但结构更贴合你当前网站能力
              </h2>
            </motion.div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/88 dark:border-slate-700/70 dark:bg-slate-900/70">
              {competitorSnapshots.map((item, index) => (
                <motion.div
                  key={item.name}
                  {...sectionReveal}
                  transition={{ ...sectionReveal.transition, delay: index * 0.06 }}
                  className={`grid gap-3 px-6 py-6 md:grid-cols-[0.85fr_0.9fr_1.25fr] ${
                    index !== competitorSnapshots.length - 1
                      ? 'border-b border-slate-200/70 dark:border-slate-700/70'
                      : ''
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      竞品
                    </div>
                    <div className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      定价 / 模式
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                      {item.pricing}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.model}</div>
                  </div>
                  <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.takeaway}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
            <motion.div
              {...sectionReveal}
              className="rounded-[28px] border border-slate-200/70 bg-white/88 p-6 dark:border-slate-700/70 dark:bg-slate-900/70 md:p-8"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Add-ons
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                增值包保留在页面下半段，更符合当前产品页节奏
              </h2>
              <div className="mt-8 space-y-5">
                {addOnPackages.map((item, index) => (
                  <div
                    key={item.name}
                    className={`rounded-2xl border px-5 py-5 ${
                      index === 0
                        ? 'border-primary-200 bg-primary-50/70 dark:border-primary-800/70 dark:bg-primary-950/30'
                        : 'border-slate-200/70 bg-slate-50/80 dark:border-slate-700/70 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {item.price}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...sectionReveal}
              transition={{ ...sectionReveal.transition, delay: 0.06 }}
              className="rounded-[28px] border border-slate-200/70 bg-white/88 p-6 dark:border-slate-700/70 dark:bg-slate-900/70 md:p-8"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Experiments & Metrics
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                上线后重点验证价格、入口和成本模型
              </h2>
              <div className="mt-7 space-y-5">
                {pricingExperiments.map((experiment) => (
                  <div key={experiment.title} className="border-b border-slate-200/70 pb-5 last:border-0 last:pb-0 dark:border-slate-700/70">
                    <div className="font-semibold text-slate-900 dark:text-white">{experiment.title}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {experiment.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-3">
                {pricingMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl bg-slate-50/90 px-4 py-4 dark:bg-slate-950/40"
                  >
                    <div className="font-medium text-slate-900 dark:text-white">{metric.label}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-4">
          <motion.div
            {...sectionReveal}
            className="mx-auto max-w-6xl rounded-[32px] border border-primary-300/20 bg-gradient-to-r from-primary-600 to-indigo-500 p-8 text-white shadow-2xl shadow-primary-500/20 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-100">
                  Final Recommendation
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  先把月卡、冲刺包和语音加油包跑通，再扩展更复杂的商业化结构
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-primary-50/92">
                  这版页面已经回到现有网站的视觉系统里，后续你可以直接在这个基础上接支付入口、套餐对比实验
                  和站内升级提示，不需要再为公开页维护一套独立品牌风格。
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50"
                >
                  进入产品体验
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="text-sm text-primary-100">公开页负责讲价值，后台继续承接练习和转化。</div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
