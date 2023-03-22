const QRCode = require("qrcode");

QRCode.toFile("qr.png", 'https://fake-product-verification.vercel.app', function (err, url) {
    console.log(url)
})