class Cover {
  /**
   * Provides a mechanism to draw an image in canvas such that it will cover the
   * area provided exactly.
   *
   * @param {Canvas.Image} img the image to render
   * @param {number} x offset x coordinate on the canvas
   * @param {number} y offset y coordinate on the canvas
   * @param {number} width width to fit to on the canvas
   * @param {number} height height to fit to on the canvas
   * @returns {Cover}
   */
  constructor (img, x, y, width, height) {
    const ir = img.width / img.height;
    const r = width / height;
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bounds = [{ width: img.width, height: img.height, sx: 0, sy: 0 }];
    this.sw = ir < r ? img.width : img.height * r;
    this.sh = ir < r ? img.width / r : img.height;
    this.pan(0.5, 0.5);
  }

  /**
   * Doesn't actually crop the input image but does redefine the bounds of the
   * image for the sake of panning. ie. after a crop, the pan cx and cy will
   * be with regard to the currently defined area rather than the whole image
   * or previously cropped area.
   *
   * @returns {Cover}
   */
  crop () {
    let { sw: width, sh: height, sx, sy } = this;
    this.bounds.push({ width, height, sx, sy });
    return this;
  }

  /**
   * Change the center point of the image.
   *
   * @param {number} cx value between 0 and 1 representing the left or right
   *   side of the image bounds. The bounds will be the whole image or the
   *   defined source area at the time of the last crop().
   * @param {number} cy value between 0 and 1 representing the top or the
   *   bottom of the image bounds.
   * @returns {Cover}
   */
  pan (cx, cy) {
    if (cx < 0 || cx > 1) throw new Error('make sure 0 < cx < 1 ');
    if (cy < 0 || cy > 1) throw new Error('make sure 0 < cy < 1 ');
    let { width, height, sx, sy } = this.bounds[this.bounds.length - 1];
    this.sx = sx + (width - this.sw) * cx;
    this.sy = sy + (height - this.sh) * cy;
    return this;
  }

  /**
   * Zoom in at the current location.
   *
   * @param {number} factor how much to zoom in by (>=1).
   * @returns {Cover}
   */
  zoom (factor) {
    if (factor < 1) throw new Error('zoom not >= 1');
    this.sx += (this.sw - (this.sw / factor)) / 2;
    this.sy += (this.sh - (this.sh / factor)) / 2;
    this.sw /= factor;
    this.sh /= factor;
    return this;
  }

  /**
   * Render to the provided context.
   *
   * @param {CanvasRenderingContext2D} ctx canvas context to render to
   * @returns {Cover}
   */
  render (ctx) {
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, // source
      this.x, this.y, this.width, this.height); // destination
    return this;
  }
}

module.exports = (img, x, y, width, height) => {
  return new Cover(img, x, y, width, height);
};
