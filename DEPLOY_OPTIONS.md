# 振碩汽車電子名片 - 三種最簡單的部署方式

## ✅ 專案已準備就緒

- ✅ 所有程式碼已完成
- ✅ Git repository 已初始化
- ✅ 建置測試成功
- ✅ LOGO 已整合
- ✅ 所有套件已安裝

---

## 🚀 方式一：Vercel（最推薦，3 分鐘完成）

### 步驟 1：前往 Vercel
1. 開啟 https://vercel.com/
2. 點擊 **Sign Up**（或 **Login**）
3. 選擇用 GitHub 登入（建議）

### 步驟 2：匯入專案
1. 點擊 **Add New...** > **Project**
2. 點擊 **Import Git Repository**
3. 如果還沒推送到 GitHub：
   - 點擊 **Deploy from CLI** 或
   - 在本地執行：`vercel`（已安裝）
4. 如果已推送到 GitHub：
   - 選擇 repository 並點擊 **Import**

### 步驟 3：配置環境變數
```
Key: NEXT_PUBLIC_LIFF_ID
Value: 您的LIFF_ID
```

### 步驟 4：部署
- 點擊 **Deploy**
- 等待 1-2 分鐘
- 完成！獲得網址：`https://your-project.vercel.app`

---

## 🔵 方式二：Cloudflare Pages（透過網頁介面）

### 前置作業：推送到 GitHub
```bash
# 在專案資料夾執行
git remote add origin https://github.com/YOUR_USERNAME/zhenshuo-auto-line-card.git
git push -u origin main
```

### 步驟 1：登入 Cloudflare
1. 前往 https://dash.cloudflare.com/
2. 註冊/登入（免費）

### 步驟 2：建立 Pages 專案
1. 點擊 **Workers & Pages**
2. 點擊 **Create application** > **Pages**
3. 點擊 **Connect to Git**
4. 選擇 GitHub 並授權
5. 選擇 `zhenshuo-auto-line-card` repository

### 步驟 3：配置建置
```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next

Environment variables:
NEXT_PUBLIC_LIFF_ID = 您的LIFF_ID
```

### 步驟 4：部署
- 點擊 **Save and Deploy**
- 等待 2-3 分鐘
- 完成！

---

## 🟢 方式三：Netlify（也很簡單）

### 步驟 1：前往 Netlify
1. 開啟 https://app.netlify.com/
2. 用 GitHub 登入

### 步驟 2：部署
1. 點擊 **Add new site** > **Import an existing project**
2. 選擇 **Deploy with GitHub**
3. 選擇 repository
4. 配置：
   ```
   Build command: npm run build
   Publish directory: .next
   
   Environment variables:
   NEXT_PUBLIC_LIFF_ID = 您的LIFF_ID
   ```
5. 點擊 **Deploy site**

---

## 📱 部署完成後的步驟

### 1. 更新 LINE LIFF 設定
1. 前往 https://developers.line.biz/console/
2. 選擇您的 LIFF app
3. 更新 Endpoint URL 為部署後的網址
4. 儲存

### 2. 測試
在 LINE 中開啟：
```
https://liff.line.me/YOUR_LIFF_ID
```

---

## 🎯 我最推薦的流程（最快）

1. **使用 Vercel + GitHub**
   - 前往 https://github.com/new 建立 repo
   - 推送程式碼：
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/zhenshuo-auto-line-card.git
     git push -u origin main
     ```
   - 前往 https://vercel.com/
   - 用 GitHub 登入並匯入專案
   - 設定環境變數 `NEXT_PUBLIC_LIFF_ID`
   - 點擊 Deploy

**總時間：約 5 分鐘！**

---

## ❓ 需要的資訊

請提供以下資訊，我可以給您客製化的指令：

1. **GitHub 使用者名稱**（如果有的話）
2. **LINE LIFF ID**（從 LINE Developers Console 取得）
3. **偏好的部署平台**（Vercel / Cloudflare / Netlify）

---

## 📞 遇到問題？

所有平台都有詳細的圖文教學：
- Vercel: https://vercel.com/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Netlify: https://docs.netlify.com/

或隨時告訴我您遇到的問題！
