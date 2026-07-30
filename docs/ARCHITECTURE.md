# ARCHITECTURE — 技术方案

> 版本 v1.0 | 2026-07-28 | 第七阶段：技术方案

---

## 1. 技术栈

| 层 | 技术 | 理由 |
|---|---|---|
| **框架** | Astro 5.x (SSG mode) | 天然适合批量生成静态页面，模板直观 |
| **语言** | TypeScript | 类型安全，数据生成 + 日期计算 |
| **样式** | Plain CSS（无框架） | 站点极简，不需要 Tailwind 或 CSS-in-JS |
| **交互** | Vanilla JS（< 3KB） | 只有计算器需要少量 JS |
| **构建** | `astro build` → 纯静态 HTML | 零运行时 JS 输出（程序化页面） |
| **托管** | Vercel（免费计划） | Astro 官方推荐、全球 CDN、100GB 带宽 |
| **域名** | Vercel 自带域名 或 自定义域名 | `*.vercel.app` 免费，自定义域名几美元/年 |
| **版本控制** | Git + GitHub | 免费私有仓库 |
| **CI/CD** | Vercel Git 集成 | 推送即部署 |

---

## 2. 项目初始化

```bash
npm create astro@latest . -- --template minimal
# 选: TypeScript - Yes, deps - Yes, git - Yes
```

## 3. 目录结构

```
/
├── public/
│   ├── favicon.ico
│   └── robots.txt                       # 手动维护
│
├── src/
│   ├── pages/
│   │   ├── index.astro                  # 首页（含核心计算器）
│   │   ├── about.astro                  # About 页面
│   │   ├── privacy.astro                # Privacy 页面
│   │   ├── 404.astro                    # 自定义 404
│   │   │
│   │   ├── days-between/
│   │   │   ├── index.astro              # Hub page: 交互式计算器
│   │   │   └── [date1]/
│   │   │       └── [date2].astro        # 程序化: 日期对页面 (~100)
│   │   │
│   │   ├── days-from-today/
│   │   │   ├── index.astro              # Hub page: 交互式计算器
│   │   │   └── [n].astro                # 程序化: N天后的日期 (~30)
│   │   │
│   │   ├── days-from/
│   │   │   └── [n]/
│   │   │       └── [date].astro         # 程序化: N天+起始日期 (~200)
│   │   │
│   │   ├── days-until/
│   │   │   ├── index.astro              # Hub page: 事件索引
│   │   │   └── [event]/
│   │   │       └── [year].astro         # 程序化: 事件倒计时 (~150)
│   │   │
│   │   ├── days-in/
│   │   │   ├── index.astro              # Hub page: 月份索引
│   │   │   └── [slug].astro             # 程序化: 月份(12页) + 年份(7页)
│   │   │
│   │   ├── days-left-in/
│   │   │   └── [year].astro             # 程序化: 年底倒计时 (3页)
│   │   │
│   │   └── age-in-days/
│   │       ├── index.astro              # Hub page: 年龄计算器
│   │       └── year/
│   │           └── [year].astro         # 程序化: 各年份出生年龄 (~20)
│   │
│   ├── components/
│   │   ├── BaseLayout.astro             # 全局布局（head/meta/schema/header/footer）
│   │   ├── Header.astro                 # 导航
│   │   ├── Footer.astro                 # 页脚
│   │   ├── Breadcrumb.astro             # 面包屑导航
│   │   ├── AnswerHero.astro             # 大字答案（数字+单位）
│   │   ├── DateContext.astro            # 日期上下文信息
│   │   ├── RelatedQueries.astro         # 内部链接区块
│   │   ├── Calculator.astro             # 交互式计算器（唯一含 JS 的组件）
│   │   ├── FAQ.astro                    # FAQ 区块
│   │   └── CategoryCard.astro           # 首页分类卡片
│   │
│   ├── lib/
│   │   ├── dates.ts                     # 核心日期计算函数
│   │   ├── data/
│   │   │   ├── date-pairs.ts            # 日期对数据 (100个精选组合)
│   │   │   ├── n-values.ts             # 常用 N 值列表
│   │   │   ├── events.ts               # 节日和事件列表（50个）
│   │   │   ├── months.ts               # 月份数据
│   │   │   └── birth-years.ts          # 出生年份列表
│   │   ├── schema.ts                    # Schema.org JSON-LD 生成
│   │   ├── meta.ts                      # Title / Description 模板引擎
│   │   └── formatters.ts               # 数字格式化（单复数、千分位等）
│   │
│   └── styles/
│       └── global.css                   # 全局样式（~300-500 行）
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. 核心组件设计

### 4.1 BaseLayout.astro

```astro
---
// BaseLayout.astro
// 每个页面包裹一次，统一注入:
// - <head> meta/schema/canonical/og
// - <Header>
// - <Footer>
export interface Props {
  title: string;
  description: string;
  canonical: string;
  schema?: object;
}
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <!-- Schema.org -->
  {schema && <script type="application/ld+json" set:html={JSON.stringify(schema)} />}
  <!-- Styles -->
  <link rel="stylesheet" href="/styles/global.css" />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

