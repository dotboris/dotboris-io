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
        Round: rounds + 1,
        "Sacrificed Sapprolings": count,
        "Available Mana": mana,
        "Summoned Sapprolings": created,
        "Floating Mana Leftover": floatingMana,
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
      <dl>
        <dt>Total Rounds</dt>
        <dd>{res.rounds}</dd>
        <dt>Slimefoot Triggers</dt>
        <dd>{res.triggers}</dd>
        <dt>Floating Leftover Mana</dt>
        <dd>{res.floatingMana}</dd>
      </dl>
      <table>
        <thead>
          <tr>
            {Object.keys(res.trace[0]).map((key) => (
              <td key={key}>{key}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {res.trace.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
