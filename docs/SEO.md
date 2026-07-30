# SEO — SEO 架构

> 版本 v1.0 | 2026-07-28 | 第五阶段：SEO 架构

---

## 1. 网站结构

### 1.1 信息架构

```
                         ┌──────────────────┐
                         │     Homepage      │
                         │   (date tool)     │
                         └────────┬─────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    ┌─────▼─────┐          ┌─────▼─────┐          ┌─────▼─────┐
    │Days Between│          │Days From  │          │Days Until │
    │   Hub      │          │   Hub     │          │   Hub     │
    └─────┬─────┘          └─────┬─────┘          └─────┬─────┘
          │                      │                      │
    ┌─────┴─────┐          ┌─────┴─────┐          ┌─────┴─────┐
    │  Date Pair │          │ N Days    │          │  Event    │
    │  Pages     │          │ Pages     │          │  Pages    │
    │  (~100)    │          │ (~230)    │          │  (~150)   │
    └───────────┘          └───────────┘          └───────────┘

          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    ┌─────▼─────┐          ┌─────▼─────┐          ┌─────▼─────┐
    │ Days In   │          │ Days Left │          │ Age in    │
    │ Month/Year│          │  in Year  │          │  Days     │
    │ (~19)     │          │  (~3)     │          │  (~20)    │
    └───────────┘          └───────────┘          └───────────┘
```

### 1.2 页面层级

```
层级 0（根）：
  /                                    1 页    首页 + 核心交互式计算器

层级 1（品类 Hub）：
  /days-between/                       1 页    Days Between 交互工具 + 入口
  /days-from-today/                    1 页    Days From Today 交互工具 + 入口
  /days-until/                         1 页    事件倒计时索引
  /days-in/                            1 页    月份天数索引
  /age-in-days/                        1 页    年龄计算器
────────────────────────────────────────────────────────────
  层级 1 合计：                         5 页

层级 2（程序化页面）：
  /days-between/{date1}/{date2}/      ~100 页  精选日期对页面
  /days-from-today/{n}/               ~30 页   常见 N 值
  /days-from/{n}/{date}/             ~200 页  具体日期推算
  /days-until/{event}/{year}/        ~150 页  事件倒计时
  /days-in/{month}/                   ~12 页  每月天数
  /days-in/{year}/                     ~7 页  每年天数
  /days-left-in/{year}/                ~3 页  年底倒计时
  /age-in-days/year/{year}/           ~20 页  各年份出生年龄
────────────────────────────────────────────────────────────
  层级 2 合计：                       ~522 页

其他页面：
  /about/                              1 页
  /privacy/                            1 页
  /sitemap.xml                         1 个
  /sitemap-index.xml                   1 个
────────────────────────────────────────────────────────────
  MVP 总页面量：                      ~530 页
```

---

## 2. URL 设计

### 2.1 设计原则

| 原则 | 说明 |
|---|---|
| **可读性** | URL 本身应该传达页面的内容 |
| **关键词前置** | 核心关键词在路径中自然出现 |
| **一致性** | 同类页面使用一致的模式 |
| **短** | 越短越好，但不要牺牲可读性 |
| **小写 + 连字符** | `days-between` 不是 `DaysBetween` 或 `days_between` |
| **无尾部斜杠** | 统一没有 trailing slash（通过 redirect 处理） |

### 2.2 URL 模式定义

