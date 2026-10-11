/**
 * Ant possible directions such that increasing index with wraparound goes
 * clockwise and decreasing wtih wraparound goes counterclockwise
 */
const DIRECTIONS = ["up", "right", "down", "left"] as const;
type Direction = (typeof DIRECTIONS)[number];

export class Simulation {
  readonly width: number;
  readonly height: number;
  private antX: number;
  private antY: number;
  private antDirection: Direction;
  private cells: Uint8Array;

  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.antDirection = "up";
    this.antX = Math.floor(this.width / 2);
    this.antY = Math.floor(this.height / 2);
    this.cells = new Uint8Array(this.width * this.height);
    this.cells.fill(0);
  }

  get ant() {
    return { x: this.antX, y: this.antY, direction: this.antDirection };
  }

  cell(x: number, y: number) {
    const index = x * this.width + y;
    const value = this.cells[index];
    return { index, value };
  }

  tick() {
    const { index, value } = this.cell(this.antX, this.antY);

    // Apply rules
    let turn: -1 | 1;
    let newCell;
    if (value === 0) {
      turn = 1;
      newCell = 1;
    } else {
      turn = -1;
      newCell = 0;
    }

    // Update
    this.moveAnt(turn);
    this.cells[index] = newCell;
    console.log(this);
  }

  private moveAnt(turn: 1 | -1) {
    let newDirectionIndex = DIRECTIONS.indexOf(this.antDirection) + turn;
    if (newDirectionIndex < 0) {
      newDirectionIndex = DIRECTIONS.length - 1;
    } else if (newDirectionIndex >= DIRECTIONS.length) {
      newDirectionIndex = 0;
    }
    const newDirection = DIRECTIONS[newDirectionIndex];
    let { antX, antY } = this;
    switch (newDirection) {
      case "up": {
        antY += 1;
        break;
      }
      case "right": {
        antX += 1;
        break;
      }
      case "down": {
        antY -= 1;
        break;
      }
      case "left": {
        antX -= 1;
        break;
      }
    }
    this.antDirection = newDirection;
    this.antX = clamp(antX, 0, this.width);
    this.antY = clamp(antY, 0, this.height);
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
