# TASK — 任务拆分

> 版本 v1.0 | 2026-07-28 | 第八阶段

---

## 总览

| Sprint | 主题 | 预估时间 | 任务数 |
|---|---|---|---|
| Sprint 1 | 项目初始化 & 基础设施 | 2 天 | 3 |
| Sprint 2 | 首页 & 共享组件 | 2 天 | 2 |
| Sprint 3 | Days Between 页面群 | 2 天 | 3 |
| Sprint 4 | Days From 页面群 | 2 天 | 2 |
| Sprint 5 | Days Until & 其余页面 | 2 天 | 3 |
| Sprint 6 | 收尾、SEO 审查 & 上线 | 2 天 | 3 |
| **合计** | | **~12 天** | **16 个任务** |

---

## Sprint 1：项目初始化 & 基础设施（Day 1-2）

### Task 1.1：创建 Astro 项目 + Git + 部署流水线

| 项 | 说明 |
|---|---|
| **目标** | Astro 项目能跑、能构建、能部署到 Vercel |
| **输入** | 无 |
| **输出** | GitHub 仓库 + Vercel 自动部署 + 构建成功的 `Hello World` 页面 |
| **完成标准** | - `npm run dev` 正常启动 <br/> - `npm run build` 无报错 <br/> - `git push` 后 Vercel 自动部署成功 <br/> - 浏览器访问 `*.vercel.app` 看到页面 |
| **依赖** | 无 |

**具体步骤**：
```bash
npm create astro@latest . -- --template minimal --typescript strict
# 选: Yes (TypeScript), Yes (deps), Yes (git)
git init && git add . && git commit -m "init: astro project"
# GitHub: create repo → git remote add → git push
# Vercel: Import Project → 自动识别 Astro → Deploy
```

---

### Task 1.2：构建 BaseLayout + Header + Footer + 全局 CSS

| 项 | 说明 |
|---|---|
| **目标** | 所有页面共享的基础布局就绪 |
| **输入** | Task 1.1 完成 |
| **输出** | `BaseLayout.astro`, `Header.astro`, `Footer.astro`, `global.css` |
| **完成标准** | - 页面使用 BaseLayout 包裹后，自动注入 meta/schema/canonical/OG <br/> - Header 包含所有分类导航链接 <br/> - Footer 包含 About / Privacy 链接 <br/> - 全局 CSS 定义了字体、颜色、间距、响应式断点 <br/> - 在 320px / 768px / 1024px 下布局正常 |
| **依赖** | Task 1.1 |

**CSS 规范**：
- 字体：`system-ui, -apple-system, sans-serif`（零外部加载）
- 最大内容宽度：`max-width: 720px; margin: 0 auto;`
- 颜色：黑白灰为主，蓝色用于链接
- 断点：`@media (max-width: 640px)` 移动端适配

---

### Task 1.3：构建核心工具库（lib/）

| 项 | 说明 |
|---|---|
| **目标** | 所有页面可复用的纯函数就绪 |
| **输入** | Task 1.1 完成 |
| **输出** | `src/lib/dates.ts`, `meta.ts`, `schema.ts`, `formatters.ts` |
| **完成标准** | - `dates.ts`: `daysBetween()`, `dateFromDays()`, `getWeekday()`, `isLeapYear()`, `daysInMonth()` 通过单元测试（至少各 2 个用例） <br/> - `meta.ts`: 每个模板函数返回 `{ title, description }` <br/> - `schema.ts`: 生成合法 JSON-LD 对象 <br/> - `formatters.ts`: 数字单复数格式化、日期格式化 |
| **依赖** | Task 1.1 |

---

## Sprint 2：首页 & 共享组件（Day 3-4）

### Task 2.1：首页 + 交互式计算器

| 项 | 说明 |
|---|---|
| **目标** | 首页完整可用，核心计算器能工作 |
| **输入** | Sprint 1 完成 |
| **输出** | `src/pages/index.astro` + `src/components/Calculator.astro` + `CategoryCard.astro` |
| **完成标准** | - H1: "Date Calculator — Fast & Free" <br/> - 两个日期输入框 + 自动计算天数（显示大字结果） <br/> - 3 张分类卡片（Days Between / Days From Today / Days Until） <br/> - Popular Now 链接区块（5 个热门查询链接） <br/> - FAQ 区块（3-5 题） <br/> - 计算器 JS < 3KB <br/> - 移动端日期选择器可正常使用 |
| **依赖** | Task 1.2, 1.3 |

