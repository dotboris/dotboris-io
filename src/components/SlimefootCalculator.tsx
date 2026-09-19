import { useMemo, useState } from "react";

export function SlimefootCalculator() {
  const [initialCount, setInitialCount] = useState<number>(8);

  const res = useMemo(() => {
    const trace = [];

    let count = initialCount;
    let triggers = 0;
    let floatingMana = 0;
    let rounds = 0;
    while (count > 0) {
      triggers += count;
      const mana = count * 2 + floatingMana;
      const created = Math.floor(mana / 4);
      floatingMana = mana % 4;
      trace.push({
        count,
        triggers,
        totalMana: mana,
        created,
        floatingMana,
      });
      count = created;
      rounds += 1;
    }

    return {
      rounds,
      floatingMana,
      triggers,
      trace,
    };
  }, [initialCount]);

  return (
    <div>
      <label>
        Initial Sapproling count:{" "}
        <input
          type="number"
          value={initialCount}
          onChange={(e) => setInitialCount(parseInt(e.target.value, 10))}
        />
      </label>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
