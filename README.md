# 五子棋小游戏（Gomoku Demo）

一个非常简单的纯前端网站，用于测试通过 GitHub 修改网站的能力。无需构建，直接用浏览器打开 `index.html` 即可运行。

## 功能

- 首页标题
- 注册按钮（点击弹出注册表单，纯前端演示，用户名保存在 localStorage）
- 可玩的双人五子棋（15 x 15 棋盘，先连五子获胜）

## 文件结构

| 文件 | 说明 |
| --- | --- |
| `index.html` | 页面结构，首页标题位于 `<h1 id="site-title">` |
| `style.css` | 页面样式，注册按钮颜色位于 `.btn-register` 的 `background-color` |
| `script.js` | 五子棋逻辑与注册弹窗逻辑 |

## 本地运行

直接双击 `index.html`，或执行：

```bash
python3 -m http.server 8000
```

然后访问 http://localhost:8000
