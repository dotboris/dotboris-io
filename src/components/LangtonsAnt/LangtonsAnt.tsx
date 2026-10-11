import { useEffect, useRef, useState } from "react";
import { Simulation } from "./Simulation";

const CELL_SIZE = 5;

export function LangtonsAnt() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [simulation] = useState(() => new Simulation(100, 100));
  const [speed, setSpeed] = useState(10);

  useEffect(() => {
    const handle = setInterval(
      () => {
        if (!canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        simulation.tick();

        ctx.clearRect(0, 0, 512, 512);

        ctx.fillStyle = "#000";
        for (let x = 0; x < simulation.width; x += 1) {
          for (let y = 0; y < simulation.height; y += 1) {
            if (simulation.cell(x, y).value === 1) {
              ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
          }
        }

        ctx.fillStyle = "red";
        ctx.fillRect(
          simulation.ant.x * CELL_SIZE,
          simulation.ant.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE,
        );
      },
      (10 - speed) * 25,
    );
    return () => {
      clearInterval(handle);
    };
  }, [simulation, speed]);

  return (
    <div>
      <canvas ref={canvas} width="512" height="512" />
      <div>
        <label className="flex items-center gap-2">
          <span>Speed:</span>
          <input
            className="rounded border border-gray-500 px-2 py-0.5"
            type="number"
            min="1"
            max="10"
            value={speed}
            onChange={(event) => {
              setSpeed(event.target.valueAsNumber);
            }}
          />
        </label>
      </div>
    </div>
  );
}
