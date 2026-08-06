Add-Type -AssemblyName System.Drawing
$srcPath = "c:\Users\kasir\Desktop\blog sitesi\public\logo.png"
$outDir = "c:\Users\kasir\Desktop\blog sitesi\public"

$src = [System.Drawing.Image]::FromFile($srcPath)

# 32x32 favicon
$bmp32 = New-Object System.Drawing.Bitmap($src, 32, 32)
$bmp32.Save("$outDir\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Dispose()

# 16x16 favicon
$bmp16 = New-Object System.Drawing.Bitmap($src, 16, 16)
$bmp16.Save("$outDir\favicon-16x16.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp16.Dispose()

# 180x180 Apple touch icon
$apple = New-Object System.Drawing.Bitmap($src, 180, 180)
$apple.Save("$outDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$apple.Dispose()

# 192x192 for web manifest
$bmp192 = New-Object System.Drawing.Bitmap($src, 192, 192)
$bmp192.Save("$outDir\icon-192x192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp192.Dispose()

# 512x512 for web manifest
$bmp512 = New-Object System.Drawing.Bitmap($src, 512, 512)
$bmp512.Save("$outDir\icon-512x512.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp512.Dispose()

# Copy logo as favicon.ico (browser will handle it)
Copy-Item "$outDir\favicon-32x32.png" "$outDir\favicon.ico" -Force

$src.Dispose()
Write-Host "All favicons created successfully"