### 4.2 Calculator.astro（唯一需要 JS 的组件）

```astro
<!-- Calculator.astro -->
<div class="calculator">
  <div class="calc-inputs">
    <input type="date" id="date1" />
    <span class="calc-arrow">→</span>
    <input type="date" id="date2" />
  </div>
  <div class="calc-result" id="result">
    <!-- 动态填入 -->
  </div>
</div>

<script>
  // ~50 行 vanilla JS
  const d1 = document.getElementById('date1');
  const d2 = document.getElementById('date2');
  const result = document.getElementById('result');

  function update() {
    if (!d1.value || !d2.value) return;
    const diff = Math.abs(new Date(d2.value) - new Date(d1.value));
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    result.textContent = `${days} day${days === 1 ? '' : 's'}`;
  }

  d1.addEventListener('change', update);
  d2.addEventListener('change', update);
</script>
```

### 4.3 AnswerHero.astro

```astro
---
// AnswerHero.astro — 程序化页面的核心模块
export interface Props {
  value: number;
  unit: string;      // "days"
  subtitle?: string; // "That's 52 weeks and 1 day"
}
---
<div class="answer-hero">
  <span class="answer-value">{value.toLocaleString()}</span>
  <span class="answer-unit">{unit}</span>
  {subtitle && <p class="answer-subtitle">{subtitle}</p>}
</div>
```

---

## 5. 路由与数据生成

### 5.1 Pattern: `getStaticPaths`

每个程序化路由使用 Astro 的 `getStaticPaths`：

```typescript
// src/pages/days-between/[date1]/[date2].astro
---
import { getStaticPaths } from './_paths';

export { getStaticPaths };

const { date1, date2 } = Astro.params;
// date1 = "2026-01-01", date2 = "2026-12-31"
const result = calculateDaysBetween(date1, date2);
---
```

对应的 `_paths.ts`:
```typescript
// 定义所有要生成的日期对
export async function getStaticPaths() {
  const pairs = [
    ['2026-01-01', '2026-12-31'],
    ['2026-06-01', '2026-09-01'],
    // ... ~100 对
  ];

  return pairs.map(([date1, date2]) => ({
    params: { date1, date2 },
  }));
}
```

### 5.2 数据文件示例

**events.ts**:
```typescript
export const events = [
  { slug: 'christmas',       name: 'Christmas',       month: 12, day: 25 },
  { slug: 'new-year',        name: "New Year's Day",  month: 1,  day: 1  },
  { slug: 'halloween',       name: 'Halloween',        month: 10, day: 31 },
  { slug: 'thanksgiving',    name: 'Thanksgiving',     month: 11, day: 0  }, // 0 = 第四个周四
  { slug: 'valentines-day',  name: "Valentine's Day",  month: 2,  day: 14 },
  // ... 50 个事件
];

export const years = [2026, 2027, 2028];
```

**n-values.ts**:
```typescript
export const nValues = [7, 10, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 365];
```

---

## 6. 核心日期计算逻辑

```typescript
// src/lib/dates.ts

/**
 * 计算两个日期间的天数差（绝对值）
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.abs(Math.round((d2.getTime() - d1.getTime()) / 86_400_000));
}

/**
 * 计算 N 天后的日期
 */
export function dateFromDays(date: string, n: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0]; // "2026-12-25"
}

/**
 * 获取日期的星期名
 */
export function getWeekday(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * 判断闰年
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 获取某月天数
 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate(); // month 是 0-indexed
}

/**
 * 计算年龄（按天）
 */
export function ageInDays(birthYear: number): number {
  const today = new Date();
  const birth = new Date(birthYear, 0, 1); // 按该年 1 月 1 日估算
  return Math.floor((today.getTime() - birth.getTime()) / 86_400_000);
}
```

---

## 7. Schema 生成

```typescript
// src/lib/schema.ts

export function resultPageSchema(args: {
  title: string;
  description: string;
  url: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: args.title,
    description: args.description,
    url: args.url,
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: args.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

---

## 8. Meta 模板引擎

```typescript
// src/lib/meta.ts

export function daysBetweenMeta(date1: string, date2: string, days: number) {
  const title = `${days} Days Between ${formatDate(date1)} and ${formatDate(date2)} | DateCalc`;
  const description = `There are exactly ${days} days between ${formatDate(date1)} and ${formatDate(date2)}. That's ${Math.floor(days/7)} weeks and ${days%7} days.`;
  return { title, description };
}