```bash
# ─── Days Between ───
# Hub page（交互式计算器）
/days-between/

# Date pair pages（程序化生成）
/days-between/2026-01-01/2026-12-31/
#  → "How many days between January 1 2026 and December 31 2026?"

# ─── Days From Today ───
# Hub page
/days-from-today/

# N days from today（程序化生成）
/days-from-today/90/
#  → "90 days from today is [date]"

# N days from specific date（程序化生成）
/days-from/90/2026-12-25/
#  → "90 days from December 25 2026 is [date]"

# ─── Days Until ───
# Hub page（事件索引）
/days-until/

# Event countdown pages（程序化生成）
/days-until/christmas/2026/
/days-until/new-year/2027/
/days-until/halloween/2026/
#  → "There are N days until Christmas 2026"

# ─── Days In ───
# Month pages
/days-in/january/
/days-in/february/
#  → "There are 31 days in January"

# Year pages
/days-in/2026/
#  → "2026 has 365 days"

# ─── Days Left ───
/days-left-in/2026/
#  → "There are N days left in 2026"

# ─── Age in Days ───
# Hub page（交互式）
/age-in-days/

# Age by birth year（程序化生成）
/age-in-days/year/2000/
#  → "Someone born in 2000 is approximately N days old"

# ─── Static Pages ───
/about/
/privacy/
```

### 2.3 日期格式规范

在 URL 中使用 **ISO 8601 格式**（YYYY-MM-DD）：

| 格式 | 示例 | 理由 |
|---|---|---|
| ✅ `2026-12-25` | `/days-between/2026-01-01/2026-12-25/` | 国际标准、可排序、无歧义 |
| ❌ `12-25-2026` | `/days-between/12-25-2026/...` | 美国格式，非国际读者困惑 |
| ❌ `december-25-2026` | `/days-between/december-25-2026/` | 太长、URL 臃肿 |

---

## 3. 分类（Hub Page）设计

### 每个 Hub Page 必须包含

```
✅ H1 标题（匹配核心关键词）
✅ 交互式计算器（如果适用）
✅ 精选程序化页面链接（Top 10-20）
✅ Schema.org 标记
✅ 1-2 段说明文字（SEO + 用户引导）
✅ 面包屑导航
✅ FAQ 区块（2-3 个常见问题）
```

### Hub Page 的 SEO 定位

Hub pages 不是用来排名长尾的——它们用来：

1. **排名中腰部关键词**（"days between dates", "days from today" 等）
2. **给 Google 传递主题权威信号**（一个目录下全是高度相关的页面）
3. **把链接权重传递给子页面**（内部链接的核心节点）

---

## 4. Landing Page（首页）设计

### 首页内容

```
┌─────────────────────────────────────────────┐
│  Logo + Site Name                            │
│                                               │
│  H1: Date Calculator — Fast & Free            │
│                                               │
│  ┌─────────────────────────────────┐          │
│  │  Quick Calculator (核心工具)     │          │
│  │  [Date1] → [Date2] = N days     │          │
│  └─────────────────────────────────┘          │
│                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Days      │ │Days From │ │Days Until│      │
│  │Between   │ │Today     │ │Events    │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│                                               │
│  Popular now:                                  │
│  · How many days until Christmas 2026?        │
│  · 90 days from today                         │
│  · Days between July 1 and December 31 2026  │
│                                               │
│  FAQ section (3-5 questions)                  │
└─────────────────────────────────────────────┘
```

首页不做复杂设计，重点是：**最快的核心计算器 + 热门链接入口。**

---

## 5. Programmatic SEO 策略

### 5.1 模板化页面生成

每个程序化页面由 **模板 + 数据** 生成：

```
模板（1 个）                         数据（N 条）
┌──────────────────┐              ┌─────────────────────┐
│ {title}          │              │ date1: 2026-01-01   │
│ {h1}             │    填充      │ date2: 2026-12-31   │
│ {answer_days}    │ ◄────────── │ answer: 364          │
│ {answer_weeks}   │              │ weekday1: Thursday   │
│ {context_text}   │              │ weekday2: Wednesday  │
│ {breadcrumb}     │              │ ...                  │
│ {schema}         │              └─────────────────────┘
│ {related_links}  │
└──────────────────┘
```

### 5.2 反薄内容策略（Anti-Thin-Content）

Google 可能惩罚内容过薄的页面。每个程序化页面至少包含：

