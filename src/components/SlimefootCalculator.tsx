import { useId, useMemo, useState } from "react";

export function SlimefootCalculator() {
  const [initialCount, setInitialCount] = useState(8);
  const initialCountId = useId();
  const [summonCost, setSummonCost] = useState(4);
  const summonCostId = useId();
  const [maxRounds, setMaxRounds] = useState(100);
  const maxRoundsId = useId();

  const res = useMemo(() => {
    const trace = [];

    let count = initialCount;
    let triggers = 0;
    let floatingMana = 0;
    let rounds = 0;
    while (count > 0 && rounds < maxRounds) {
      triggers += count;
      const mana = count * 2 + floatingMana;
      const created = Math.floor(mana / summonCost);
      floatingMana = mana % summonCost;
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
  }, [initialCount, summonCost, maxRounds]);

  return (
    <div>
      <div className="grid-cols-2 gap-4 sm:grid">
        <div>
          <h2>Simulation Settings</h2>
          <div className="grid grid-cols-[auto_5rem] items-center justify-start gap-3">
            <label htmlFor={initialCountId}>Initial Sapproling count:</label>
            <input
              className="rounded border border-gray-500 px-2 py-0.5"
              id={initialCountId}
              type="number"
              min="1"
              step="1"
              value={initialCount}
              onChange={(e) => setInitialCount(parseInt(e.target.value, 10))}
            />
            <label htmlFor={summonCostId}>Sapproling mana cost:</label>
            <input
              className="rounded border border-gray-500 px-2 py-0.5"
              id={summonCostId}
              type="number"
              min="1"
              step="1"
              value={summonCost}
              onChange={(e) => setSummonCost(parseInt(e.target.value, 10))}
            />
            <label htmlFor={maxRoundsId}>Max simulation rounds:</label>
            <input
              className="rounded border border-gray-500 px-2 py-0.5"
              id={maxRoundsId}
              type="number"
              min="1"
              step="1"
              value={maxRounds}
              onChange={(e) => setMaxRounds(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <div>
          <h2>Results</h2>
          <dl className="not-prose grid grid-cols-[auto_5rem] justify-start gap-3">
            <dt>Total Rounds:</dt>
            <dd>{res.rounds}</dd>
            <dt>Slimefoot Triggers:</dt>
            <dd>{res.triggers}</dd>
            <dt>Floating Leftover Mana:</dt>
            <dd>{res.floatingMana}</dd>
          </dl>
        </div>
      </div>
      <div>
        <h2>Round by Round Simulation</h2>
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
    </div>
  );
}
