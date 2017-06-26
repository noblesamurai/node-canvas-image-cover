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
  cover(img, 0, 0, 200, 200).zoom(0, 0).pan(0, 0).render(ctx);

  // to pan to the left side and then zoom into the top right corner of that
  // left side...
  cover(img, 0, 0, 200, 200).pan(0, 0).crop().zoom(2).pan(1, 0);

  // and other more complicated things...
});
```

### Example of how multiple levels of zoom and pan work

![chaining multiple zoom and pans](https://github.com/noblesamurai/node-canvas-image-cover/raw/5ec6127729563aeffb747c1241f81117b002f382/example.png)

## API

## Cover

```js
const cover = require('canvas-image-cover');
cover(img, x, y, width, height);
```
Provides a mechanism to draw an image in canvas such that it will cover the area provided exactly.


| Param | Type | Description |
| --- | --- | --- |
| img | <code>Canvas.Image</code> | the image to render |
| x | <code>number</code> | offset x coordinate on the canvas |
| y | <code>number</code> | offset y coordinate on the canvas |
| width | <code>number</code> | width to fit to on the canvas |
| height | <code>number</code> | height to fit to on the canvas |

## Chainable modifiers:

All the following functions will return the same `Cover` object as the `cover()` function so they can be chained together.

### Crop

```js
cover(img, x, y, width, height).crop();
```
Doesn't actually crop the input image but does redefine the bounds of the image for the sake of panning. ie. after a crop, the pan cx and cy will be with regard to the currently defined area rather than the whole image or previously cropped area.

### Pan

```
cover(img, x, y, width, height).pan(cx, cy);
```
Change the center point of the image.

| Param | Type | Description |
| --- | --- | --- |
| cx | <code>number</code> | value between 0 and 1 representing the left or right   side of the image bounds. The bounds will be the whole image or the   defined source area at the time of the last crop(). |
| cy | <code>number</code> | value between 0 and 1 representing the top or the   bottom of the image bounds. |

### Zoom

```js
cover(img, x, y, width, height).zoom(factor);
```
Zoom in at the current location.

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | how much to zoom in by (>=1). |

### Render

```js
cover(img, x, y, width, height).render(ctx);
```
Render to the provided context.

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>CanvasRenderingContext2D</code> | canvas context to render to |

Note: The `Cover` object returned by all the above functions contains the source x, y, width, height values used to do the rendering so if you only want the numbers and you don't actually need to render to the canvas you can retrieve them from that object.

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