| 元素 | 说明 | 例子 |
|---|---|---|
| **答案大字** | 核心数据，首屏展示 | "365 days" |
| **分解信息** | 周、月、小时等单位换算 | "That's 52 weeks and 1 day" |
| **日期上下文** | 日期本身的属性 | "January 1, 2026 is a Thursday" |
| **年份上下文** | 闰年、天数等 | "2026 is not a leap year" |
| **1 句解释** | 自然语言描述查询 | "There are exactly 365 days from January 1 2026 to December 31 2026, inclusive." |
| **相关链接** | 3-5 个内部链接 | 链接到附近日期、其他常见组合 |
| **面包屑** | 导航层级 | Home > Days Between > Jan 1 2026 to Dec 31 2026 |

### 5.3 内容差异化

同类型页面之间的差异来源：

| 差异化来源 | 说明 |
|---|---|
| 答案数字不同 | 最核心的差异——每个页面的核心值都不同 |
| 日期属性不同 | 星期几、第几周、是否是闰年等等不同 |
| 上下文文本不同 | 模板变量生成 1-2 句自然语言解释 |
| 相关链接不同 | 链向不同范围的相近日期 |

### 5.4 索引策略

**MVP（< 1000 页）**：全部提交到 sitemap，不做任何 index/noindex 控制。

**扩展阶段（> 10000 页）**：
- 使用 sitemap index 分片
- 新生成的页面分批提交
- 监控 Google Search Console 的收录率
- 如果收录率下降，可能是质量信号不够——减少生成量，提高单页质量

---

## 6. Schema 结构化数据

### 6.1 首页 / Hub Pages：WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Date Calculator",
  "url": "https://example.com/",
  "description": "Free online date calculator. Calculate days between dates, countdown to events, and more. Fast, simple, no ads.",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### 6.2 程序化结果页面：WebPage + FAQ

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Days Between January 1 2026 and December 31 2026",
  "description": "There are 364 days between January 1, 2026 and December 31, 2026.",
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many days between January 1 2026 and December 31 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are exactly 364 days. That's 52 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How many weeks between these dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "52 weeks."
        }
      }
    ]
  }
}
```

> ⚠️ Google 对程序化 FAQ schema 有打压力度。如果页面 FAQ 内容确实回答了真实问题，可以保留；如果被 Google 在 Search Console 标记为"滥用"，立即移除所有程序化页面的 FAQ schema，只保留在 Hub Pages 上。

### 6.3 面包屑：BreadcrumbList（所有页面）

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Days Between",
      "item": "https://example.com/days-between/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Jan 1 2026 to Dec 31 2026"
    }
  ]
}
```

### 6.4 Schema 应用规则

| 页面类型 | Schema |
|---|---|
| 首页 | WebApplication + Organization + BreadcrumbList |
| Hub Pages | WebApplication + FAQPage + BreadcrumbList |
| 程序化结果页 | WebPage + FAQPage（谨慎） + BreadcrumbList |
| About | AboutPage + Organization |
| Privacy | WebPage |

---

## 7. Meta Tags

### 7.1 Title 模板

```html
<!-- 首页 -->
<title>Date Calculator — Free, Fast & Simple | SiteName</title>

<!-- Days Between Hub -->
<title>Days Between Dates Calculator | SiteName</title>

<!-- Days Between 程序化页 -->
<title>{N} Days Between {Date1} and {Date2} | SiteName</title>

<!-- Days From Today Hub -->
<title>Days From Today Calculator | SiteName</title>

<!-- Days From Today 程序化页 -->
<title>{N} Days From Today — What Date Is {N} Days From Now? | SiteName</title>

<!-- Days Until 程序化页 -->
<title>How Many Days Until {Event} {Year}? | SiteName</title>

<!-- Days In 月 -->
<title>How Many Days in {Month}? | SiteName</title>

<!-- Days In 年 -->
<title>How Many Days in {Year}? | SiteName</title>
```

### 7.2 Meta Description 模板

