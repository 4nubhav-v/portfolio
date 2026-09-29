import React, { useLayoutEffect, useRef, useState, useCallback } from "react";

const DEFAULTS = { nodeOffset: 90, arrowLength: 70, arrowSpreadDeg: 32 };

function computeNodeGeometry(node, rects, nodeOffset, arrowLength, arrowSpreadDeg) {
  const [idA, idB] = node.connectsTo;
  const rA = rects[idA];
  const rB = rects[idB];
  if (!rA || !rB) return null;

  const isLeft = node.side === "left";
  const edgeXA = isLeft ? rA.left : rA.right;
  const edgeXB = isLeft ? rB.left : rB.right;
  const nodeX = isLeft ? edgeXA - nodeOffset : edgeXA + nodeOffset;
  const yA = rA.top + rA.height / 2;
  const yB = rB.top + rB.height / 2;
  const nodeY = (yA + yB) / 2;

  const pathD = [
    `M ${edgeXA} ${yA}`,
    `L ${nodeX} ${yA}`,
    `L ${nodeX} ${yB}`,
    `L ${edgeXB} ${yB}`,
  ].join(" ");

  const spread = (arrowSpreadDeg * Math.PI) / 180;
  const baseAngle = (isLeft ? 180 : 0) * (Math.PI / 180);

  const arrows = node.projects.map((proj, i) => {
    const dir = i === 0 ? -1 : 1;
    const angle = baseAngle + dir * spread;
    return {
      id: proj.id,
      x2: nodeX + Math.cos(angle) * arrowLength,
      y2: nodeY + Math.sin(angle) * arrowLength,
    };
  });

  return { pathD, nodeX, nodeY, arrows };
}

function EducationTimeline({
  heading,
  entries,
  nodes,
  className,
  nodeOffset = DEFAULTS.nodeOffset,
  arrowLength = DEFAULTS.arrowLength,
  arrowSpreadDeg = DEFAULTS.arrowSpreadDeg,
}) {
  const containerRef = useRef(null);
  const boxRefs = useRef(new Map());
  const [rects, setRects] = useState({});
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const next = {};
    boxRefs.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      next[id] = {
        top: r.top - containerRect.top,
        bottom: r.bottom - containerRect.top,
        left: r.left - containerRect.left,
        right: r.right - containerRect.left,
        height: r.height,
      };
    });
    setRects(next);
    setContainerSize({ width: containerRect.width, height: containerRect.height });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    boxRefs.current.forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [entries, measure]);

  const registerBox = useCallback(
    (id) => (el) => {
      if (el) boxRefs.current.set(id, el);
      else boxRefs.current.delete(id);
    },
    []
  );

  return (
    <div ref={containerRef} className={`relative w-full text-white ${className ?? ""}`}>
      <style>{`
        @keyframes education-timeline-dash { to { stroke-dashoffset: -20; } }
        .education-timeline-dash { animation: education-timeline-dash 1.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .education-timeline-dash { animation: none; } }
      `}</style>

      <h2 className="text-center text-3xl font-light tracking-tight mb-14">{heading}</h2>

      <div className="relative flex justify-center">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          {entries.map((entry) => (
            <div
              key={entry.id}
              ref={registerBox(entry.id)}
              className="border border-white/70 px-6 py-5 min-h-[110px] flex flex-col justify-center"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium">{entry.title}</h3>
                {entry.period && (
                  <span className="text-sm text-white/50 whitespace-nowrap">{entry.period}</span>
                )}
              </div>
              {entry.subtitle && <p className="text-sm text-white/70 mt-1">{entry.subtitle}</p>}
              {entry.description && (
                <p className="text-sm text-white/50 mt-2 leading-relaxed">{entry.description}</p>
              )}
            </div>
          ))}
        </div>

        {containerSize.width > 0 && (
          <svg
            className="absolute inset-0 overflow-visible pointer-events-none"
            width={containerSize.width}
            height={containerSize.height}
          >
            <defs>
              <marker id="et-arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8" fill="none" stroke="white" strokeWidth="1.4" />
              </marker>
            </defs>

            {nodes.map((node) => {
              const geo = computeNodeGeometry(node, rects, nodeOffset, arrowLength, arrowSpreadDeg);
              if (!geo) return null;
              const { pathD, nodeX, nodeY, arrows } = geo;
              return (
                <g key={node.id}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="white"
                    strokeOpacity={0.55}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    className="education-timeline-dash"
                  />
                  <circle cx={nodeX} cy={nodeY} r={3.5} fill="white" />
                  {arrows.map((a) => (
                    <line
                      key={a.id}
                      x1={nodeX}
                      y1={nodeY}
                      x2={a.x2}
                      y2={a.y2}
                      stroke="white"
                      strokeWidth={1.2}
                      markerEnd="url(#et-arrowhead)"
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        )}

        {nodes.map((node) => {
          const geo = computeNodeGeometry(node, rects, nodeOffset, arrowLength, arrowSpreadDeg);
          if (!geo) return null;
          const isLeft = node.side === "left";
          return geo.arrows.map((arrow) => {
            const proj = node.projects.find((p) => p.id === arrow.id);
            const Tag = proj.href ? "a" : "button";
            return (
              <Tag
                key={proj.id}
                href={proj.href}
                onClick={proj.onClick}
                className="absolute text-xs text-white/80 hover:text-white transition-colors whitespace-nowrap"
                style={{
                  left: arrow.x2,
                  top: arrow.y2,
                  transform: isLeft ? "translate(-100%, -50%)" : "translate(4px, -50%)",
                }}
              >
                {proj.label}
              </Tag>
            );
          });
        })}
      </div>
    </div>
  );
}

// ---- Demo data (swap with your real education + project entries) ----
const entries = [
  {
    id: "edu-1",
    title: "B.Tech, Computer Science",
    period: "2022 — 2026",
    subtitle: "University of North Bengal",
    description: "Core coursework in data structures, OS, and networks.",
  },
  {
    id: "edu-2",
    title: "Higher Secondary",
    period: "2020 — 2022",
    subtitle: "St James School",
    description: "Science stream, focused on math and computing.",
  },
  {
    id: "edu-3",
    title: "Self-taught: Backend & Systems",
    period: "2024 — Present",
    subtitle: "MERN stack, ongoing",
    description: "Learning Express, auth, and API design hands-on.",
  },
];

const nodes = [
  {
    id: "node-right",
    side: "right",
    connectsTo: ["edu-1", "edu-2"],
    projects: [
      { id: "proj-a", label: "URL Shortener SaaS", href: "#" },
      { id: "proj-b", label: "Portfolio Site", href: "#" },
    ],
  },
  {
    id: "node-left",
    side: "left",
    connectsTo: ["edu-2", "edu-3"],
    projects: [
      { id: "proj-c", label: "Forensic Analysis App", href: "#" },
      { id: "proj-d", label: "API Key Gateway", href: "#" },
    ],
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-12">
      <div className="w-full max-w-3xl">
        <EducationTimeline heading="Education" entries={entries} nodes={nodes} />
      </div>
    </div>
  );
}
