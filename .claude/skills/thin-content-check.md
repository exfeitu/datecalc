# Thin Content Check Skill

## Description

检查程序化页面是否满足 7 元素反薄内容策略，避免 Google 将程序化页面标记为 "thin content"。

## When to Use

- 新增页面模板后，首个页面生成完毕时
- 修改模板布局后
- 每周从各类型页面各抽查 1-2 页

## 7 元素检查清单

每个程序化页面必须包含以下 7 个元素：

| # | 元素 | 对应组件 | 检查方式 |
|---|---|---|---|
| 1 | **答案大字** | `AnswerHero` | 页面首屏有大号数字+单位 |
| 2 | **分解信息** | `AnswerHero.subtitle` | 周数换算、小时数等 |
| 3 | **日期上下文** | `DateContext` | 星期几、是否是闰年、第几季度 |
| 4 | **年份上下文** | `DateContext` | 年份天数、闰年信息 |
| 5 | **自然语言解释** | 模板内 text | 1-2 句完整的英文解释句 |
| 6 | **相关链接** | `RelatedQueries` | 3-5 个内部链接 |
| 7 | **面包屑** | `Breadcrumb` | 导航层级 |

## Sampling Strategy

```bash
# 每个模板抽样 2 页，通过浏览器或 curl 获取 HTML 后检查

# Days Between 模板
curl -s https://<project>.vercel.app/days-between/2026-01-01/2026-12-31/ > /tmp/sample-1.html

# Days From Today 模板
curl -s https://<project>.vercel.app/days-from-today/90/ > /tmp/sample-2.html

# Days Until 模板
curl -s https://<project>.vercel.app/days-until/christmas/2026/ > /tmp/sample-3.html

# Days In Month 模板
curl -s https://<project>.vercel.app/days-in/february/ > /tmp/sample-4.html
```

## Content Quality Check

### 1. 答案大字（AnswerHero）
- [ ] `<h1>` 或 `.answer-value` 包含具体数字
- [ ] 数字是大字号展示（非正文小字）
- [ ] 单位（days / weeks / months）紧随数字

### 2. 分解信息
- [ ] 有换算信息（如 "That's 52 weeks and 1 day"）
- [ ] 换算逻辑正确（用 dates.ts 验证）

### 3-4. 日期/年份上下文
- [ ] 每个日期标注了星期几
- [ ] 涉及 2 月的页面标注了是否是闰年
- [ ] 跨年页面标注了每年的天数

### 5. 自然语言解释
- [ ] 至少 1 句完整英文句子描述查询
- [ ] 句子包含具体数字和日期（不是纯模板变量拼接）
- [ ] 每个页面的解释句互不相同（因为数字不同）

### 6. 相关链接
- [ ] 至少 3 个内部链接
- [ ] 链接到真实存在的页面
- [ ] 链接锚文本包含具体数字/日期（不是 "click here"）
- [ ] 至少 1 个链回 Hub page

### 7. 面包屑
- [ ] 所有层级可点击（除当前页）
- [ ] 层级结构正确：Home > Category > Current Page
- [ ] Schema BreadcrumbList 对应存在

## Anti-Pattern Detection

以下模式会被 Google 判定为 thin content，检查时必须标记：

| 反模式 | 说明 | 风险 |
|---|---|---|
| 🔴 纯数字无上下文 | 页面上只有一个数字，其他什么解释都没有 | 极高 |
| 🔴 跨类型内容重复 | Days Between 和 Days From 的解释文字完全一样 | 高 |
| 🟡 内部链接锚文本相同 | 所有相关链接都是 "click here" 或 "more dates" | 中 |
| 🟡 FAQ 内容与页面无关 | FAQ 问的是通用问题，与页面具体内容不对应 | 中 |
| 🟡 Template boilerplate | 非变量部分占页面 > 50% 的文本量 | 中 |

## Output Format

```
模板: days-between
抽样: 2/100 页

✅ AnswerHero: 数字+单位完整
✅ 分解信息: "52 weeks and 1 day" 存在
✅ 日期上下文: 星期几已标注
⚠️ 年份上下文: 缺少 "2026 is not a leap year" 信息
✅ 解释句: "There are exactly 364 days..." 完整
✅ 内部链接: 5 个链接 (3 同类 + 1 跨类 + 1 Hub)
✅ 面包屑: Home > Days Between > Jan 1 2026 to Dec 31 2026

总计: 6/7 通过, 1 警告
```

每个警告附带具体修复建议。
