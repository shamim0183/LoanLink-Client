# Add React import to all JSX files
# Run this from the client folder: powershell -ExecutionPolicy Bypass -File add-react-imports.ps1

$files = @(
    "src/components/shared/LoadingSpinner.jsx",
    "src/components/shared/LoanCard.jsx",
    "src/components/shared/Navbar.jsx",
    "src/components/shared/ThemeToggle.jsx",
    "src/layouts/DashboardLayout.jsx",
    "src/layouts/MainLayout.jsx",
    "src/pages/AllLoans.jsx",
    "src/pages/ApplyLoan.jsx",
    "src/pages/Home.jsx",
    "src/pages/LoanDetails.jsx",
    "src/pages/Login.jsx",
    "src/pages/NotFound.jsx",
    "src/pages/Register.jsx",
    "src/pages/dashboard/DashboardHome.jsx",
    "src/pages/dashboard/MyLoans.jsx",
    "src/routes/AdminRoute.jsx",
    "src/routes/ManagerRoute.jsx",
    "src/routes/PrivateRoute.jsx"
)

$reactImport = 'import React from "react"'

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Check if React import already exists
        if ($content -notmatch 'import React from') {
            # Add React import at the beginning
            $newContent = $reactImport + "`r`n" + $content
            Set-Content -Path $fullPath -Value $newContent -NoNewline
            Write-Host "✅ Added React import to: $file" -ForegroundColor Green
        } else {
            Write-Host "⏭️  Skipped (already has import): $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✨ Done! All files processed." -ForegroundColor Cyan
