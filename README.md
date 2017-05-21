# Canvas-image-cover [![Build Status](https://secure.travis-ci.org/noblesamurai/canvas-image-cover.png?branch=master)](http://travis-ci.org/noblesamurai/canvas-image-cover) [![NPM version](https://badge-me.herokuapp.com/api/npm/canvas-image-cover.png)](http://badges.enytc.com/for/npm/canvas-image-cover)

> Cover a canvas with an image given a locked centre point and zoom factor.

## Usage

```js
const cover = require('canvas-cover-image');
const Canvas = require('canvas');
const Image = Canvas.Image;
const canvas = new Canvas(200, 200);
const ctx = canvas.getContext('2d');
const img;

// Assume image is 200x200px
fs.readFile(__dirname + '/images/squid.png', function(err, squid){
  if (err) throw err;
  img = new Image;
  img.src = squid;
  overlay(img);
  zoom(img);
  offset(img);
});

// Perfect overlay of image to canvas
function overlay (img) {
  cover(ctx, img, 0, 0, 200, 200);
}

// Overlay image (at 2X zoom) to canvas.
function zoom (img) {
  cover(ctx, img, 0, 0, 200, 200, { zoom: 2 });
}

// Overlay image, and zoom with 0, 0 locked as centre point of zoom.
function offset(img) {
  cover(ctx, img, 0, 0, 200, 200, { zoom: 2, cx: 0, cy: 0 });
}
```

## API
<a name="cover"></a>

## cover(ctx, img, x, y, width, height)
Draw an image on the canvas at a given centre point.  The image is zoomed
(with locked aspect ratio) so that it covers the canvas along both axis.
If zoom is greater than 1, the image is then zoomed by the the given zoom factor,
with centre point locked as per the arguments given.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>CanvasRenderingContext2D</code> | Canvas context to render to |
| img | <code>Canvas.Image</code> \| <code>Canvas</code> | Image to render |
| x | <code>number</code> |  |
| y | <code>number</code> |  |
| width | <code>number</code> |  |
| height | <code>number</code> |  |
| opts.cx | <code>number</code> | Gradient center x position defined as a value between   0 left side of the box to 1 right side of the box (defaults to 0.5). |
| opts.cy | <code>number</code> | Gradient center y position defined as a value between   0 and 1 (defaults to 0.5). |
| opts.zoom | <code>number</code> | Image scaling factor (default 1 - cover only). |
| opts.alpha | <code>number</code> | Alpha value between 0 transparent and 1 opaque. |

Note: To regenerate this section from the jsdoc run `npm run docs` and paste
the output above.

## Installation

This module is installed via npm:

``` bash
$ npm install canvas-image-cover
```
## License

The BSD License

Copyright (c) 2017, Andrew Harris

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Andrew Harris nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

