const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 600x600のキャンバスを作成
const canvas = createCanvas(600, 600);
const ctx = canvas.getContext('2d');

const degree = 45; // 例として45度の状態を静止画出力

function drawLine(x0, y0, x1, y1, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

// 背景塗りつぶし
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 600, 600);

ctx.save();
ctx.translate(150, 150);

// 座標軸
drawLine(0, -100, 0, 400, '#ccc');
drawLine(-100, 0, 400, '#ccc');

const radians = degree * Math.PI / 180;
const c = Math.cos(radians) * 50;
const s = Math.sin(radians) * -50;

// 単位円
ctx.strokeStyle = 'black';
ctx.beginPath();
ctx.arc(0, 0, 50, 0, Math.PI * 2);
ctx.stroke();

// 針
drawLine(0, 0, c, s, 'red');

// sinカーブ
ctx.strokeStyle = 'green';
ctx.beginPath();
ctx.moveTo(0, s);
for (let i = 0; i < 400; i++) {
    const s1 = Math.sin((degree + i) * Math.PI / 180) * -50;
    ctx.lineTo(i, s1);
}
ctx.stroke();

// cosカーブ
ctx.strokeStyle = 'blue';
ctx.beginPath();
ctx.moveTo(c, 0);
for (let i = 0; i < 400; i++) {
    const c1 = Math.cos((degree + i) * Math.PI / 180) * 50;
    ctx.lineTo(c1, i);
}
ctx.stroke();

ctx.restore();

// PNGファイルとして保存
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'trig-graph.png'), buffer);
console.log('画像を trig-graph.png として保存しました！');