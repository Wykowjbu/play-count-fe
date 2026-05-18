# Design Doc: Migration PlayCourt FE (C# to React)

- **Ngày:** 2026-05-18
- **Trạng thái:** Chờ phê duyệt
- **Công nghệ:** React, Vite, Tailwind CSS v4, React Router v6, Lucide React (Icons)

## 1. Mục tiêu
Chuyển đổi toàn bộ giao diện từ dự án C# Razor Pages sang React SPA. Giữ nguyên 100% giao diện, phong cách styling (Tailwind) và logic hiển thị. Sử dụng mock data để thay thế Backend chưa hoàn thiện.

## 2. Danh sách công nghệ (Tech Stack)
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4 (với cấu hình theme tương ứng dự án cũ)
- **Icons:** Lucide React & Google Material Symbols (theo dự án cũ)
- **Routing:** React Router v6
- **State Management:** React Context API (cho Auth & Theme)

## 3. Kiến trúc Layout & Routing

### Layouts
Dự án cũ sử dụng nhiều Layout, chúng ta sẽ tái cấu trúc thành các wrapper components:
1. `PublicLayout`: Header (Navbar), Footer, Content area.
2. `AuthLayout`: Side image/banner + Form container.
3. `BusinessLayout`: Sidebar navigation + Header + Content.
4. `PlayerProfileLayout`: Sidebar (Profile menu) + Content.

### Pages & Routes
- `/`: Trang chủ (Index.cshtml)
- `/login`: Đăng nhập (Login.cshtml)
- `/register`: Đăng ký (Register.cshtml)
- `/venues/:id`: Chi tiết sân (Details.cshtml)
- `/matches`: Danh sách trận đấu (Matches/Index.cshtml)
- `/business/dashboard`: Doanh thu (Business/Revenue.cshtml)
- `/business/courts`: Quản lý sân (Business/Courts.cshtml)
- `/profile/detail`: Thông tin cá nhân (Profile/DetailProfile.cshtml)

## 4. Mock Service Layer
Tạo thư mục `src/services/mock` chứa:
- `authService.js`: Giả lập login/logout.
- `venueService.js`: Danh sách sân bãi, chi tiết sân.
- `matchService.js`: Danh sách trận đấu, join match.
- `data/`: Các file JSON chứa data mẫu dựa trên ViewModels của C#.

## 5. Styling & Theme
Giữ nguyên các biến màu từ `PublicLayout.cshtml` dự án cũ:
- **Primary:** `#22c55e` (Green)
- **Background Light:** `#f8fafc`
- **Background Dark:** `#0f172a`
- **Font:** `Lexend`, sans-serif.

## 6. Kế hoạch thực hiện (Implementation Plan)
Sẽ được thực hiện bởi các subagents theo từng task:
1. Setup Project & Theme (Tailwind v4 config).
2. Xây dựng Mock Data & Service Layer.
3. Xây dựng Common Components (Navbar, Footer, Button, Input).
4. Xây dựng các Layout wrappers.
5. Migration từng nhóm trang (Auth -> Public -> Business -> Profile).
6. Tích hợp Routing và kiểm tra toàn bộ flow.
