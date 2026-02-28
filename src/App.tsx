import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DEMO_REGISTRY } from '@/demos/demo-registry';
import { computeCoverage } from '@/demos/demo-schema';

export function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCoverage, setShowCoverage] = useState(false);

  const active = DEMO_REGISTRY[activeIdx];
  const ActiveDemo = active.component;
  const coverage = useMemo(() => computeCoverage(DEMO_REGISTRY), []);

  return (
    <div className="flex h-screen flex-col">
      {/* Demo switcher */}
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border-subtle bg-surface-raised px-4">
        <span className="mr-3 text-xs font-semibold text-fg-subtle">
          Strata
        </span>
        {DEMO_REGISTRY.map((demo, idx) => (
          <button
            key={demo.id}
            onClick={() => setActiveIdx(idx)}
            className={cn(
              'rounded-md px-3 py-1 text-xs font-medium transition-colors',
              activeIdx === idx
                ? 'bg-interactive-subtle text-interactive'
                : 'text-fg-muted hover:text-fg-default',
            )}
          >
            {demo.label}
          </button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Coverage toggle */}
        <button
          onClick={() => setShowCoverage((v) => !v)}
          className={cn(
            'rounded-md px-2 py-1 text-[10px] font-mono transition-colors',
            showCoverage
              ? 'bg-interactive-subtle text-interactive'
              : 'text-fg-subtle hover:text-fg-default',
          )}
        >
          {coverage.percentage}% covered
        </button>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Demo viewport */}
        <div className="flex-1 overflow-hidden">
          <ActiveDemo />
        </div>

        {/* Coverage side panel */}
        {showCoverage && (
          <div className="w-72 shrink-0 overflow-y-auto border-l border-border-subtle bg-surface-raised p-3">
            {/* Active demo info */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-fg-default">
                {active.label}
              </p>
              <p className="mt-0.5 text-[10px] text-fg-muted">
                {active.description}
              </p>
              <p className="mt-1 text-[10px] text-fg-subtle">
                Layout: {active.layout}
              </p>
            </div>

            {/* Components used by active demo */}
            <div className="mb-3 border-t border-border-subtle pt-2">
              <p className="mb-1 text-[10px] font-semibold text-fg-muted">
                Components used
              </p>
              {(
                ['primitives', 'layout', 'disclosure', 'feedback'] as const
              ).map(
                (cat) =>
                  active.components[cat].length > 0 && (
                    <div key={cat} className="mb-1.5">
                      <p className="text-[10px] font-medium text-fg-subtle capitalize">
                        {cat}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {active.components[cat].map((name) => (
                          <span
                            key={name}
                            className="rounded bg-interactive-subtle px-1.5 py-0.5 text-[10px] text-interactive"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>

            {/* Global coverage */}
            <div className="border-t border-border-subtle pt-2">
              <p className="mb-1 text-[10px] font-semibold text-fg-muted">
                Uncovered ({coverage.uncovered.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {coverage.uncovered.map((name) => (
                  <span
                    key={name}
                    className="rounded bg-danger-subtle px-1.5 py-0.5 text-[10px] text-danger"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
