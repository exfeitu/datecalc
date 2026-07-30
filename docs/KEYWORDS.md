# KEYWORDS — 关键词研究

> 版本 v1.0 | 2026-07-28 | 第二阶段：关键词研究

---

## 1. 搜索意图框架

日期计算查询的意图分析：

| 意图类型 | 占比 | 用户想得到的 | 示例 |
|---|---|---|---|
| **Know-Simple**（快速知道一个数字） | ~60% | 一个天数或日期 | "how many days until Christmas" |
| **Know-Answer**（验证一个答案） | ~20% | 确认自己的计算是否正确 | "days between 1/1/2025 and 12/31/2025" |
| **Do**（执行计算后做决策） | ~15% | 算完天数后安排计划 | "90 days from today what date" |
| **Website-Navigation** | ~5% | 直接找 timeanddate.com | "time and date calculator" |

**关键洞察**：多数日期计算查询是 "Know-Simple"——用户想在一个简单页面看到答案，看完就走。Google 对具体日期间的计算（两个日期之间的具体天数）通常**不**给出 Instant Answer，这意味着用户必须点击进入某个页面。

---

## 2. 核心关键词

### Head Terms（头部关键词）

| 关键词 | 月搜索量(估) | SEO 难度 | 是否入选 MVP | 说明 |
|---|---|---|---|---|
| `date calculator` | 500K+ | 🔴 极高 | ❌ | timeanddate.com、calculator.net 统治 |
| `days between dates` | 150K | 🔴 极高 | ❌ | 同上 |
| `day counter` | 100K | 🔴 极高 | ❌ | 大站垄断 |
| `countdown` | 200K+ | 🔴 极高 | ❌ | 太泛，含 App 搜索 |

> **Head terms 不做**——零预算独立开发者不可能在这里竞争。这些是陷阱。

### Body Terms（中腰部关键词）

| 关键词 | 月搜索量(估) | SEO 难度 | 入选 MVP | 说明 |
|---|---|---|---|---|
| `how many days until` | 80K | 🟡 中高 | ✅ | 核心突破口——可衍生无限长尾 |
| `how many days since` | 30K | 🟡 中 | ✅ | 同上 |
| `days from today` | 60K | 🟡 中高 | ✅ | "X days from today" |
| `how many days in` | 40K | 🟡 中 | ✅ | "how many days in July" |
| `age in days` | 20K | 🟢 中低 | ✅ | 具体需求，竞争少 |
| `what day of the week` | 50K | 🟡 中 | P2 | 后续扩展 |
| `days left in year` | 5K | 🟢 低 | ✅ | 年末爆发 |
| `weeks until` | 8K | 🟢 低 | ✅ | 和天数接近 |

---

## 3. 长尾关键词（Programmatic SEO 核心）

这些是我们要建立的百万级页面矩阵：

### 类型 1：事件倒计时页 `how many days until [EVENT] [YEAR]`

**生成模式**：
```
模板：How Many Days Until [Event] [Year]
变量：[Event] × [Year]

Events: Christmas, New Year, Thanksgiving, Halloween, Easter, Valentine's Day
        Summer, Spring, Winter, Fall
        Black Friday, Cyber Monday
        Mother's Day, Father's Day
        Independence Day (US), Canada Day, St. Patrick's Day
        Super Bowl, World Cup, Olympics
        ...共 ~50 个常搜事件

Years: 2026, 2027, 2028
        (只覆盖当前和不久的将来——太远的年份没人搜)
```

预估页面数：50 × 3 = **150 页**

搜索意图：**Know-Simple**——用户想知道还有多少天

### 类型 2：日期推算页 `[N] days from [DATE]`

**生成模式**：
```
模板：[N] Days From [Date] / What Date Is [N] Days From [Date]
变量：[N] × [Date]

N 值：30, 45, 60, 90, 120, 180, 365, 7, 14, 21, 10, 15, 20, 25
      加上用户可能在搜索引擎里输入的随机数字

Dates: 每个月的第 1 天 + 第 15 天 + 今天语义
```

这是最强劲的程序化 SEO 来源——用户搜索 "90 days from today" 或 "30 days from December 1 2026"。

预估页面数（MVP）：~200 页（精选高价值组合）

### 类型 3：日期跨度页 `how many days between [DATE1] and [DATE2]`

**生成模式**：
```
模板：How Many Days Between [Date 1] and [Date 2]
变量：[Date1] × [Date2]
```

组合爆炸：365 × 365 = 133,225 个日期对（仅一年）

**MVP 策略**：不全量生成。先针对高价值日期对：

- 跨年：12/1/2026 to 1/15/2027 等
- 季度：Q1 到 Q2 等
- 学期：选几个典型日期
- 热门事件跨距

预估页面数（MVP）：~100 页（精选）

后期验证假设后，逐步扩大日期范围到全量生成。

### 类型 4：历史日期页 `how many days since [YEAR]`

**生成模式**：
```
模板：How Many Days Since January 1 [Year]
变量：[Year]
```

用户搜索变体："how long ago was 2020"、"how many days since 2020 started"

预估页面数：~30 页（覆盖 2000 到 2030）

### 类型 5：某月/某年天数 `how many days in [MONTH] [YEAR]`

**生成模式**：
```
模板：How Many Days in [Month] [Year]
变量：[Month] × [Year]
```

预估页面数：12 × 5 = **60 页**

搜索意图：**Know-Simple**——用户不记得某月有几天（特别是二月）

### 类型 6：年龄页 `how old am I in [TIME_UNIT]`

**生成模式**：
```
模板：How Old Am I in [Unit] / How Many [Units] Old Am I
变量：[Unit] = Days, Weeks, Hours, Minutes, Seconds
```

