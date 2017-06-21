const expect = require('chai').expect;
const cover = require('..');
const sinon = require('sinon');

describe('canvas cover', function () {
  it('should return the same same size and offsets if img fits exactly', () => {
    const img = { width: 200, height: 100 };
    const out = cover(img, 0, 0, 200, 100);
    expect(out).to.include({ sx: 0, sy: 0, sw: 200, sh: 100 });
  });

  it('should zoom into the center', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).zoom(2);
    expect(out).to.include({ sx: 100, sy: 25, sw: 100, sh: 50 });
  });

  it('should render to a canvas context', () => {
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 300, height: 100 };
    cover(img, 0, 0, 200, 100).zoom(2).render(ctx);
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 100, 25, 100, 50, 0, 0, 200, 100)).to.equal(true);
  });

  it('should shrink to fit if the render size is smaller than the image', () => {
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 600, height: 200 };
    cover(img, 0, 0, 200, 100).zoom(2).render(ctx);
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 200, 50, 200, 100, 0, 0, 200, 100)).to.equal(true);
  });

  it('should be able to render to a non 0 offset position in the canvas', () => {
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 600, height: 200 };
    cover(img, 50, 50, 200, 100).zoom(2).render(ctx);
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 200, 50, 200, 100, 50, 50, 200, 100)).to.equal(true);
  });

  it('should pan to the left', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).pan(0, 0.5);
    expect(out).to.include({ sx: 0, sy: 0, sw: 200, sh: 100 });
  });

  it('should pan to the right', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).pan(1, 0.5);
    expect(out).to.include({ sx: 100, sy: 0, sw: 200, sh: 100 });
  });

  it('should zoom into the top left', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).zoom(2).pan(0, 0);
    expect(out).to.include({ sx: 0, sy: 0, sw: 100, sh: 50 });
  });

  it('should zoom into the bottom right', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).zoom(2).pan(1, 1);
    expect(out).to.include({ sx: 200, sy: 50, sw: 100, sh: 50 });
  });

  it('should zoom into the center of the top left', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).zoom(2).pan(0, 0).zoom(2);
    expect(out).to.include({ sx: 25, sy: 12.5, sw: 50, sh: 25 });
  });

  it('should zoom into the center of the bottom right', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).zoom(2).pan(1, 1).zoom(2);
    expect(out).to.include({ sx: 225, sy: 62.5, sw: 50, sh: 25 });
  });

  it('should pan within a cropped area', () => {
    const img = { width: 300, height: 100 };
    const out = cover(img, 0, 0, 200, 100).crop().zoom(2).pan(1, 1);
    expect(out).to.include({ sx: 150, sy: 50, sw: 100, sh: 50 });
  });
});
