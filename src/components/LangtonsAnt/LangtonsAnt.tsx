import { useCallback, useEffect, useRef, useState } from "react";
import { Simulation } from "./Simulation";
import { Slider } from "../Slider";
import { Button } from "../Button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "../Input";

export function LangtonsAnt() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(128);
  const [simulation, setSimulation] = useState(
    () => new Simulation(width, height),
  );
  const reset = useCallback(
    () => setSimulation(new Simulation(width, height)),
    [width, height],
  );
  const [speed, setSpeed] = useState(10);
  const [cellSize, setCellSize] = useState(8);

  const canvasWidth = simulation.width * cellSize;
  const canvasHeight = simulation.height * cellSize;

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const antColor = styles.getPropertyValue("--color-rose-300");
    const cellColor = styles.getPropertyValue("--color-neutral-700");
    const gridColor = styles.getPropertyValue("--color-neutral-300");

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
          ctx.moveTo(x * cellSize, 0);
          ctx.lineTo(x * cellSize, canvasHeight);
        }
        for (let y = 1; y < simulation.height; y += 1) {
          ctx.moveTo(0, y * cellSize);
          ctx.lineTo(canvasWidth, y * cellSize);
        }
        ctx.stroke();

        ctx.fillStyle = cellColor;
        for (let x = 0; x < simulation.width; x += 1) {
          for (let y = 0; y < simulation.height; y += 1) {
            if (simulation.cell(x, y).value === 1) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
          }
        }

        ctx.fillStyle = antColor;
        ctx.fillRect(
          simulation.ant.x * cellSize,
          simulation.ant.y * cellSize,
          cellSize,
          cellSize,
        );
      },
      (10 - speed) * 25,
    );
    return () => {
      clearInterval(handle);
    };
  }, [simulation, speed, cellSize]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <canvas
        className="rounded border border-neutral-300 lg:w-3xl"
        ref={canvas}
        width={canvasWidth}
        height={canvasHeight}
      />
      <div className="flex flex-1 flex-col gap-2">
        <label className="flex items-center gap-2">
          <span>Speed:</span>
          <Slider
            min={1}
            max={10}
            value={[speed]}
            onValueChange={([v]) => setSpeed(v)}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-nowrap">Cell Size:</span>
          <Slider
            min={2}
            max={16}
            value={[cellSize]}
            onValueChange={([v]) => {
              setCellSize(v);
            }}
          />
        </label>
        <div className="flex items-center gap-2">
          <span>Size:</span>
          <Input
            className="w-full md:w-32 lg:w-full"
            type="number"
            min={1}
            max={256}
            value={width}
            onChange={(e) => setWidth(e.target.valueAsNumber)}
          />
          <span>x</span>
          <Input
            className="w-full md:w-32 lg:w-full"
            type="number"
            min={1}
            max={256}
            value={height}
            onChange={(e) => setHeight(e.target.valueAsNumber)}
          />
        </div>
        <Button className="flex gap-2" type="button" onClick={() => reset()}>
          <ReloadIcon />
          Restart Simulation
        </Button>
      </div>
    </div>
  );
}
