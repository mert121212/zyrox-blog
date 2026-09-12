param(
    [string]$src,
    [string]$dst,
    [int]$targetWidth = 1280,
    [int]$quality = 78
)

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile($src)
$targetHeight = [int]($img.Height * ($targetWidth / $img.Width))

$bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.DrawImage($img, 0, 0, $targetWidth, $targetHeight)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

$bitmap.Save($dst, $codec, $encoderParams)

$graphics.Dispose()
$bitmap.Dispose()
$img.Dispose()

$size = (Get-Item $dst).Length
Write-Host "Saved $dst ($size bytes)"