**验收节点**：
- [ ] 输入 2026-01-01 和 2026-12-31 → 显示 "364 days"
- [ ] 输入 2026-12-31 和 2026-01-01 → 仍显示 "364 days"（绝对值）
- [ ] 只输入一个日期 → 不显示结果
- [ ] iPhone SE 宽度（375px）下计算器正常

---

### Task 2.2：共享组件（Breadcrumb / AnswerHero / DateContext / RelatedQueries / FAQ）

| 项 | 说明 |
|---|---|
| **目标** | 所有程序化页面可复用的展示组件就绪 |
| **输入** | Sprint 1 完成 |
| **输出** | 5 个 Astro 组件 |
| **完成标准** | - `Breadcrumb.astro`: 接收 `items[]` props，渲染面包屑 + Schema <br/> - `AnswerHero.astro`: 接收 `value, unit, subtitle` props，渲染大字答案 <br/> - `DateContext.astro`: 接收两个日期 props，渲染日期属性（星期几、年份类型） <br/> - `RelatedQueries.astro`: 接收 `links[]` props，渲染内部链接列表 <br/> - `FAQ.astro`: 接收 `items[]` props，渲染 FAQ + Schema |
| **依赖** | Task 1.2, 1.3 |

---

## Sprint 3：Days Between 页面群（Day 5-6）

### Task 3.1：Days Between Hub Page

| 项 | 说明 |
|---|---|
| **目标** | `/days-between/` 页面完整可用 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/days-between/index.astro` |
| **完成标准** | - H1: "Days Between Dates Calculator" <br/> - 交互式计算器（复用 Calculator 组件） <br/> - Intro 文字 1 段 <br/> - 精选日期对链接列表（Top 20） <br/> - FAQ 区块 <br/> - SEO meta 正确 |
| **依赖** | Task 2.1, 2.2 |

---

### Task 3.2：日期对数据准备

| 项 | 说明 |
|---|---|
| **目标** | 100 个精选日期对数据就绪 |
| **输入** | 无（纯数据工作） |
| **输出** | `src/lib/data/date-pairs.ts` |
| **完成标准** | - 包含 ≥ 100 个日期对 <br/> - 覆盖：跨年、季度、学期、节日区间、热门事件区间 <br/> - 每个日期对有：`date1, date2, category, priority` <br/> - 日期格式：`YYYY-MM-DD` <br/> - date1 ≤ date2（无需排序处理） |
| **依赖** | 无 |

**数据示例**：
```typescript
export const datePairs = [
  // 跨年
  { date1: '2026-01-01', date2: '2026-12-31', category: 'year' },
  { date1: '2025-01-01', date2: '2025-12-31', category: 'year' },
  // 季度
  { date1: '2026-01-01', date2: '2026-03-31', category: 'quarter' },
  { date1: '2026-04-01', date2: '2026-06-30', category: 'quarter' },
  // 节日区间
  { date1: '2026-12-01', date2: '2026-12-25', category: 'holiday' },
  { date1: '2026-11-01', date2: '2026-11-30', category: 'holiday' },
  // 学期
  { date1: '2026-09-01', date2: '2026-12-20', category: 'semester' },
  { date1: '2026-06-01', date2: '2026-08-31', category: 'summer' },
  // 常见跨度
  { date1: '2026-01-01', date2: '2026-06-30', category: 'half-year' },
  // ...
];
```

---

### Task 3.3：程序化日期对页面

| 项 | 说明 |
|---|---|
| **目标** | ~100 个日期对页面生成 |
| **输入** | Task 3.2（数据） + Task 2.2（组件） |
| **输出** | `src/pages/days-between/[date1]/[date2].astro` |
| **完成标准** | - `getStaticPaths()` 遍历所有 datePairs <br/> - 每个页面包含：AnswerHero + DateContext + Explanation + RelatedQueries + Breadcrumb <br/> - Title / Meta Description 由 `meta.ts` 自动生成 <br/> - 每个页面的答案（天数）由 `dates.ts` 在构建时计算 <br/> - 页面大小 < 15KB <br/> - 所有内部链接可访问 |
| **依赖** | Task 3.1, 3.2, 2.2 |

---

## Sprint 4：Days From 页面群（Day 7-8）

### Task 4.1：Days From Today Hub + 程序化页面

| 项 | 说明 |
|---|---|
| **目标** | `/days-from-today/` Hub + ~30 个 N 值页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/days-from-today/index.astro` + `[n].astro` |
| **完成标准** | - Hub page: H1 + 交互式计算器（输入 N 天） + N 值快捷列表 <br/> - 程序化页面: AnswerHero 显示结果日期 + DateContext <br/> - N 值覆盖: 7, 10, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 365 <br/> - Title: "{N} Days From Today — {Result Date}" <br/> - 构建时正确计算"today"并生成 |
| **依赖** | Task 2.1, 2.2 |

