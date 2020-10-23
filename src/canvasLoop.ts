export interface Entity {
  update: (deltaTime: number) => unknown;
  draw: () => void;
  shouldDelete: () => boolean;
}

export default class CanvasLoop {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  onFinish?: () => void;

  private entities: Entity[] = [];
  private finished = false;
  private started = false;
  private lastUpdateTime?: number;

  static create = (canvas: HTMLCanvasElement): CanvasLoop | null => {
    if (canvas.getContext("2d") === null) return null;
    return new CanvasLoop(canvas);
  };

  private constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  clear = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  addEntity = (entity: Entity): void => {
    this.entities.push(entity);
  };

  start = (): void => {
    if (!this.started) {
      this.started = true;
      this.finished = false;
      delete this.lastUpdateTime;

      this.requestFrame();
    }
  };

  private requestFrame = (): void => {
    window.requestAnimationFrame(this.update);
  };

  private finish = (): void => {
    if (!this.finished) {
      this.started = false;
      this.finished = true;
      this.onFinish?.();
    }
  };

  private update = (): void => {
    if (this.entities.length === 0) {
      this.finish();
    }
    if (this.finished) return;

    this.clear();

    if (this.lastUpdateTime === undefined) {
      this.lastUpdateTime = Date.now();
      this.requestFrame();
    }

    const now = Date.now();
    const dt = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    for (let i = 0; i < this.entities.length; ++i) {
      if (this.entities[i].shouldDelete()) {
        this.entities.splice(i, 1);
        continue;
      }

      this.entities[i].update(dt);
    }

    this.entities.forEach(e => e.draw());

    this.requestFrame();
  };
}
