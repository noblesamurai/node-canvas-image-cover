/**
 * @description
 * Draw an image on the canvas at a given centre point.  The image is zoomed
 * (with locked aspect ratio) so that it covers the canvas along both axis.
 * If zoom is greater than 1, the image is then zoomed by the the given zoom factor,
 * with origin locked as per the arguments given.
 *
 * Origin is a lot like CSS background-origin https://developer.mozilla.org/en/docs/Web/CSS/background-origin
 *
 * @param {CanvasRenderingContext2D} ctx Canvas context to render to
 * @param {Canvas.Image|Canvas} img Image to render
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {Object} opts
 * @param {number} opts.cx Gradient center x position defined as a value between
 *   0 left side of the box to 1 right side of the box (defaults to 0.5).
 * @param {number} opts.cy Gradient center y position defined as a value between
 *   0 and 1 (defaults to 0.5).
 * @param {number} opts.zoom Image scaling factor (default 1 - cover only).
 * @param {number} opts.alpha Alpha value between 0 transparent and 1 opaque.
 */
function cover (ctx, img, x, y, width, height, opts) {
  opts = Object.assign({ cx: 0.5, cy: 0.5, zoom: 1, alpha: 1 }, opts || {});
  if (opts.cx < 0 || opts.cx > 1) throw new Error('Make sure 0 < opt.cx < 1 ');
  if (opts.cy < 0 || opts.cy > 1) throw new Error('Make sure 0 < opt.cy < 1 ');
  if (opts.zoom < 1) throw new Error('opts.zoom not >= 1');

  const ir = img.width / img.height;
  const r = width / height;
  // sw and sh are where we will start from in the image (we may be cropping it)
  const sw = (ir < r ? img.width : img.height * r) / opts.zoom;
  const sh = (ir < r ? img.width / r : img.height) / opts.zoom;
  // sx and sy are the width/height to crop out
  const sx = (img.width - sw) * opts.cx;
  const sy = (img.height - sh) * opts.cy;
  ctx.save();
  ctx.globalAlpha = opts.alpha;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
  ctx.restore();
}

module.exports = cover;
