# 振碩汽車電子名片 - 一鍵部署腳本
# GitHub 使用者: ericwac
# LIFF ID: 2011335675-iuw7oMqv

# 步驟 1: 推送到 GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  振碩汽車電子名片 - 自動部署腳本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] 檢查 Git 狀態..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "[2/4] 設定 GitHub remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/ericwac/zhenshuo-auto-line-card.git

Write-Host ""
Write-Host "[3/4] 推送到 GitHub..." -ForegroundColor Yellow
Write-Host "即將推送到: https://github.com/ericwac/zhenshuo-auto-line-card" -ForegroundColor Green
Write-Host ""

$confirm = Read-Host "確認推送? (Y/N)"
if ($confirm -eq "Y" -or $confirm -eq "y") {
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ 成功推送到 GitHub!" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "[4/4] 開啟 Vercel 部署頁面..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  接下來請完成以下步驟:" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. 瀏覽器會自動開啟 Vercel 頁面" -ForegroundColor White
        Write-Host "2. 用 GitHub 帳號登入 Vercel" -ForegroundColor White
        Write-Host "3. 點擊 'Add New...' > 'Project'" -ForegroundColor White
        Write-Host "4. 選擇 'zhenshuo-auto-line-card' repository" -ForegroundColor White
        Write-Host "5. 點擊 'Import'" -ForegroundColor White
        Write-Host "6. 設定環境變數:" -ForegroundColor White
        Write-Host "   Key: NEXT_PUBLIC_LIFF_ID" -ForegroundColor Yellow
        Write-Host "   Value: 2011335675-iuw7oMqv" -ForegroundColor Yellow
        Write-Host "7. 點擊 'Deploy'" -ForegroundColor White
        Write-Host ""
        Write-Host "環境變數已複製到剪貼簿! 可直接貼上" -ForegroundColor Green
        
        # 複製環境變數到剪貼簿
        "2011335675-iuw7oMqv" | Set-Clipboard
        
        # 開啟 Vercel
        Start-Process "https://vercel.com/new"
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "部署完成後，記得更新 LINE LIFF 設定!" -ForegroundColor Cyan
        Write-Host "Endpoint URL: https://你的專案.vercel.app" -ForegroundColor Yellow
        Write-Host "LINE Console: https://developers.line.biz/console/" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Cyan
        
    } else {
        Write-Host ""
        Write-Host "✗ 推送失敗，請檢查:" -ForegroundColor Red
        Write-Host "1. GitHub repository 是否已建立: https://github.com/ericwac/zhenshuo-auto-line-card" -ForegroundColor Yellow
        Write-Host "2. 您是否有權限推送到此 repository" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "請先到 GitHub 建立 repository: https://github.com/new" -ForegroundColor Yellow
        Start-Process "https://github.com/new"
    }
} else {
    Write-Host ""
    Write-Host "已取消部署" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "按任意鍵結束..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
