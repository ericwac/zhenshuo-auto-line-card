# 振碩汽車電子名片 - 手動部署指南

由於自動部署遇到 OAuth 問題，以下提供兩個替代方案：

---

## 🚀 方案一：透過 Cloudflare Dashboard（最簡單，推薦）

### 步驟 1：建立 GitHub Repository
1. 前往 https://github.com/new
2. Repository name: `zhenshuo-auto-line-card`
3. 選擇 **Public** 或 **Private**
4. 點擊 **Create repository**
5. 複製頁面上顯示的指令

### 步驟 2：推送程式碼到 GitHub
在目前的資料夾中執行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/zhenshuo-auto-line-card.git
git push -u origin main
```

### 步驟 3：連接 Cloudflare Pages
1. 前往 https://dash.cloudflare.com/
2. 登入或註冊帳號（完全免費）
3. 點擊左側 **Workers & Pages**
4. 點擊 **Create application**
5. 選擇 **Pages** 標籤
6. 點擊 **Connect to Git**
7. 選擇 **GitHub**
8. 授權 Cloudflare 存取您的 GitHub
9. 選擇 `zhenshuo-auto-line-card` repository
10. 點擊 **Begin setup**

### 步驟 4：配置建置設定
```
Project name: zhenshuo-auto-line-card
Production branch: main

Build settings:
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: (留空)
```

### 步驟 5：設定環境變數
點擊 **Environment variables (advanced)**：

```
變數名稱: NEXT_PUBLIC_LIFF_ID
值: 您的 LIFF ID
```

### 步驟 6：部署
1. 點擊 **Save and Deploy**
2. 等待 2-3 分鐘
3. 完成後獲得網址：`https://zhenshuo-auto-line-card.pages.dev`

---

## 🔧 方案二：使用 API Token 部署

### 步驟 1：取得 Cloudflare API Token
1. 前往 https://dash.cloudflare.com/profile/api-tokens
2. 點擊 **Create Token**
3. 選擇 **Edit Cloudflare Workers** 範本
4. 或自訂權限：
   - Account > Cloudflare Pages > Edit
   - Account > Account Settings > Read
5. 點擊 **Continue to summary**
6. 點擊 **Create Token**
7. 複製產生的 Token（只會顯示一次！）

### 步驟 2：設定環境變數
在 PowerShell 中執行：

```powershell
$env:CLOUDFLARE_API_TOKEN="your-api-token-here"
```

### 步驟 3：取得 Account ID
1. 前往 https://dash.cloudflare.com/
2. 在右側面板找到 **Account ID**
3. 複製 Account ID

### 步驟 4：部署
```bash
wrangler pages deploy .next --project-name=zhenshuo-auto-line-card --account-id=YOUR_ACCOUNT_ID
```

---

## 📱 部署完成後

### 1. 更新 LINE LIFF 設定
1. 前往 https://developers.line.biz/console/
2. 選擇您的 LIFF app
3. 更新 **Endpoint URL**：
   ```
   https://zhenshuo-auto-line-card.pages.dev
   ```
4. 儲存

### 2. 設定環境變數（重要！）
在 Cloudflare Pages Dashboard：
1. 選擇專案
2. 點擊 **Settings** > **Environment variables**
3. 新增變數：
   ```
   NEXT_PUBLIC_LIFF_ID = 您的LIFF_ID
   ```
4. 點擊 **Save**
5. 點擊 **Redeploy** 重新部署

### 3. 測試
在 LINE 中開啟：
```
https://liff.line.me/YOUR_LIFF_ID
```

---

## 📂 目前專案狀態

✅ Git repository 已初始化
✅ 所有檔案已 commit
✅ 建置測試成功（npm run build ✓）
✅ 分支已設為 main
✅ LOGO 已整合
✅ Flex Message 已優化

**下一步：選擇方案一或方案二完成部署**

---

## 🆘 需要協助？

如果遇到任何問題，請告訴我：
1. 您選擇哪個方案
2. 在哪個步驟遇到問題
3. 錯誤訊息（如果有的話）

我會立即協助您解決！
