# Schema Validate Skill

## Description

从构建输出中抽取 JSON-LD 结构化数据，验证 Schema.org 语法正确性，确保 Google 能正确解析。

## When to Use

- 新增或修改 schema 模板（`src/lib/schema.ts`）后
- 新增页面模板后
- 上线前最终验证

## Validation Steps

### 1. 抽取 JSON-LD

```bash
# 从首页抽取 JSON-LD
grep -oP '<script type="application/ld\+json">\K.*?(?=</script>)' dist/index.html | head -1

# 从程序化页面抽样（取 3 个不同模板的页面）
# Days Between
grep -oP '<script type="application/ld\+json">\K.*?(?=</script>)' dist/days-between/2026-01-01/2026-12-31/index.html

# Days From Today
grep -oP '<script type="application/ld\+json">\K.*?(?=</script>)' dist/days-from-today/90/index.html

# Days Until
grep -oP '<script type="application/ld\+json">\K.*?(?=</script>)' dist/days-until/christmas/2026/index.html
```

### 2. 提交验证

将抽取的 JSON-LD 粘贴到 https://validator.schema.org/ 验证。

或者用 API：
```bash
# Schema.org 验证 API
curl -X POST https://validator.schema.org/validate \
  -H "Content-Type: application/json" \
  -d '{"json": <JSON-LD here>}'
```

### 3. 检查要点

| 检查项 | 说明 |
|---|---|
| `@context` | 必须是 `https://schema.org` |
| `@type` | 类型正确：首页=WebApplication，Hub=WebApplication+FAQPage，程序化=WebPage |
| 必须字段 | WebPage 需要 `name`、`url`；FAQPage 需要 `mainEntity` 数组 |
| FAQ 格式 | 每个 FAQ 有 `Question` + `Answer`，`@type` 正确 |
| BreadcrumbList | `position` 从 1 开始递增，`item` 是完整 URL |
| 无 dead link | `url` 和 `item` 字段中的 URL 可访问（200） |

### 4. Google Rich Result Test（可选）

用 Google 的 Rich Results Test 检查 FAQ schema 能否触发富结果：
https://search.google.com/test/rich-results

> ⚠️ 注意：Google 对程序化 FAQ schema 有打压力度。如果 Search Console 报告 "FAQ rich result" 违规，立即移除程序化页面的 FAQ schema。

## Programmatic Schema Rules

### 每个页面类型的 Schema 要求

```
首页:            WebApplication + Organization + BreadcrumbList
Hub Pages:       WebApplication + FAQPage + BreadcrumbList
程序化结果页:     WebPage + FAQPage（谨慎使用） + BreadcrumbList
About:           AboutPage + Organization
Privacy:         WebPage
404:             无 Schema
```

### FAQ Schema 慎用规则

- Hub 页面：✅ 可以加 FAQ（Google 鼓励在权威页面上使用）
- 程序化页面：⚠️ 仅在内容确实回答问题时使用
  - ✅ 问"How many days between X and Y?" → 页面确实回答了
  - ❌ 问"How to calculate days between dates?" → 匹配度低，可能被标记为滥用
- 如果 GSC 报告 FAQ 滥用 → 立即移除所有程序化页面的 FAQPage schema，只保留 WebPage + BreadcrumbList

## Output Format

- ✅ **通过**：所有 schema 语法正确，类型正确，必须字段完整
- ⚠️ **警告**：schema 可解析但缺少推荐字段
- ❌ **失败**：JSON 解析失败或缺少必须字段

每个问题附带：错误类型、所在页面、修复建议。
