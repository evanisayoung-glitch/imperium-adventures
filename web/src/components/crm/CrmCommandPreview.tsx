"use client";

const stages = [
  { name: "Prospect", count: 18, tone: "bg-field/20" },
  { name: "Research", count: 9, tone: "bg-gold/25" },
  { name: "Demo", count: 5, tone: "bg-forest-mid/40" },
  { name: "Signed", count: 3, tone: "bg-gold/45" },
];

const kpis = [
  { label: "Pipeline", value: "$2.4M", badge: "Pipeline" },
  { label: "Avg Score", value: "78", badge: "Calculated" },
  { label: "Signed / mo", value: "$41k", badge: "Signed" },
];

export function CrmCommandPreview() {
  return (
    <div
      aria-hidden
      className="relative w-full max-w-lg overflow-hidden rounded-sm border border-field/20 bg-forest-deep/70 shadow-[0_30px_80px_rgba(15,42,31,0.45)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-field/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold gold-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-field/70">
            Sales OS · Command
          </span>
        </div>
        <span className="text-[10px] tracking-[0.16em] uppercase text-gold-soft/80">
          Live book
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-field/10 p-3">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="animate-rise bg-field/[0.06] px-2.5 py-2"
            style={{ animationDelay: `${0.08 + index * 0.1}s` }}
          >
            <p className="text-[9px] tracking-[0.14em] uppercase text-field/55">
              {kpi.label}
            </p>
            <p className="display mt-1 text-lg leading-none text-field">{kpi.value}</p>
            <p className="mt-1 text-[8px] tracking-[0.12em] uppercase text-gold-soft/70">
              {kpi.badge}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 p-3">
        {stages.map((stage, index) => (
          <div key={stage.name} className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-1">
              <span className="truncate text-[9px] tracking-[0.1em] uppercase text-field/60">
                {stage.name}
              </span>
              <span className="text-[9px] text-gold-soft">{stage.count}</span>
            </div>
            <div className={`space-y-1.5 rounded-sm p-1.5 ${stage.tone}`}>
              {[0, 1].map((row) => (
                <div
                  key={row}
                  className="h-7 rounded-sm bg-field/90"
                  style={{
                    animation: `pipeline-glide 3.6s ease-in-out ${index * 0.18 + row * 0.35}s infinite alternate`,
                    opacity: 0.85 - row * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-field/10 px-4 py-2.5">
        <span className="text-[10px] text-field/55">Priority · A+ merchants first</span>
        <span className="display text-sm text-gold-soft">Finti Score</span>
      </div>
    </div>
  );
}
