# DateCalc — Instant Date Answers

> 一个极简、快速的日期计算工具站。
> 每个页面精准回答一个日期问题。零广告、零追踪、秒开。

---

## 这是什么

DateCalc 是一个程序化 SEO 工具站。不同于传统日期网站（一个通用页面服务所有查询），我们为每个长尾日期查询生成专门的页面。

**例子**：
- 你搜 "how many days until Christmas 2026" → 你会得到一个页面，首屏大字写着 "150 days"
- 你搜 "90 days from December 15 2026" → 你会得到一个页面，直接告诉你那是什么日期

所有页面在构建时预生成，运行时不依赖任何服务器或数据库。

---

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | [Astro](https://astro.build) 5.x (SSG) |
| 语言 | TypeScript |
| 样式 | Plain CSS |
| 部署 | [Vercel](https://vercel.com) |
| 域名 | 自定义域名或 `*.vercel.app` |

---

## 快速开始

```bash
# 1. 克隆仓库
git clone <repo-url>
cd datecalc

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# → http://localhost:4321

# 4. 构建生产版本
npm run build
# → 输出到 dist/

# 5. 预览生产构建
npm run preview
```

---

## 项目结构

```
src/
├── pages/              # 路由页面（文件路径 = URL）
│   ├── index.astro     # 首页
│   ├── days-between/   # 日期间隔页面群
│   ├── days-from-today/# N天后推算页面群
│   ├── days-from/      # 具体日期推算页面群
│   ├── days-until/     # 事件倒计时页面群
│   ├── days-in/        # 月份/年份天数页面群
│   ├── days-left-in/   # 年底倒计时页面群
│   └── age-in-days/    # 年龄天数页面群
├── components/         # 可复用 Astro 组件
├── lib/                # 工具函数 + 数据
│   ├── dates.ts        # 核心日期计算
│   ├── meta.ts         # Meta 标签生成
│   ├── schema.ts       # Schema.org 生成
│   └── data/           # 静态数据文件
└── styles/
    └── global.css      # 全局样式
```

---

## 部署

推送到 GitHub → Vercel 自动部署。

```bash
git add .
git commit -m "feat: <描述>"
git push
# Vercel 自动构建 + 发布
```

首次部署需在 [vercel.com](https://vercel.com) 导入 GitHub 仓库。Vercel 会自动识别 Astro 项目，无需手动配置。

---

## Roadmap

### ✅ Phase 1：MVP
- [ ] Sprint 1: 项目初始化 + 基础设施
- [ ] Sprint 2: 首页 + 核心组件
- [ ] Sprint 3: Days Between 页面群 (~100 页)
- [ ] Sprint 4: Days From 页面群 (~230 页)
- [ ] Sprint 5: Days Until + 其余页面 (~200 页)
- [ ] Sprint 6: SEO 审查 + 上线

### 🔮 Phase 2：扩展（MVP 验证后）
- 日期对页面扩展到万级
- 工作日计算（排除周末 + 常见假期）
- 周数差 / 月数差计算
- 更多全球节日覆盖

### 💡 Phase 3：规模化
- 扩展到其他计算品类（时间、单位等）
- 多语言支持
- 极轻量变现（单条非侵入广告）

---

## 文档

| 文档 | 内容 |
|---|---|
| [IDEA.md](docs/IDEA.md) | 产品想法、用户画像、需求分析 |
| [KEYWORDS.md](docs/KEYWORDS.md) | 关键词研究、搜索意图分析 |
| [RESEARCH.md](docs/RESEARCH.md) | 竞品分析、机会总结 |
| [POSITIONING.md](docs/POSITIONING.md) | 产品定位、差异化策略 |
| [SEO.md](docs/SEO.md) | SEO 架构、URL 设计、Schema |
| [PRD.md](PRD.md) | 产品需求、功能列表、验收标准 |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 技术方案、目录结构、部署 |
| [TASK.md](TASK.md) | 任务拆分、Sprint 计划 |
| [CLAUDE.md](CLAUDE.md) | AI 协作规范 |

---

## 许可

MIT
