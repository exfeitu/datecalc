# SEO Audit Skill

## Description

Build 后自动检查所有程序化页面的 SEO 完整性：title、meta description、canonical、schema、broken internal links。

## When to Use

- 每次 `npm run build` 完成后
- 新增页面模板后
- 修改 meta/schema 生成逻辑后
- 上线前的最终检查

## Audit Checklist

### 1. Title 检查
- [ ] 每个程序化页面 `<title>` 唯一（不与同模板其他页面重复）
- [ ] Title 包含核心数字（天数、日期）——不是空洞模板
- [ ] Title 长度 40-60 字符（Google 显示上限 ~60 字符）
- [ ] 首页和 Hub 页 Title 包含主关键词

```bash
# 检查所有页面 title
find dist/ -name "*.html" -exec grep -l '<title>' {} \;
```

### 2. Meta Description 检查
- [ ] 每个程序化页面有 `<meta name="description">`
- [ ] Description 包含具体数字（非空泛描述）
- [ ] Description 长度 120-155 字符
- [ ] 同一模板的页面 description 互不相同

```bash
# 抽查 5 个同类页面 description 是否互不相同
find dist/days-between -name "*.html" | head -5 | xargs grep '<meta name="description"'
```

### 3. Canonical 检查
- [ ] 每个页面有 `<link rel="canonical">`
- [ ] Canonical URL 指向自己（不是其他页面）
- [ ] Canonical URL 使用完整绝对路径（`https://` 开头）
- [ ] 首页 canonical 指向根域名（不包含 `/index.html`）

### 4. Schema JSON-LD 检查
- [ ] 首页有 WebApplication schema
- [ ] Hub 页有 WebApplication + FAQPage schema
- [ ] 程序化页面有 WebPage schema
- [ ] 所有页面有 BreadcrumbList schema
- [ ] JSON-LD 语法合法（无多余逗号、引号闭合）

### 5. Internal Links 检查
- [ ] 面包屑在所有页面存在（`<nav aria-label="Breadcrumb">`）
- [ ] 程序化页面至少有 5 个内部链接（Related Queries 区块）
- [ ] 无 broken internal links

```bash
# 提取所有内部链接 href 值
find dist/ -name "*.html" | xargs grep -oP 'href="\K[^"]+' | grep -v '^https\?://' | sort | uniq > /tmp/internal-links.txt
```

### 6. HTML 大小检查
- [ ] 程序化页面 HTML < 15KB
- [ ] Hub 页面 HTML < 50KB
- [ ] 首页 HTML < 30KB

```bash
# 检查文件大小
find dist/ -name "*.html" -exec ls -lh {} \; | awk '{print $5, $9}' | sort -rh | head -10
```

### 7. 其他
- [ ] `<html lang="en">` 存在
- [ ] `<meta charset="UTF-8">` 存在
- [ ] `<meta name="viewport">` 存在
- [ ] `robots.txt` 指向 sitemap
- [ ] `sitemap.xml` 包含所有页面
- [ ] 404 页面存在且返回 404 状态码

## Output Format

检查结果按严重程度分三级：
- 🔴 **必须修复**：missing title/canonical、broken links、schema 语法错误
- 🟡 **建议修复**：title 过长/过短、description 重复、内链不足
- 🟢 **通过**：符合规范

每个问题附带具体文件和行号。