对这些通用页面，再加出生年份的分页：
```
How Many Days Old Is Someone Born in [Year]
```

预估页面数：~50 页

---

## 4. 真实搜索查询假设

这些是基于 Google Autocomplete + People Also Ask 推断的用户实际搜索语句：

```
how many days until christmas
how many days until december 25
how many days until new year 2027
how many days until 2027
how many days until summer 2027
how many days until my birthday
how many days until halloween
how many days until thanksgiving

how many days since january 1 2026
how many days since last christmas
how many days ago was july 4 2026
how many days since 2020

90 days from today
30 days from today
60 days from december 1 2026
180 days from july 28 2026
what date is 45 days from today
what date was 90 days ago

how many days between june 1 and september 1
how many weeks between two dates
how many months between dates

how many days in 2026
how many days in february 2026
how many days in july
how many days in a year

how old am i in days
how many days old am i
how old am i in weeks
how many seconds old am i

what day of the week is december 25 2026
what day was january 1 2000
days left in 2026
how many weeks left in 2026
```

---

## 5. 关键词商业价值分析

| 关键词类型 | 商业价值 | RPM 预估 | 说明 |
|---|---|---|---|
| 事件倒计时 | 🟢 中 | $2-5 | 用户可能要买礼物、机票，有潜在购买意图 |
| 日期推算 | 🟡 中低 | $1-3 | 纯工具需求，但包含业务场景（合同、项目） |
| 日期跨度 | 🟡 中低 | $1-3 | 同上 |
| 年/月天数 | 🟢 中 | $3-6 | 用户可能在做财务/业务计算 |
| 年龄计算 | 🟢 中 | $3-5 | 可能关联人寿保险、生日礼物 |
| 星期/周数 | 🔴 低 | $0.5-2 | 纯好奇/验证型 |

> **重要**：日期计算工具的 RPM 整体偏低——用户停留时间短、跳出率高。**不要依赖广告把它做成暴利项目**。这个项目的价值在于：
> 1. **练手 Programmatic SEO 技术**——这套技术栈可迁移到任何品类
> 2. **获取 backlink 资产**——工具站天然吸引外链，积累的域名权重可复用
> 3. **流量本身有价值**——如果能做到 DAU 10K+，之后可延伸变现方式

---

## 6. SEO 难度评估

```
关键词层级         难度        竞争格局          我们的策略
──────────────────────────────────────────────────────────
Head Terms         🔴 极高    timeanddate 等      ❌ 不碰
Body Terms         🟡 中高   多玩家竞争           ✅ 选几个长尾切入
Event Countdowns   🟢 中低   有但页面质量差       ✅ 大量生成
Date Calculations  🟢 低     几乎没有专门页面     ✅✅✅ 主攻
```

**核心机会窗口**：具体日期对的计算页面（"90 days from December 15 2026"、"how many days between March 1 and October 31 2026"）——竞品要么没有，要么页面质量很差。这恰好是我们程序化生成的优势。

---

## 7. 是否适合工具站 & Programmatic SEO

| 评估维度 | 评分 | 说明 |
|---|---|---|
| 适合工具站 | ⭐⭐⭐⭐⭐ | 纯工具属性，功能=计算 |
| 适合 Programmatic SEO | ⭐⭐⭐⭐⭐ | 模板化程度极高，变量清晰 |
| 页面模板统一度 | ⭐⭐⭐⭐⭐ | 所有页面共享同一布局 |
| 长尾丰富度 | ⭐⭐⭐⭐⭐ | 日期组合近乎无限 |
| Google 给 Instant Answer 概率 | ⭐⭐⭐⭐ | 对具体日期组合基本不给 |
| 用户真实需求 | ⭐⭐⭐⭐ | 是真需求，不是人造关键词 |
| 内容稳定性 | ⭐⭐⭐⭐⭐ | 日期逻辑永不过时 |
| 维护成本 | ⭐⭐⭐⭐⭐ | 纯算法，零内容维护 |

---

## 8. MVP 关键词优先级

### P0：第一批必须覆盖

```
📌 "how many days until [event] [year]"       → 150 页
📌 "[N] days from today"                       → 30 页（常见 N 值）
📌 "how many days in [month]"                  → 12 页（每月）
📌 "days left in [year]"                       → 3 页（2026-2028）
📌 首页 date calculator                        → 1 页
```

### P1：第二批扩展

```
📌 "[N] days from [month] [day] [year]"       → 200 页
📌 "how many days since [year]"               → 30 页
📌 "how old am I in [days/weeks/hours]"        → 5 页
📌 "how many days until [event] 2028"         → 覆盖更多年份
```

### P2：后续迭代

```
📌 "how many days between [date1] and [date2]" → 从精选到全面
📌 "what day of the week is [date]"            → 按需
📌 "how many [months/weeks/business days]..."  → 新功能探索
```

---

## 9. 竞品关键词快照

在这个阶段不做深度竞品分析（第三阶段才做），但先标注几个主要玩家覆盖的关键词特征：

| 竞品 | 覆盖策略 | 弱点 |
|---|---|---|
| timeanddate.com | Head + Body，全品类 | 页面臃肿，广告多，长尾覆盖不足 |
| calculator.net | Head + Body，通用计算器 | 日期计算只是其中一块，不够专注 |
| calendardate.com | Body + 长尾，专注日期 | 页面质量一般，速度慢 |
| weeksuntil.com | 长尾事件倒计时 | 品类窄，只做倒计时 |
| howmanydaysuntil.center | 长尾倒计时 | 页面太薄，几乎没有内容 |

---

## 10. 下一步

👉 进入 **第三阶段：竞品分析**（等待确认）
