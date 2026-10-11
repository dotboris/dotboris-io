import { useEffect, useRef, useState } from "react";
import { Simulation } from "./Simulation";

const CELL_SIZE = 6;

export function LangtonsAnt() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [simulation] = useState(() => new Simulation(100, 100));
  const [speed, setSpeed] = useState(10);

  const canvasWidth = simulation.width * CELL_SIZE;
  const canvasHeight = simulation.height * CELL_SIZE;

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const antColor = styles.getPropertyValue("--color-red-500");
    const cellColor = styles.getPropertyValue("--color-gray-800");
    const gridColor = styles.getPropertyValue("--color-gray-400");

    const handle = setInterval(
      () => {
        if (!canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        simulation.tick();

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.strokeStyle = gridColor;
        ctx.beginPath();
        for (let x = 1; x < simulation.width; x += 1) {
          ctx.moveTo(x * CELL_SIZE, 0);
          ctx.lineTo(x * CELL_SIZE, canvasHeight);
        }
        for (let y = 1; y < simulation.height; y += 1) {
          ctx.moveTo(0, y * CELL_SIZE);
          ctx.lineTo(canvasWidth, y * CELL_SIZE);
        }
        ctx.stroke();

        ctx.fillStyle = cellColor;
        for (let x = 0; x < simulation.width; x += 1) {
          for (let y = 0; y < simulation.height; y += 1) {
            if (simulation.cell(x, y).value === 1) {
              ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
          }
        }

        ctx.fillStyle = antColor;
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
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvas}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full"
        style={{
          maxWidth: canvasWidth,
        }}
      />
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
