# 振碩汽車 LINE 電子名片系統 - 快速部署指令

## 📦 安裝相依套件
```bash
npm install
```

## 🔧 設定環境變數
```bash
# 複製環境變數範本
copy .env.local.example .env.local

# 編輯 .env.local，填入您的 LIFF ID
notepad .env.local
```

## 🧪 本地測試
```bash
npm run dev
```
開啟 http://localhost:3000

## 🚀 部署到 Cloudflare Pages

### 方法 1：透過 Git（推薦）
```bash
# 1. 初始化 Git
git init
git add .
git commit -m "Initial commit: 振碩汽車電子名片系統"

# 2. 推送到 GitHub
# 先在 GitHub 建立新的 repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main

# 3. 在 Cloudflare Pages 連接 GitHub repository
# 前往：https://dash.cloudflare.com/
# Workers & Pages > Create application > Pages > Connect to Git
```

### 方法 2：透過 Wrangler CLI
```bash
# 1. 安裝 Wrangler
npm install -g wrangler

# 2. 登入 Cloudflare
wrangler login

# 3. 部署
npm run build
npx wrangler pages deploy .next --project-name=zhenshuo-auto-card
```

## 🔗 Cloudflare Pages 建置設定

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: (留空)

環境變數:
NEXT_PUBLIC_LIFF_ID = 您的LIFF_ID
```

## ✅ 部署後檢查清單

- [ ] 部署成功，獲得 Cloudflare Pages 網址
- [ ] 在 LINE Developers Console 更新 LIFF Endpoint URL
- [ ] 測試 LIFF 初始化
- [ ] 測試名片分享功能
- [ ] 確認 LOGO 正常顯示
- [ ] 測試所有按鈕功能（撥打電話、加入官方帳號）

## 🔄 後續更新流程

```bash
# 1. 修改程式碼
# 2. 提交變更
git add .
git commit -m "描述您的變更"
git push

# Cloudflare Pages 會自動重新部署！
```

## 📱 測試網址

部署完成後，在 LINE 中開啟：
```
https://liff.line.me/YOUR_LIFF_ID
```

## 🆘 遇到問題？

參考詳細文件：`CLOUDFLARE_PAGES_DEPLOY.md`
