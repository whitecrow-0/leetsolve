# LeetSolve

> AI-powered LeetCode tutor for absolute beginners.

![LeetSolve](logo.png)

LeetSolve explains any LeetCode problem step by step — in plain English, with real examples, full dry runs, and working Python code. No jargon. No hand-waving. Just clear explanations that actually make sense.

---

## Features

- **AI Tutor** — Ask any LeetCode problem by name or number. Get the full breakdown: problem statement, key insight, step-by-step plan, solution, dry run, complexity analysis, and pattern summary
- **Python Editor** — In-browser Python execution powered by Pyodide (WebAssembly). No installs, no server
- **3000+ Problems** — Full LeetCode problem list fetched live, searchable with instant filtering by difficulty
- **Hint Mode** — 5 progressive hint levels from a small nudge to the full solution, so you can challenge yourself first
- **Code Snippets** — Pre-built templates for common patterns: linked lists, binary trees, binary search, sliding window, DFS, DP, and more
- **Package Installer** — Install pure-Python packages via micropip directly in the browser
- **Multi-tab** — Work on multiple problems simultaneously, each with its own chat history and editor state
- **Export** — Download chat as Markdown or plain text, download code as `.py`
- **Themes** — Dark, light, and high-contrast

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML, CSS, JS — no framework |
| Python Runtime | Pyodide (WebAssembly) |
| AI | OpenRouter API (proxied via Cloudflare Worker) |
| Hosting | GitHub Pages |
| Proxy | Cloudflare Workers |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Enter` | Run code |
| `Ctrl+K` | Search problems |
| `Ctrl+T` | New tab |
| `Ctrl+W` | Close tab |
| `Ctrl+S` | Download `.py` |
| `/` | Focus chat input |
| `?` | Show shortcuts |

---

## License

MIT License

Copyright (c) 2026 White Crow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
