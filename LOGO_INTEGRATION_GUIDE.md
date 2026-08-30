# LOGO 整合指南

## 📝 您的 LOGO 設計需求

```
A high-end 3D metallic logo design for a luxury car rental and tech company. 
A thick, brushed platinum silver hexagonal shield outer frame with sharp, industrial geometric angles. 
Inside the shield, a glowing deep navy blue dynamic fluid swoosh line slicing through diagonally. 
Dark obsidian black background. 
Cinematic lighting, photorealistic, sharp angles, industrial and cybersecurity vibe, 
8k resolution, unreal engine 5 render, octane render, --no letters, no text --v 6.0
```

## 🎨 建議的 LOGO 生成工具

### 1. Midjourney（推薦）
- 訂閱地址：https://www.midjourney.com/
- 在 Discord 中輸入您的 prompt
- 選擇最佳結果並下載高解析度版本

### 2. DALL-E 3
- 透過 ChatGPT Plus 使用
- 網址：https://chat.openai.com/

### 3. Leonardo.ai
- 免費額度可用
- 網址：https://leonardo.ai/

### 4. Stable Diffusion
- 開源免費方案
- 網址：https://stability.ai/

## 📥 LOGO 準備步驟

### 步驟 1：生成 LOGO
1. 使用上述任一工具生成 LOGO
2. 選擇最佳的設計版本
3. 下載高解析度圖片（建議至少 1000x1000 px）

### 步驟 2：準備不同版本
建議準備以下版本：

```
public/
├── logo.png           # 完整 LOGO（正方形，透明背景）
├── logo-horizontal.png # 橫向 LOGO（用於名片 header）
├── logo-icon.png      # 只有圖標（用於小尺寸顯示）
└── favicon.ico        # 網站圖示（32x32 px）
```

### 步驟 3：整合到專案

#### 3.1 更新 Flex Message LOGO

編輯 `utils/flexMessageTemplates.ts`：

```typescript
export const DEFAULT_BUSINESS_CARD: BusinessCardData = {
  // ... 其他設定
  logoUrl: '/logo-horizontal.png', // 或使用線上 URL
  brandColor: '#1E3A8A', // 配合 LOGO 的深藍色
};
```

#### 3.2 更新網頁 LOGO

如果您想在 header 中顯示 LOGO，編輯 `app/page.tsx`：

```tsx
<header className="header">
  <img src="/logo.png" alt="振碩汽車" className="header-logo" />
  <h1 className="title">振碩汽車租賃</h1>
  <p className="subtitle">電子名片分享系統</p>
</header>
```

#### 3.3 更新 Favicon

編輯 `app/layout.tsx` 加入：

```tsx
export const metadata: Metadata = {
  title: '振碩汽車 - 電子名片',
  description: '特殊裝備與婚宴接駁專員...',
  icons: {
    icon: '/favicon.ico',
  },
};
```

## 🎨 品牌色彩建議

根據您的 LOGO 設計：

```css
/* 主要品牌色 */
--primary-navy: #1E3A8A;        /* 深藍色 */
--platinum-silver: #C0C0C0;     /* 鉑金銀 */
--obsidian-black: #0F172A;      /* 黑曜石黑 */
--glow-blue: #3B82F6;           /* 發光藍 */

/* 漸層效果 */
background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
```

## 📱 LOGO 尺寸建議

### LINE Flex Message
- **Header Logo**: 300x100 px (3:1 比例)
- **格式**: PNG（透明背景）或 JPG（白色/深色背景）

### 網頁使用
- **Header Logo**: 200x200 px（正方形）
- **Favicon**: 32x32 px、16x16 px
- **格式**: PNG（透明背景）

## 🚀 上傳 LOGO 的方式

### 方案 A：放在專案中（推薦用於開發）
```
將 LOGO 放在 public/ 資料夾
使用 /logo.png 路徑引用
```

### 方案 B：上傳到圖床（推薦用於正式環境）

推薦的免費圖床：
1. **Imgur**: https://imgur.com/
2. **Cloudinary**: https://cloudinary.com/
3. **ImgBB**: https://imgbb.com/

上傳後複製圖片 URL，更新到 `DEFAULT_BUSINESS_CARD.logoUrl`

## 💻 完整整合範例

```typescript
// utils/flexMessageTemplates.ts
export const DEFAULT_BUSINESS_CARD: BusinessCardData = {
  companyName: '振碩汽車租賃',
  companyTaxId: '60531668',
  name: '蘇建誠',
  title: '特殊裝備與婚宴接駁專員',
  services: '機場接送、商務接送、包車旅遊、婚禮與活動包車、服務接駁、長租、短租、企業交通',
  phone: '0912-345-678',
  email: 'service@zhenshuo-auto.com',
  address: '臺中市霧峰區坑口里中正路575之10號',
  lineOfficialId: '@zhenshuoauto',
  brandColor: '#1E3A8A', // 深藍色配合 LOGO
  logoUrl: 'https://your-image-host.com/zhenshuo-logo.png', // 您的 LOGO URL
};
```

## 📞 需要協助？

當您生成好 LOGO 後，請告訴我：
1. ✅ LOGO 檔案已準備好（上傳到圖床或放在專案中）
2. ✅ LOGO 的 URL 或檔案路徑
3. ✅ 是否需要調整品牌色或版面設計

我會立即幫您完成整合！
