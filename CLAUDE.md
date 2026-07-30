# CLAUDE.md — DateCalc 开发规范

> Programmatic SEO 日期计算工具站 · Astro SSG + TypeScript + Vercel · 零成本

## 技术栈
Astro 5.x SSG | TypeScript strict | Plain CSS（无框架） | Vanilla JS < 3KB（仅计算器组件） | Vercel 部署

## 代码规范
- TypeScript strict mode，所有函数有类型标注，日期格式 `YYYY-MM-DD`
- 组件 PascalCase（`AnswerHero.astro`），路由 kebab-case（`days-between`）
- Props 用 `export interface Props {}`，程序化页面用 `getStaticPaths()`
- 纯展示页面零 JS 输出，页面大小 < 15KB
- CSS 全在 `global.css`，变量在 `:root`，max-width: 720px，断点 640px/1024px
- 每个页面一个 `<h1>`，面包屑 `<nav aria-label="Breadcrumb">`，内链用 `<a>`

## 目录结构
```
src/
├── pages/          # 路由页面（文件路径 = URL）
├── components/     # Astro 组件（BaseLayout, AnswerHero, Breadcrumb 等）
├── lib/            # dates.ts, meta.ts, schema.ts, formatters.ts
│   └── data/       # date-pairs.ts, events.ts, n-values.ts 等静态数据
└── styles/         # global.css
```

## 开发流程
讨论 → 确认方案 → 写代码 → `astro dev` 验证 → 提交 → Push → Vercel 自动部署

## Git Commit
格式 `<type>: <描述>`，type: `feat|fix|style|refactor|data|seo|docs|chore|init`

## 禁止事项
❌ CSS 框架（Tailwind 等）| ❌ React/Vue/Svelte | ❌ Google Fonts / 外部 CDN
❌ Analytics / 广告 / 追踪脚本（MVP） | ❌ AI 生成正文 | ❌ 硬编码日期数据在组件中

## 测试
- `src/lib/dates.ts` 必须有单元测试（正常 + 边界：闰年/跨年/同一天）
- 每次 build 后抽查 3-5 个程序化页面，Schema 提交 validator.schema.org

## 性能目标
HTML < 15KB | CSS < 10KB | JS < 5KB | LCP < 1.5s | CLS = 0 | 程序化页面 0KB JS

## 部署
Git Push → Vercel 自动部署到 `*.vercel.app`（零配置，零成本）
Days From Today 页面用 Deploy Hook + GitHub Actions 每周一触发重建
监控用 GSC + Vercel Analytics（免费）

## SEO Skills
`/seo-audit` — Build 后全站 SEO 检查 | `/schema-validate` — JSON-LD 验证
`/thin-content-check` — 7 元素反薄内容检查

## 文档索引
`docs/IDEA.md` → `KEYWORDS.md` → `RESEARCH.md` → `POSITIONING.md` → `SEO.md` → `ARCHITECTURE.md`
`PRD.md` → `TASK.md` → `CLAUDE.md` → `README.md`
