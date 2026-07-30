# PRD — 产品需求文档

> 版本 v1.0 | 2026-07-28 | 第六阶段：PRD

---

## 目录

1. [产品目标](#1-产品目标)
2. [用户故事](#2-用户故事)
3. [功能列表](#3-功能列表)
4. [页面列表](#4-页面列表)
5. [页面流程](#5-页面流程)
6. [页面模块](#6-页面模块)
7. [API 设计](#7-api-设计)
8. [数据库](#8-数据库)
9. [边界情况](#9-边界情况)
10. [验收标准](#10-验收标准)
11. [优先级划分](#11-优先级划分)

---

## 1. 产品目标

| 目标 | 衡量标准 | 时间 |
|---|---|---|
| 长尾日期查询被 Google 收录 | 收录率 > 80% | 上线后 3 个月 |
| 长尾关键词开始获取流量 | 日均 Organic Clicks > 100 | 上线后 3 个月 |
| 核心页面在目标关键词 Top 10 | 5 个以上长尾查询 | 上线后 6 个月 |
| 流量持续增长 | 日均 Organic Clicks > 500 | 上线后 6 个月 |
| 零成本运营 | 月维护时间 < 4 小时 | 持续 |

---

## 2. 用户故事

### US-01：快速知道两个日期间的天数
> **As a** 上班族正在计算假期天数
> **I want to** 不用选择日期就能立刻知道两个日期的间隔天数
> **So that** 我能快速完成手头的事情

### US-02：知道 N 天后是什么日期
> **As a** 自由职业者正在算合同到期日
> **I want to** 知道 90 天后是什么日期
> **So that** 我能设定正确的截止日

### US-03：知道某个事件的倒计时
> **As a** 学生在期待暑假
> **I want to** 看到下一个重要事件的倒计时天数
> **So that** 满足我的期待感

### US-04：知道某个月有多少天
> **As a** 任何人不确定一个月有几天
> **I want to** 快速确认二月份有几天
> **So that** 我不需要回忆月份口诀

### US-05：知道自己的年龄（按天算）
> **As a** 年轻人好奇或有表单需要
> **I want to** 知道出生后活了多少天
> **So that** 满足好奇心或填写准确信息

### US-06：在手机上流畅使用
> **As a** 手机用户
> **I want to** 在手机上也能方便地看到日期计算结果
> **So that** 我不需要打开电脑

### US-07：不被广告干扰
> **As a** 所有用户
> **I want to** 页面干净，不被广告打断
> **So that** 我能专注于获取答案

---

## 3. 功能列表

### F01：核心日期计算器（交互式） `P0`
- 用户在首页可以输入两个日期
- 实时计算日期间的天数差
- 显示天数、周数、月数
- 无需点击"计算"按钮（自动计算）

### F02：Days Between 程序化页面 `P0`
- 为精选日期对生成独立静态页面
- 每个页面的 URL、标题、内容精确匹配日期对
- 页面展示天数 + 分解信息 + 日期上下文
- 自动生成内部链接到相关页面

### F03：Days From Today 程序化页面 `P0`
- "N days from today" 页面（覆盖常见 N 值）
- 自动计算并展示结果日期
- 标注结果是星期几

### F04：Days Until 事件倒计时页面 `P0`
- 覆盖 50+ 全球节日和事件
- 每个事件 × 当前及未来 3 年
- 显示倒计时天数 + 事件日期

### F05：Days In Month 页面 `P0`
- 12 个月各一页
- 展示该月天数
- 二月含闰年说明

### F06：Days In Year 页面 `P1`
- 展示指定年份的总天数
- 标注是否是闰年

### F07：Days From Specific Date 页面 `P1`
- "N days from [specific date]" 页面
- 覆盖常用起始日期 × 常用 N 值

### F08：Age in Days 页面 `P1`
- 交互式年龄计算器
- 按出生年份的程序化页面

### F09：Days Left in Year 页面 `P2`
- 当年还剩多少天

### F10：SEO 基础设施 `P0`
- Sitemap 自动生成
- Schema 结构化数据（每个页面）
- Meta tags 自动生成
- Canonical URL
- Robots.txt
- Breadcrumb 导航

### F11：内部链接网络 `P0`
- 面包屑导航
- Related queries 区块
- Hub-to-spoke 链接
- Cross-type 链接

### F12：静态页面生成管道 `P0`
- Astro `getStaticPaths()` 遍历数据 → 构建时生成所有 HTML
- 所有页面在 `npm run build` 时一次性生成到 `dist/`

### F13：部署 `P0`
- 部署到 Vercel（Git Push 自动触发）
- `*.vercel.app` 免费域名
- HTTPS 自动配置（Let's Encrypt）

---

## 4. 页面列表

### 4.1 完整页面清单

```
类型              数量      URL 模式                         优先级
─────────────────────────────────────────────────────────────────────
Homepage            1      /                                  P0
Days Between Hub    1      /days-between/                     P0
Days From Hub       1      /days-from-today/                  P0
Days Until Hub      1      /days-until/                       P0
Days In Hub         1      /days-in/                          P0
Age in Days Hub     1      /age-in-days/                      P1
─────────────────────────────────────────────────────────────────────
Date Pair          ~100    /days-between/{d1}/{d2}/            P0
Days From Today    ~30     /days-from-today/{n}/               P0
Event Countdown    ~150    /days-until/{event}/{year}/         P0
Days In Month       12     /days-in/{month}/                   P0
Days In Year         7     /days-in/{year}/                    P1
Days Left In Year    3     /days-left-in/{year}/               P2
Days From Date    ~200    /days-from/{n}/{date}/               P1
Age by Year        ~20     /age-in-days/year/{year}/           P1
─────────────────────────────────────────────────────────────────────
About               1      /about/                             P1
Privacy             1      /privacy/                           P0
404                 1      /404.html                           P2
Sitemap             1      /sitemap.xml                        P0
Robots              1      /robots.txt                         P0
─────────────────────────────────────────────────────────────────────
Total MVP          ~533 pages
```

### 4.2 页面分类

| 分类 | 页面性质 | 生成方式 |
|---|---|---|
| Hub Pages（6 页） | 半静态 — 结构固定，"today"数据需定期更新 | Astro 组件 + 数据注入 |
| 程序化结果页（~522 页） | 纯静态 — 生成后不变化 | Astro `getStaticPaths()` 批量生成 |
| 倒计时页（~150 页） | 准静态 — 每年需重新生成 | Astro SSG，年更 |
| "Days From Today"（~30 页） | 动态 — 答案每天变化 | 部署时生成 + Deploy Hook 定期重建 |
| 固定页面（5 页） | 纯静态 | 手写 Astro 组件 |

---

## 5. 页面流程

### 5.1 核心用户路径

```
用户搜索 "how many days until christmas 2026"
    │
    ▼
Google SERP → 点击我们的结果
    │
    ▼
/days-until/christmas/2026/
    │
    ├──→ 看到答案："150 days"（大字）
    ├──→ 看到辅助信息："December 25, 2026 is a Friday"
    ├──→ 点击相关链接 → /days-until/new-year/2027/
    │    或
    ├──→ 面包屑 → /days-until/（浏览其他事件）
    │    或
    └──→ 离开（需求已满足）
```

### 5.2 首页入口路径

```
用户搜索 "date calculator"
    │
    ▼
Google SERP → 点击
    │
    ▼
/ 首页
    │
    ├──→ 使用核心计算器（输入日期，即时得结果）
    ├──→ 点击分类卡片 → /days-between/
    ├──→ 点击热门链接 → 程序化页面
    └──→ 浏览 FAQ → 了解更多
```

### 5.3 Hub Page 路径

```
/days-between/ Hub
    │
    ├──→ 使用交互式计算器（输入自定义日期）
    ├──→ 点击精选日期对 → 程序化页面
    ├──→ 面包屑 → 首页
    └──→ FAQ 区块
```

---

## 6. 页面模块

### 6.1 模板 A：首页

```
┌─────────────────────────────────────────────┐
│ MODULE: Header                               │
│  [Logo] [Nav: Days Between | Days From |     │
│          Days Until | Days In]               │
├─────────────────────────────────────────────┤
│ MODULE: Hero Calculator                      │
│  H1: "Date Calculator — Fast & Free"         │
│  [Date Input 1] → [Date Input 2]             │
│  Result: "= 365 days" (大字实时显示)          │
│  Sub: "That's 52 weeks and 1 day"            │
├─────────────────────────────────────────────┤
│ MODULE: Category Cards                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Days     │ │ Days From│ │ Days     │    │
│  │ Between  │ │ Today    │ │ Until    │    │
│  └──────────┘ └──────────┘ └──────────┘    │
├─────────────────────────────────────────────┤
│ MODULE: Popular Now                          │
│  · How many days until Christmas 2026?       │
│  · 90 days from today                        │
│  · Days in February 2028 (leap year)          │
├─────────────────────────────────────────────┤
│ MODULE: FAQ                                  │
│  Q: How do I calculate days between dates?   │
│  Q: Does this include the end date?          │
│  Q: How do you handle leap years?            │
├─────────────────────────────────────────────┤
│ MODULE: Footer                               │
│  [About] [Privacy] [Sitemap]                 │
│  © 2026 SiteName                             │
└─────────────────────────────────────────────┘
```

### 6.2 模板 B：Hub Page

```
┌─────────────────────────────────────────────┐
│ MODULE: Header + Breadcrumb                  │
│  Home > Days Between                        │
├─────────────────────────────────────────────┤
│ MODULE: Page Content                         │
│  H1: "Days Between Dates Calculator"         │
│  P:  "Calculate the exact number of days...  │
│       Free, fast, and accurate."             │
│  [Interactive Calculator if applicable]       │
├─────────────────────────────────────────────┤
│ MODULE: Popular Queries                      │
│  · Days between Jan 1 and Dec 31 2026        │
│  · Days between [today] and Christmas         │
│  · [10-20 个精选链接]                          │
├─────────────────────────────────────────────┤
│ MODULE: FAQ                                  │
│  2-3 个与该品类相关的问答                      │
├─────────────────────────────────────────────┤
│ MODULE: Related Tools                        │
│  · Days From Today Calculator                │
│  · Days Until Events                         │
├─────────────────────────────────────────────┤
│ MODULE: Footer                               │
└─────────────────────────────────────────────┘
```

### 6.3 模板 C：程序化结果页

```
┌─────────────────────────────────────────────┐
│ MODULE: Header + Breadcrumb                  │
│  Home > Days Between > [Date1] to [Date2]   │
├─────────────────────────────────────────────┤
│ MODULE: Answer Hero                          │
│  ┌─────────────────────────────────┐         │
│  │                                 │         │
│  │          365                    │  ← 超大字号 (48-64px)
│  │          days                   │         │
│  │                                 │         │
│  └─────────────────────────────────┘         │
│  "That's 52 weeks and 1 day"                │
│  "Or 8,760 hours"                           │
├─────────────────────────────────────────────┤
│ MODULE: Date Context                        │
│  January 1, 2026 (Thursday)                  │
│     ↓   365 days   ↓                        │
│  December 31, 2026 (Thursday)                │
│  2026 is not a leap year (365 days)          │
├─────────────────────────────────────────────┤
│ MODULE: Explanation                         │
│  "There are exactly 365 days between         │
│   January 1, 2026 and December 31, 2026,     │
│   counting both the start and end dates."    │
├─────────────────────────────────────────────┤
│ MODULE: Related Queries                     │
│  · Days between Jan 1 and Dec 30, 2026      │
│  · Days between Jan 2 2026 and Jan 1 2027   │
│  · 365 days from today                      │
│  · Days until New Year 2027                  │
│  · More days between dates →                 │
├─────────────────────────────────────────────┤
│ MODULE: Footer                               │
└─────────────────────────────────────────────┘
```

---

## 7. API 设计

**本项目没有后端 API。** 所有内容在构建时预生成，部署为纯静态 HTML。

### 交互式计算器的客户端逻辑

首页和 Hub Pages 上的计算器使用少量原生 JavaScript：

```
用户输入日期 → 浏览器内计算 → 实时更新 DOM 显示结果
```

不需要服务器。不需要 API 调用。

---

## 8. 数据库

**本项目没有数据库。** 

- 所有数据（事件列表、月份信息、N 值等）存在 TypeScript 数据文件（`src/lib/data/`）中
- 构建时：Astro 读取数据 → 计算 → 生成静态 HTML
- 运行时：Vercel 直接服务 HTML 文件

---

## 9. 边界情况

### 9.1 日期计算边界

| 边界情况 | 处理方式 |
|---|---|
| 起始日期 > 结束日期（/days-between/2026-12-31/2026-01-01/） | 自动交换顺序，计算绝对值；或 301 到规范顺序 |
| 两个日期相同 | 显示 "0 days"（或 "Same day"） |
| 日期跨过几百年 | 正常计算（Go `time` 包支持） |
| 1582 年之前的日期（格里高利历之前） | 不生成。只覆盖 1900 年以后的日期 |
| 二月 29 日 + 非闰年组合 | 不生成该 URL — 二月 29 日只在闰年存在 |
| 二月 29 日 + 闰年组合 | 正确处理，包括在日期对页面中 |
| 12 月 31 日 → 1 月 1 日（跨年） | 正常计算 |

### 9.2 "Today" 边界

| 边界情况 | 处理方式 |
|---|---|
| "90 days from today" — "today" 一直在变化 | 定期重新生成（建议每周一次，或部署时触发） |
| 跨时区：中国 7/29 已经是新西兰的 7/29 | MVP 使用 UTC 日期。标注 "based on UTC" |
| "Days from today" 临近午夜生成 vs 用户访问 | 微小偏差可接受。6 小时内误差对用户体验影响可忽略 |

### 9.3 URL 边界

| 边界情况 | 处理方式 |
|---|---|
| `/days-between/2026-13-01/` — 无效月份 | 404 页面 |
| `/days-between/2026-02-30/` — 无效日期 | 404 页面 |
| `/days-between/abc/def/` — 垃圾输入 | 404 页面 |
| `/days-between/2026-01-01/` — 缺少第二个日期 | 404 页面 |
| `/days-until/` 没有子路径 | 正常显示 Hub Page |
| URL 尾部斜杠不一致 | 统一 301 到一个版本 |
| Event slug 大小写（/days-until/Christmas/2026/） | 全部小写；大写版本 301 或 404 |

### 9.4 内容边界

| 边界情况 | 处理方式 |
|---|---|
| 两个完全不同日期对，天数碰巧一样（如 365 天跨多个组合） | 内容仍然不同（日期属性不同、上下文不同），不是 duplicate |
| 事件日期的搜索量太低 | 不影响——生成了放着，边际成本为 0 |
| 去年的年份页面（/days-until/christmas/2025/） | 保留页面，方便用户回顾。或者 301 到最新。暂定保留 |
| 未来太远的年份（/days-until/christmas/2035/） | 不生成，只生成 3 年内 |

### 9.5 显示边界

| 边界情况 | 处理方式 |
|---|---|
| 结果天数极大（如 30000 天） | 大字号可能溢出 — CSS `word-break` 确保不破布局 |
| 结果天数 = 0 | 显示 "0 days" 或 "Same day!" |
| 结果天数 = 1 | 显示 "1 day"（单数）而不是 "1 days" |
| 移动端小屏（< 360px） | 答案字号等比缩小，布局不错乱 |
| 事件名很长（"Independence Day" 等） | H1 截断或换行，不溢出 |
| 辅助单位计算溢出（如 2147483647 天 = ? 小时） | 不展示极端单位，只展示周/月 |

---

## 10. 验收标准

### AC-01：首页核心计算器
- [ ] 用户可以输入两个日期（input type="date" 或等效）
- [ ] 选择日期后，天数差自动显示（无需点击"计算"）
- [ ] 在 iOS Safari / Chrome / Firefox 上正常运行
- [ ] 在 375px 宽度下布局不错乱
- [ ] LCP < 1.5s

### AC-02：程序化页面生成
- [ ] 所有程序化页面包含：答案数字、日期上下文、解释文字、面包屑、内部链接
- [ ] 每个页面的 Title / H1 / Meta Description 自动生成且唯一
- [ ] Schema 结构化数据正确嵌入
- [ ] 所有内部链接可点击且指向正确 URL
- [ ] 页面大小 < 50KB（含 HTML + inline CSS）

### AC-03：Sitemap
- [ ] 包含所有页面的 URL
- [ ] `<lastmod>` 准确反映页面生成日期
- [ ] 在 `/sitemap.xml` 可访问
- [ ] Robots.txt 指向 sitemap

### AC-04：URL 规范
- [ ] 尾部斜杠策略一致（全有或全无）
- [ ] 无效 URL 返回 404（非软 404）
- [ ] Canonical 标签存在且指向自己

### AC-05：性能
- [ ] 所有页面 LCP < 1.5s（Cloudflare CDN）
- [ ] CLS = 0
- [ ] 首页 JS < 5KB（压缩后）
- [ ] 纯静态页面零 JS

### AC-06：响应式
- [ ] 320px 宽度：内容完整，无横向滚动
- [ ] 768px 宽度：布局合理
- [ ] 1024px+：居中，最大宽度约 800px
- [ ] 日期选择器在移动端可正常使用

### AC-07：SEO
- [ ] 所有页面有 `<title>` 标签
- [ ] 所有页面有 `<meta name="description">`
- [ ] 所有页面有 `<link rel="canonical">`
- [ ] 所有页面有 Open Graph tags
- [ ] 所有页面有 Schema.org 结构化数据
- [ ] Robots.txt 允许所有爬虫

### AC-08：构建管道
- [ ] 一键生成所有页面（`npm run build`）
- [ ] 生成时间 < 60 秒（对于 ~530 页）
- [ ] 生成的 HTML 有效（通过基本 W3C 验证）
- [ ] 构建输出到 `dist/`，可直接部署

---

## 11. 优先级划分

### P0 — MVP 必须上线

| ID | 项目 | 说明 |
|---|---|---|
| F01 | 首页 + 核心计算器 | 用户落地页 + 核心交互 |
| F02 | Days Between 程序化页面（~100） | 核心长尾矩阵 |
| F03 | Days From Today 页面（~30） | 最常见的日期推算 |
| F04 | Days Until 事件页面（~150） | 倒计时类，搜索量大 |
| F05 | Days In Month 页面（12） | 基础信息查 |
| F10 | SEO 基础设施 | 没有 SEO 就没有流量 |
| F11 | 内部链接网络 | Google 爬取和权重传递 |
| F12 | 静态生成管道 | 整个项目的技术基础 |
| F13 | 部署（Cloudflare Pages） | 上线 |
| — | Privacy 页面 | 合规要求 |
| — | Robots.txt + Sitemap | 收录必需 |

### P1 — MVP 之后优先

| ID | 项目 | 说明 |
|---|---|---|
| F06 | Days In Year 页面（~7） | 补充年份信息 |
| F07 | Days From Specific Date（~200） | 扩展长尾覆盖 |
| F08 | Age in Days 页面 | 新品类扩展 |
| — | About 页面 | 信任信号 |
| — | Google Search Console 提交 | 加速收录 |

### P2 — 后续迭代

| ID | 项目 | 说明 |
|---|---|---|
| F09 | Days Left in Year（~3） | 年末流量 |
| — | 404 页面 | 更好的用户体验 |
| — | Dark Mode | Nice to have |
| — | 更多的 N 值和日期组合 | 扩展长尾 |
| — | Bing Webmaster 提交 | 补齐 |

---

## 12. 下一步

👉 进入 **第七阶段：技术方案**（等待确认）
