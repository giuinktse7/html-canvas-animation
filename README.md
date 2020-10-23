# html-canvas-animation

A TypeScript (compiles to JavaScript) library for running animations in HTML Canvas. The library can be consumed as a local NPM package (installable through `npm` or `yarn`).

## Usage

Build with `yarn build:prod` (production) or `yarn build` (development).

### Using as a library

1. Move `./index.d.ts` and `build/release/*` to `<path>/vendor/html-canvas-animation`.

2. In `package.json` add

```json
{
  "dependencies": {
    "html-canvas-animation": "./vendor/html-canvas-animation/"
  }
}
```

3. Run `yarn install`

4. Import and use.

## Example

```typescript
import { Rectangle, CanvasLoop, easing } from "html-canvas-animation";

const testAnimation = (ctx: CanvasRenderingContext2D) => {
  const animation = Rectangle.animate(ctx)
    .scale({ duration: 2000, size: { width: 50, height: 50 } })
    .translate({ duration: 2000, to: { x: 125, y: 80 } });

  animation.onFinish = () => animation.fadeOut(1000, easing.easeOutQuad);
  animation.setRectangle(new Rectangle("#9575CD", 50, 50, 25, 25));

  return animation;
};

window.onload = function () {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const canvasLoop = CanvasLoop.create(canvas);

  if (canvasLoop === null) {
    console.warn("Could not create canvas loop.");
    return;
  }

  canvasLoop.onFinish = () => {
    canvasLoop.clear();
    console.log("onFinish");
  };

  const animation = testAnimation(canvasLoop.ctx);
  canvasLoop.addEntity(animation);

  canvasLoop.start();
};
```
