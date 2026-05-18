# Init React + Vite + Tailwind CSS v4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Khởi tạo project React sử dụng Vite và cấu hình Tailwind CSS v4 (phiên bản mới nhất).

**Architecture:** Sử dụng Vite làm build tool với plugin `@tailwindcss/vite` để tích hợp Tailwind CSS v4 theo cơ chế Zero-config (không cần file config JS).

**Tech Stack:** React, Vite, JavaScript, Tailwind CSS v4, pnpm.

---

### Task 1: Khởi tạo Project Vite

**Files:**
- Create: Toàn bộ khung project Vite (index.html, src/, public/, package.json, vite.config.js, v.v.)

- [x] **Step 1: Khởi tạo project bằng pnpm create vite**

Run: `pnpm create vite . --template react`
Expected: Thư mục được lấp đầy bởi các file template của Vite cho React + JS.

- [x] **Step 2: Cài đặt dependencies ban đầu**

Run: `pnpm install`
Expected: Thư mục `node_modules` được tạo.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: init vite react project"
```

### Task 2: Cài đặt Tailwind CSS v4

**Files:**
- Modify: `package.json` (thông qua pnpm add)

- [ ] **Step 1: Cài đặt tailwindcss và plugin cho vite**

Run: `pnpm add tailwindcss @tailwindcss/vite`
Expected: Hai gói này xuất hiện trong `package.json` -> `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install tailwindcss v4 and vite plugin"
```

### Task 3: Cấu hình Vite cho Tailwind v4

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Tích hợp plugin tailwindcss**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.js
git commit -m "config: add tailwindcss plugin to vite.config.js"
```

### Task 4: Thiết lập CSS cho Tailwind v4

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Import Tailwind CSS**

```css
@import "tailwindcss";
```

- [ ] **Step 2: Xóa các style mặc định không cần thiết trong src/App.css**

```css
/* Để trống hoặc xóa nội dung file App.css */
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css src/App.css
git commit -m "style: setup tailwind v4 entry point"
```

### Task 5: Kiểm tra hoạt động của Tailwind CSS v4

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Thêm Tailwind class vào App.jsx để kiểm tra**

```jsx
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-sky-400">
          React + Vite + Tailwind v4
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Project đã được khởi tạo thành công!
        </p>
      </div>
    </div>
  )
}

export default App
```

- [ ] **Step 2: Chạy thử project**

Run: `pnpm dev`
Expected: Browser hiển thị giao diện với nền màu tối, chữ xanh sky và căn giữa màn hình.

- [ ] **Step 3: Dọn dẹp các file boilerplate không dùng đến**

Run: `rm src/assets/react.svg public/vite.svg` (hoặc xóa thủ công)
Expected: Các file ảnh mặc định bị xóa.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "test: verify tailwind v4 and cleanup boilerplate"
```