**注意**：此任务生成的页面答案依赖构建时的日期。构建后答案不会自动更新。升级方案见 Task 6.3（定期重建）。

---

### Task 4.2：Days From Specific Date 程序化页面

| 项 | 说明 |
|---|---|
| **目标** | ~200 个具体日期推算页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/days-from/[n]/[date].astro` + 数据文件 |
| **完成标准** | - 覆盖常用起始日期：每月 1 日和 15 日 + 重点节日日期 <br/> - 覆盖常用 N 值：30, 45, 60, 90, 120, 180 <br/> - 每个页面展示：N 天后的日期 + 该日期是星期几 <br/> - Title: "{N} Days From {Date}" |
| **依赖** | Task 2.2 |

---

## Sprint 5：Days Until & 其余页面（Day 9-10）

### Task 5.1：Events 数据 + Days Until Hub + 程序化页面

| 项 | 说明 |
|---|---|
| **目标** | ~150 个事件倒计时页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/lib/data/events.ts` + `src/pages/days-until/index.astro` + `[event]/[year].astro` |
| **完成标准** | - 覆盖 ≥ 50 个全球节日/事件 <br/> - 覆盖 3 年（2026, 2027, 2028） <br/> - Hub page: 事件分类索引（按月份/类型分组） <br/> - 程序化页面: AnswerHero 显示天数 + DateContext（事件在哪一天） <br/> - 处理浮动节日（Thanksgiving = 11 月第四个周四） |
| **依赖** | Task 2.2 |

**事件数据覆盖**：
```
🎄 节日: Christmas, New Year, Halloween, Thanksgiving, Easter,
         Valentine's Day, St Patrick's, Independence Day (US),
         Canada Day, Boxing Day, Diwali, Hanukkah, Ramadan...
🌤 季节: Spring, Summer, Fall, Winter（按天文/气象两种定义）
🛍 商业: Black Friday, Cyber Monday, Amazon Prime Day（近似日期）
🏈 体育: Super Bowl, World Cup（最近一届）
🎓 学校: Last Day of School（近似）
```

---

### Task 5.2：Days In Month / Year 页面

| 项 | 说明 |
|---|---|
| **目标** | 每月天数 + 每年天数页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/days-in/index.astro` + `[slug].astro` |
| **完成标准** | - `/days-in/january/` ~ `/days-in/december/` 12 页 <br/> - `/days-in/2024/` ~ `/days-in/2030/` 7 页 <br/> - 二月页标注闰年信息 <br/> - 闰年页标注 "2028 is a leap year — February has 29 days" <br/> - Hub page: 12 个月一览表 + 年份列表 |
| **依赖** | Task 2.2 |

---

### Task 5.3：Age in Days + Days Left in Year 页面

| 项 | 说明 |
|---|---|
| **目标** | 年龄计算 + 年底倒计时页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/age-in-days/index.astro` + `year/[year].astro` + `src/pages/days-left-in/[year].astro` |
| **完成标准** | - Age Hub: 交互式年龄计算器（输入出生日期 → 显示天数） <br/> - `/age-in-days/year/2000/` ~ 20 个出生年份页面 <br/> - `/days-left-in/2026/` ~ 3 个年底倒计时页面 |
| **依赖** | Task 2.2 |

---

## Sprint 6：收尾、SEO 审查 & 上线（Day 11-12）

### Task 6.1：静态页面（About / Privacy / 404）

