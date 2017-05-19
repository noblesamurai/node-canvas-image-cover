const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(dirtyChai);

describe('canvas-cover-image', function () {
  it('If image and canvas are the same size, a straight overlay occurs', function () {
    const cover = require('..');
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 100, height: 200 };
    cover(ctx, img, 0, 0, 100, 200);
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 0, 0, 100, 200, 0, 0, 100, 200)).to.equal(true);
  });

  it('zooms appropriately', function () {
    const cover = require('..');
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 100, height: 200 };
    cover(ctx, img, 0, 0, 100, 200, { zoom: 2 });
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 25, 50, 50, 100, 0, 0, 100, 200)).to.equal(true);
  });

  it('zooms off center', function () {
    const cover = require('..');
    const ctx = {
      save: () => {},
      drawImage: sinon.stub(),
      restore: () => {}
    };
    const img = { width: 100, height: 200 };
    cover(ctx, img, 0, 0, 100, 200, { zoom: 2, cx: 0, cy: 0 });
    expect(ctx.drawImage.callCount).to.equal(1);
    expect(ctx.drawImage.calledWith(img, 0, 0, 50, 100, 0, 0, 100, 200)).to.equal(true);
  });
});