export function daysUntilMeta(event: string, year: number, days: number) {
  const title = `How Many Days Until ${event} ${year}? | DateCalc`;
  const description = `There are ${days} days until ${event} ${year}. ${event} falls on a ${getWeekday(eventDate)} this year.`;
  return { title, description };
}
```

---

## 9. 构建与部署

### 9.1 本地开发

```bash
npm run dev        # 开发服务器 http://localhost:4321
```

### 9.2 构建

```bash
npm run build      # 输出到 dist/
```

构建输出：
```
dist/
├── index.html
├── about/
│   └── index.html
├── days-between/
│   ├── index.html
│   ├── 2026-01-01/
│   │   └── 2026-12-31/
│   │       └── index.html          ← "/days-between/2026-01-01/2026-12-31/"
│   └── ...
└── ...
```

### 9.3 部署到 Vercel

```bash
# 方式一：Vercel CLI（手动部署）
npx vercel --prod

# 方式二：Git 集成（推荐）
# 1. 推送到 GitHub
# 2. vercel.com → Import Project → 选择仓库
# 3. Vercel 自动识别 Astro，预设：
#    - Framework: Astro
#    - Build command: npm run build
#    - Output directory: dist
# 4. 每次 push → 自动部署到 *.vercel.app

# 零配置——Vercel 自动检测到 Astro 项目。
```

### 9.4 自定义域名

```bash
# Vercel Dashboard → Settings → Domains → 添加 yourdomain.com
# Vercel 自动配置 DNS + HTTPS（Let's Encrypt）
```

---

## 10. "Days From Today" 页面更新策略

这是唯一需要定期更新的内容（"today" 每天都在变）。

**方案：Vercel Deploy Hook + GitHub Actions 定时触发**

```
1. Vercel Dashboard → Settings → Deploy Hooks → Create Hook
   → 得到一个 URL: https://api.vercel.com/v1/integrations/deploy/xxx

2. GitHub Actions 每周一触发该 URL:
```

```yaml
# .github/workflows/weekly-rebuild.yml
name: Weekly Rebuild
on:
  schedule:
    - cron: '0 0 * * 1'  # 每周一 UTC 00:00
  workflow_dispatch:       # 允许手动触发
jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

**或者更简单**：每周手动 `git push` 一次（加一个空 commit 触发构建）。MVP 阶段流量不大，"today" 偏几天对用户影响很小。

---

## 11. 性能优化

| 优化项 | 做法 |
|---|---|
| **零 JS 输出** | 程序化页面：纯 HTML，不输出任何 JS（Astro `is:inline` style） |
| **Inline CSS** | 全局 CSS < 10KB，build 时 inline 进每个 HTML |
| **无外部依赖** | 不加载 Google Fonts、CDN CSS、analytics（MVP 阶段） |
| **HTML 最小化** | Astro build 自动 minify |
| **CDN 缓存** | Vercel Edge Network，`Cache-Control: public, max-age=86400` |
| **图片零使用** | MVP 不需要图片（favicon 除外） |
| **Preload** | 不需要——每个页面只加载一个 HTML 文件 |

**预期性能**：
```
HTML size:    8-15 KB（压缩后 3-5 KB）
LCP:          < 1.0s（全球 CDN + 零阻塞资源）
FID:          0ms（程序化页面零 JS）
CLS:          0（纯静态布局）
```

---

## 12. SEO 技术实现

| 项 | 实现 |
|---|---|
| **Sitemap** | Astro `@astrojs/sitemap` 集成，自动生成 |
| **Robots.txt** | 放在 `public/robots.txt`，指向 sitemap |
| **Canonical** | 每个页面手动指定（模板中计算） |
| **Schema** | `src/lib/schema.ts` 生成 JSON-LD，注入 `<head>` |
| **Meta** | `src/lib/meta.ts` 模板引擎，每个页面调用 |
| **404** | `src/pages/404.astro` |
| **重定向** | 在 `astro.config.mjs` 或 Vercel `vercel.json` 配置 |

---

## 13. 监控

MVP 阶段不搭建复杂监控。使用免费工具：

| 监控 | 工具 |
|---|---|
| **收录 + 排名 + 点击** | Google Search Console |
| **页面性能** | Vercel Analytics（免费，Web Vitals） |
| **可用性** | Vercel 自带部署状态 |
| **错误日志** | Vercel 部署日志 |

---

## 14. 成本估算

| 项目 | 月成本 |
|---|---|
| Vercel | $0（免费计划：100GB 带宽，6000 构建分钟） |
| 域名 | ~$1/月（按年付 $10-12） |
| GitHub | $0（公开仓库或免费私有） |
| **总计** | **~$1/月** |

---

## 15. 开发流程

```
1. 本地开发
   npm run dev → 浏览器预览

2. 提交代码
   git add . && git commit -m "feat: ..."

3. 推送 → 自动部署
   git push → Vercel 自动构建 + 发布

4. 验证
   - 打开网站检查页面
   - Google Search Console 提交 sitemap
   - 等待收录
```

---

## 16. 下一步

👉 进入 **第八阶段：任务拆分**（等待确认）