| 项 | 说明 |
|---|---|
| **目标** | 补齐所有固定页面 |
| **输入** | Sprint 2 完成 |
| **输出** | `src/pages/about.astro`, `privacy.astro`, `404.astro` |
| **完成标准** | - About: 站点介绍 + 开发者信息 + 联系方式（可选） <br/> - Privacy: Cookie 声明（本站不设 Cookie）+ 免责声明 <br/> - 404: 返回 404 状态码 + 搜索建议 + 返回首页链接 |
| **依赖** | Task 1.2 |

---

### Task 6.2：Sitemap + Robots.txt + SEO 审查

| 项 | 说明 |
|---|---|
| **目标** | SEO 基础设施完整，通过 Google 友好性检查 |
| **输入** | 所有 Sprint 1-5 页面完成 |
| **输出** | Sitemap 自动生成 + `public/robots.txt` + SEO 检查清单 |
| **完成标准** | - `@astrojs/sitemap` 集成，自动生成 sitemap.xml <br/> - Robots.txt 指向 sitemap <br/> - 每个页面: `<title>` 唯一 + `<meta description>` 存在 + Canonical 指向自己 <br/> - Schema JSON-LD 语法正确（https://validator.schema.org/ 验证） <br/> - Open Graph tags 存在 <br/> - 无 broken internal links <br/> - 所有页面 HTML < 50KB |
| **依赖** | Task 5.1-5.3 完成 |

**SEO 检查清单**：
- [ ] `curl -I` 确认返回 200
- [ ] `curl -I` 确认 404 页面返回 404
- [ ] 所有内链目标存在（用 `find dist/ -name "*.html" | xargs grep "href="` 交叉验证）
- [ ] Canonical 无死链（所有 canonical URL 可访问）
- [ ] Schema 验证通过
- [ ] Mobile Friendly Test 通过（Google 工具）

---

### Task 6.3：最终测试 + Google Search Console 提交 + 上线

| 项 | 说明 |
|---|---|
| **目标** | 站点正式上线，Google 开始收录 |
| **输入** | Task 6.2 完成 |
| **输出** | Vercel 生产环境 + GSC 已提交 |
| **完成标准** | - 本地 `npm run build` 无报错 <br/> - `dist/` 中页面数量正确（~530 页） <br/> - Vercel 生产部署成功 <br/> - 自定义域名绑定 + HTTPS <br/> - Google Search Console 注册 + 提交 sitemap <br/> - Bing Webmaster Tools 顺手提交 |
| **依赖** | Task 6.2 |

**上线后第一周行动**：
1. 每天检查 GSC 收录情况
2. 如果 3 天后仍 0 收录 → 检查 robots.txt / noindex / canonical
3. 手动请求几个关键 URL 的索引（GSC → URL Inspection → Request Indexing）
4. 记录第一个 Impressions / Clicks 的日期

---

## 依赖关系图（简化）

```
Sprint 1 (Task 1.1)
   ├──→ Task 1.2 ──→ Task 1.3
   │         │           │
   │         └─────┬─────┘
   │               ↓
   │         Sprint 2 (Task 2.1, 2.2)
   │               │
   │    ┌──────────┼──────────┐
   │    ↓          ↓          ↓
   │  Sprint 3  Sprint 4  Sprint 5
   │  (3 tasks) (2 tasks) (3 tasks)
   │    │          │          │
   │    └──────────┼──────────┘
   │               ↓
   └─────────→ Sprint 6 (Task 6.1 → 6.2 → 6.3)
                                    ↑
                        Task 3.2 ──┘ (纯数据，无依赖)
```

---

## 关键里程碑

| 里程碑 | 预计达成 |
|---|---|
| 🟢 Astro 项目初始化 + Vercel 部署 | Sprint 1 结束 |
| 🟢 首页 + 核心组件完成 | Sprint 2 结束 |
| 🟢 Days Between 页面群上线 | Sprint 3 结束 |
| 🟢 Days From 页面群上线 | Sprint 4 结束 |
| 🟢 全部 ~530 页面生成完毕 | Sprint 5 结束 |
| 🚀 正式上线 + GSC 提交 | Sprint 6 结束 |

---

## 下一步

👉 进入 **第九阶段：初始化 AI 开发环境**（等待确认）
