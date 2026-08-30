# 振碩汽車電子名片 - 快速部署指南

## ✅ 您的專案資訊

- **GitHub 使用者名稱**: ericwac
- **LIFF ID**: 2011335675-iuw7oMqv
- **LIFF URL**: https://liff.line.me/2011335675-iuw7oMqv
- **Repository**: https://github.com/ericwac/zhenshuo-auto-line-card

---

## 🚀 方式一：執行自動部署腳本（最簡單）

### 步驟 1：在專案資料夾按右鍵
```
在檔案總管中，於專案資料夾點右鍵
選擇「在終端機開啟」或「Open in Terminal」
```

### 步驟 2：執行腳本
```powershell
.\deploy.ps1
```

### 步驟 3：按照指示操作
腳本會自動：
- ✅ 推送程式碼到 GitHub
- ✅ 開啟 Vercel 部署頁面
- ✅ 複製環境變數到剪貼簿

您只需要：
- 在 GitHub 建立 repository（如果還沒有）
- 在 Vercel 點幾下按鈕
- 貼上環境變數

---

## 🎯 方式二：手動執行指令

### 步驟 1：建立 GitHub Repository
```
前往：https://github.com/new
Repository name: zhenshuo-auto-line-card
點擊：Create repository
```

### 步驟 2：推送程式碼
在專案資料夾執行：
```bash
git remote add origin https://github.com/ericwac/zhenshuo-auto-line-card.git
git push -u origin main
```

### 步驟 3：部署到 Vercel
```
1. 前往：https://vercel.com/new
2. 用 GitHub 登入
3. 點擊 Import repository
4. 選擇 zhenshuo-auto-line-card
5. 設定環境變數：
   Key: NEXT_PUBLIC_LIFF_ID
   Value: 2011335675-iuw7oMqv
6. 點擊 Deploy
```

---

## 📱 部署完成後

### 1. 更新 LINE LIFF Endpoint URL
```
1. 前往：https://developers.line.biz/console/
2. 選擇您的 LIFF app
3. 點擊 Edit
4. 更新 Endpoint URL 為：https://你的專案名稱.vercel.app
5. 點擊 Update
```

### 2. 測試
在 LINE 中開啟：
```
https://liff.line.me/2011335675-iuw7oMqv
```

---

## 🔗 重要連結

- **GitHub 建立 Repo**: https://github.com/new
- **Vercel 部署**: https://vercel.com/new
- **LINE LIFF 設定**: https://developers.line.biz/console/
- **您的 Repository**: https://github.com/ericwac/zhenshuo-auto-line-card

---

## ⚡ 快速檢查清單

- [ ] 建立 GitHub repository
- [ ] 推送程式碼到 GitHub
- [ ] 在 Vercel 部署專案
- [ ] 設定環境變數 `NEXT_PUBLIC_LIFF_ID=2011335675-iuw7oMqv`
- [ ] 更新 LINE LIFF Endpoint URL
- [ ] 在 LINE 中測試

---

## 🆘 遇到問題？

### Q: git push 失敗
A: 請先確認 GitHub repository 已建立：https://github.com/ericwac/zhenshuo-auto-line-card

### Q: Vercel 找不到 repository
A: 請在 Vercel 授權頁面中，允許存取 ericwac 的 repositories

### Q: LIFF 無法開啟
A: 確認 Endpoint URL 已更新為 Vercel 提供的網址

---

**準備好了嗎？執行 `.\deploy.ps1` 開始部署！** 🚀