```html
<!-- Days Between -->
<meta name="description" content="There are exactly {N} days between {Date1} and {Date2}. That's {W} weeks and {D} days. {Date1} is a {Weekday1}, {Date2} is a {Weekday2}." />

<!-- Days From Today -->
<meta name="description" content="{N} days from today ({Today}) is {Result_Date}. {Result_Date} is a {Weekday}. That's {W} weeks from now." />

<!-- Days Until -->
<meta name="description" content="There are {N} days until {Event} {Year}. {Event} falls on {Weekday}, {Date}." />

<!-- Days In -->
<meta name="description" content="{Month} has {N} days. {Is_Leap_Year_Info}" />
```

### 7.3 Meta 通用项

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{CANONICAL_URL}" />

<!-- Open Graph -->
<meta property="og:title" content="{PAGE_TITLE}" />
<meta property="og:description" content="{META_DESCRIPTION}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{CANONICAL_URL}" />
<meta property="og:site_name" content="SiteName" />

<!-- Twitter -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="{PAGE_TITLE}" />
<meta name="twitter:description" content="{META_DESCRIPTION}" />
```

### 7.4 Canonical 规则

| 场景 | Canonical |
|---|---|
| 程序化页面 | Self-canonical（每个页面指向自己） |
| `/days-between/` vs `/days-between` | 选一个规范形式，另一个 301 跳转 |
| 同一个日期对有多种 URL 写法 | 只有一种 URL 被生成，不存在重复 |

---

## 8. Internal Link（内部链接）

### 8.1 链接权重流动

```
Homepage (最高权重)
   │
   ├──→ 5 个 Hub Pages (高权重)
   │       │
   │       ├──→ 程序化页面 (权重被稀释，但有主题相关性弥补)
   │       │       │
   │       │       └──→ 交叉链接到相关程序化页面
   │       │
   │       └──→ 交叉链接到其他 Hub Pages
   │
   └──→ About / Privacy
```

### 8.2 每个程序化页面的内部链接区块

```html
<section class="related-queries">
  <h2>Related Date Calculations</h2>
  <ul>
    <!-- 同类型 +1/-1 -->
    <li><a href="/days-between/2026-01-01/2026-12-30/">Days between Jan 1 and Dec 30, 2026</a></li>
    <li><a href="/days-between/2026-01-02/2026-12-31/">Days between Jan 2 and Dec 31, 2026</a></li>

    <!-- 跨类型相关 -->
    <li><a href="/days-from-today/365/">365 days from today</a></li>
    <li><a href="/days-until/new-year/2027/">Days until New Year 2027</a></li>

    <!-- 回到 Hub -->
    <li><a href="/days-between/">More days between dates →</a></li>
  </ul>
</section>
```

### 8.3 链接策略

| 规则 | 说明 |
|---|---|
| 每个程序化页面至少 5 条内部链接 | 3 条同类 + 2 条跨类 + 1 条回 Hub |
| Hub Page 链接到 Top 20 程序化页面 | 最热门/最有代表性的子页面 |
| 首页链接到所有 Hub Pages | 固定的主导航 + 热门链接 |
| 面包屑在每个页面都有 | 点击可达，结构统一 |
| 不使用 `nofollow` 在内部链接上 | 让权重自由流动 |

---

## 9. 技术 SEO 清单

```
[ ] robots.txt: 允许所有爬虫，指向 sitemap
[ ] sitemap.xml: 包含所有页面，lastmod 准确
[ ] HTTPS: Vercel 自带
[ ] Canonical: 每个页面 self-canonical
[ ] 404 页面: 自定义，带搜索和内部链接
[ ] 301 重定向: 统一尾部斜杠策略（Astro 默认无斜杠）
[ ] 页面 < 100KB（含 HTML + CSS）
[ ] LCP < 1.5s
[ ] CLS = 0
[ ] 移动端 responsive
[ ] 所有图片有 alt 属性
[ ] 无 JavaScript 依赖（纯 HTML + CSS）
[ ] Cache-Control: max-age=86400（CDN 缓存 24h）
[ ] Google Search Console 注册
[ ] Bing Webmaster Tools 注册（顺手）
[ ] Vercel Deploy Hook 每周重建（Days From Today + Days Until 页面）
```

---

## 10. 下一步

👉 进入 **第六阶段：PRD**（等待确认）
