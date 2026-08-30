# Cloudflare Pages 部署指南

## 🚀 部署步驟

### 步驟 1：準備 Git Repository

#### 1.1 初始化 Git（如果尚未初始化）
```bash
cd "C:\Users\s0986\OneDrive\Desktop\振碩汽車"
git init
git add .
git commit -m "Initial commit: 振碩汽車 LINE 電子名片系統"
```

#### 1.2 推送到 GitHub（推薦）
1. 前往 https://github.com/new
2. 建立新的 repository，名稱例如：`zhenshuo-auto-line-card`
3. 執行以下指令：

```bash
git remote add origin https://github.com/YOUR_USERNAME/zhenshuo-auto-line-card.git
git branch -M main
git push -u origin main
```

### 步驟 2：連接 Cloudflare Pages

#### 2.1 登入 Cloudflare
1. 前往 https://dash.cloudflare.com/
2. 登入您的帳號（沒有帳號請先註冊，完全免費）

#### 2.2 建立 Pages 專案
1. 點擊左側選單的 **Workers & Pages**
2. 點擊 **Create application**
3. 選擇 **Pages** 標籤
4. 點擊 **Connect to Git**

#### 2.3 授權 GitHub
1. 選擇 **GitHub**
2. 授權 Cloudflare 存取您的 repositories
3. 選擇剛才建立的 `zhenshuo-auto-line-card` repository

#### 2.4 配置建置設定
填入以下資訊：

```
Project name: zhenshuo-auto-line-card
Production branch: main

Build settings:
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: (留空)
```

#### 2.5 設定環境變數
點擊 **Environment variables (advanced)**，新增：

```
變數名稱: NEXT_PUBLIC_LIFF_ID
值: 您的 LIFF ID（例如：1234567890-abcdefgh）
```

#### 2.6 部署
1. 點擊 **Save and Deploy**
2. 等待建置完成（約 2-3 分鐘）
3. 完成後會獲得一個網址，例如：
   ```
   https://zhenshuo-auto-line-card.pages.dev
   ```

### 步驟 3：更新 LINE LIFF 設定

1. 前往 [LINE Developers Console](https://developers.line.biz/console/)
2. 選擇您的 LIFF app
3. 更新 **Endpoint URL** 為 Cloudflare Pages 提供的網址：
   ```
   https://zhenshuo-auto-line-card.pages.dev
   ```
4. 儲存變更

### 步驟 4：上傳 LOGO 到可公開存取的位置

由於 Cloudflare Pages 的靜態資源，我們需要確保 LOGO 可以在 LINE 訊息中正常顯示：

#### 選項 A：使用 Cloudflare Pages 本身
LOGO 已經在 `public/logo.jpg`，部署後可透過以下網址存取：
```
https://zhenshuo-auto-line-card.pages.dev/logo.jpg
```

直接在 Flex Message 中使用這個完整網址即可。

#### 選項 B：使用圖床（備用方案）
如果遇到 CORS 問題，可以上傳到：
- **Imgur**: https://imgur.com/
- **Cloudinary**: https://cloudinary.com/
- **ImgBB**: https://imgbb.com/

然後更新 `utils/flexMessageTemplates.ts` 中的 `logoUrl`。

### 步驟 5：測試

1. 在手機上開啟 LINE
2. 開啟網址：`https://liff.line.me/YOUR_LIFF_ID`
3. 測試名片分享功能
4. 檢查 LOGO 是否正常顯示

---

## 🔧 進階設定（選用）

### 自訂網域
如果您有自己的網域：

1. 在 Cloudflare Pages 專案設定中
2. 點擊 **Custom domains**
3. 點擊 **Set up a custom domain**
4. 輸入您的網域（例如：card.zhenshuo-auto.com）
5. 按照指示設定 DNS 記錄

### 自動部署
每次您推送程式碼到 GitHub：
```bash
git add .
git commit -m "更新功能"
git push
```

Cloudflare Pages 會自動重新建置和部署！

---

## ⚡ Cloudflare Pages 優勢

- ✅ **完全免費**：無限流量、無限請求
- ✅ **全球 CDN**：自動部署到全球 275+ 城市
- ✅ **自動 HTTPS**：免費 SSL 憑證
- ✅ **即時預覽**：每個 Git 分支都有預覽網址
- ✅ **快速建置**：平均 1-3 分鐘完成部署
- ✅ **零配置**：自動偵測 Next.js 專案

---

## 🐛 常見問題排解

### Q: 建置失敗
**A:** 確認 `package.json` 中的 scripts 正確：
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### Q: LOGO 在 LINE 訊息中無法顯示
**A:** 確保使用完整的 HTTPS 網址：
```typescript
logoUrl: 'https://zhenshuo-auto-line-card.pages.dev/logo.jpg'
```

### Q: 環境變數未生效
**A:** 
1. 檢查變數名稱必須是 `NEXT_PUBLIC_LIFF_ID`
2. 重新部署專案（變更環境變數後需要重新部署）

---

## 📞 需要協助？
如有任何問題，請告訴我您遇到的錯誤訊息或步驟！
