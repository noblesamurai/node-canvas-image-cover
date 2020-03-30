const cover = require('..');
const fs = require('fs');
const path = require('path');
const tempy = require('tempy');
const termImg = require('term-img');
const { createCanvas } = require('canvas');

describe('render an image', function () {
  this.timeout(5000);

  it('should render the example image', function () {
    const data = fs.readFileSync(path.resolve(__dirname, 'fixtures/photo.jpeg'));
    const img = createCanvas();
    img.src = data;

    const ops = [
      { title: 'cover(img, 0, 0, 200, 100)', op: cover(img, 0, 0, 200, 100) },
      { title: '.zoom(1.5)', op: cover(img, 0, 0, 200, 100).zoom(1.5) },
      { title: '.pan(0, 0)', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0) },
      { title: '.crop() -- define new bounds', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0).crop() },
      { title: '.zoom(1.5)', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0).crop().zoom(1.5) },
      { title: '.pan(1, 1)', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0).crop().zoom(1.5).pan(1, 1) },
      { title: '.zoom(1.5)', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0).crop().zoom(1.5).pan(1, 1).zoom(1.5) },
      { title: '.pan(0, 0)', op: cover(img, 0, 0, 200, 100).zoom(1.5).pan(0, 0).crop().zoom(1.5).pan(1, 1).zoom(1.5).pan(0, 0) }
    ];

    const pad = 20;
    const text = 20;
    const canvas = createCanvas(img.width + 200 + pad * 3, (img.height + pad + text) * ops.length + pad);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#dddddd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ops.forEach(({ title, op }, i) => {
      ctx.save();
      ctx.translate(pad, (img.height + pad + text) * i + pad + text);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#333333';
      ctx.font = (text - 5) + 'px sans-serif';
      ctx.fillText(title, 0, -5);
      ops.slice(0, i + 1).forEach(({ title, op }, ii) => {
        ctx.strokeStyle = /crop/.test(title) ? '#ff0000' : '#333333';
        if (i === ii) {
          ctx.drawImage(img, op.sx, op.sy, op.sw, op.sh, op.sx, op.sy, op.sw, op.sh);
          ctx.setLineDash([]);
          ctx.strokeRect(op.sx, op.sy, op.sw, op.sh);
        } else {
          ctx.setLineDash(/crop/.test(title) ? [] : [2]);
          ctx.strokeRect(op.sx, op.sy, op.sw, op.sh);
        }
      });
      ctx.restore();

      ctx.save();
      ctx.translate(pad * 2 + img.width, (img.height + pad + text) * i + pad + text);
      op.render(ctx);
      ctx.restore();
    });

    // dump to terminal if possible
    termImg(canvas.toBuffer('image/png'), { fallback: () => {} });

    // save to file
    canvas.pngStream().pipe(fs.createWriteStream(tempy.file({ extension: 'png' })));
  });
});
