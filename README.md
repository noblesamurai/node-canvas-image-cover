# Canvas-image-cover [![Build Status](https://secure.travis-ci.org/noblesamurai/canvas-image-cover.png?branch=master)](http://travis-ci.org/noblesamurai/canvas-image-cover) [![NPM version](https://badge-me.herokuapp.com/api/npm/canvas-image-cover.png)](http://badges.enytc.com/for/npm/canvas-image-cover)

> Cover a canvas with an image given a locked centre point and zoom factor.

## Purpose

Kind of provides a canvas equivalent of the CSS [background-size:
cover](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size?v=example#cover).

## Installation

This module is installed via npm:

``` bash
$ npm install canvas-image-cover
```

## Usage

```js
const cover = require('canvas-cover-image');
const Canvas = require('canvas');
const Image = Canvas.Image;
const canvas = new Canvas(640, 480);
const ctx = canvas.getContext('2d');
const img;

fs.readFile(__dirname + '/images/squid.png', function(err, squid){
  if (err) throw err;
  img = new Image;
  img.src = squid;

  // to fit the image to the canvas at the best possible size.
  cover(img, 0, 0, 200, 200).render(ctx);

  // to fit and zoom in by a factor of 2
  cover(img, 0, 0, 200, 200).zoom(2).render(ctx);

  // to fit and zoom into the top left corner of the image
  cover(img, 0, 0, 200, 200).pan(0, 0).zoom(2).pan(0, 0).render(ctx);
});
```

### Example of how multiple levels of zoom and pan work

![chaining multiple zoom and pans](https://github.com/noblesamurai/node-canvas-image-cover/raw//example.png)

## API

### Constructor

```js
cover(img, x, y, width, height)
```

Provides a mechanism to draw an image in canvas such that it will cover the
area provided exactly.

| Param | Type | Description |
| --- | --- | --- |
| img | <code>Canvas.Image</code> | the image to render |
| x | <code>number</code> | offset x coordinate on the canvas |
| y | <code>number</code> | offset y coordinate on the canvas |
| width | <code>number</code> | width to fit to on the canvas |
| height | <code>number</code> | height to fit to on the canvas |

### chainable modifiers:

#### Pan
Change the center point of the image.  The default `cx` and `cy` values are `0.5` (center).

```js
cover(img, x, y, width, height).pan(cx, cy)
```

| Param | Type | Description |
| --- | --- | --- |
| cx | <code>number</code> | value between 0 and 1 representing the left or right side of the image bounds. The image bounds will be the image area prior to the last zoom operation. ie. initially the pan area is the whole image. Then after each zoom it will be the area prior to that zoom. |
| cy | <code>number</code> | value between 0 and 1 representing the top or the bottom of the image bounds. |

#### Zoom
Zoom in at the current location.

```js
cover(img, x, y, width, height).zoom(factor)
```

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | how much to zoom in by (>=1). |

<a name="Cover+render"></a>

#### Render
Render to the provided context.

```js
cover(img, x, y, width, height).render(ctx)
```

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>CanvasRenderingContext2D</code> | canvas context to render to |

### Retrieving the source location without rendering
The returned object contains the source x, y, width ahd height values.

```js
let { sx, sy, sw, sh } = cover(img, x, y, width, height).zoom(2);
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

