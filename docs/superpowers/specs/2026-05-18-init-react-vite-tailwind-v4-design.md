# Design Doc: Khởi tạo Project React + Vite + Tailwind CSS v4

- **Ngày:** 2026-05-18
- **Trạng thái:** Chờ phê duyệt
- **Công nghệ:** React, Vite, JavaScript, Tailwind CSS v4, pnpm

## 1. Mục tiêu
Thiết lập một project React hiện đại sử dụng Vite làm build tool và Tailwind CSS v4 làm framework styling chính. Đảm bảo project tuân thủ các chuẩn mới nhất của Tailwind v4 (không cần tailwind.config.js, tích hợp sâu vào Vite).

## 2. Danh sách công nghệ (Tech Stack)
- **Runtime:** Node.js (phiên bản LTS)
- **Package Manager:** pnpm
- **Frontend Framework:** React 18+ (JavaScript)
- **Build Tool:** Vite 6+
- **Styling:** Tailwind CSS v4.x
- **Plugins:** `@tailwindcss/vite`

## 3. Cấu trúc thư mục (Folder Structure)
```text
play-count-fe/
├── src/
│   ├── assets/        # Tài nguyên tĩnh như logo, hình ảnh
│   ├── components/    # Các UI components tái sử dụng
│   ├── App.jsx        # Component root của ứng dụng
│   ├── main.jsx       # Entry point cho React
│   └── index.css      # CSS chính, chứa directive Tailwind v4
├── public/            # File tĩnh không qua xử lý của Vite
├── index.html         # HTML template
├── vite.config.js     # Cấu hình Vite tích hợp Tailwind v4 plugin
├── package.json       # Quản lý dependencies và scripts
└── .gitignore         # Các file/thư mục cần bỏ qua khi commit
```

## 4. Kế hoạch thực hiện (Implementation Plan)

### Bước 1: Khởi tạo Vite
Sử dụng template `react` (JavaScript) của Vite để tạo khung project.
```bash
pnpm create vite . --template react
```

### Bước 2: Cài đặt Tailwind CSS v4
Cài đặt các gói cần thiết cho v4.
```bash
pnpm add tailwindcss @tailwindcss/vite
```

### Bước 3: Cấu hình Vite
Chỉnh sửa `vite.config.js` để sử dụng plugin `@tailwindcss/vite`.
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Bước 4: Thiết lập CSS
Thay thế nội dung `src/index.css` bằng directive Tailwind v4.
```css
@import "tailwindcss";
```

### Bước 5: Kiểm tra và Chạy thử
- Chạy `pnpm install` (nếu cần).
- Chạy `pnpm dev`.
- Kiểm tra tính năng "Zero-config" của Tailwind v4 bằng cách thêm class vào một element trong `App.jsx`.

## 5. Tiêu chí thành công (Success Criteria)
- Project khởi chạy thành công trên cổng 5173 (mặc định của Vite).
- Tailwind CSS v4 hoạt động chính xác (style được áp dụng ngay lập tức mà không cần file cấu hình JS).
- Không có lỗi linting hoặc build liên quan đến CSS.
