const QRCode = require("qrcode");

QRCode.toFile("qr.png", 'https://localhost:5174/gallery/0', function (err, url) {
    console.log(url)
})