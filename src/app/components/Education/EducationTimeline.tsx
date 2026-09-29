import React, { useLayoutEffect, useRef, useState, useCallback } from "react";

/**
 * EducationTimeline
 * ------------------
 * Renders a vertical stack of entry boxes (e.g. education history) with
 * "branch nodes" on the left/right that connect two adjacent boxes via an
 * animated dashed elbow connector, then fan out into arrows pointing at
 * related project links.
 *
 * Layout is measured at runtime (via getBoundingClientRect + ResizeObserver),
 * so connector paths stay correct if box content/height changes, the window
 * resizes, or fonts load asynchronously.
 */

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
}

export interface ProjectLink {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BranchNode {
  id: string;
  side: "left" | "right";
  /** IDs of the two entries this node's connector spans between (order doesn't matter). */
  connectsTo: [string, string];
  /** Exactly two project links, rendered as two diverging arrows. */
  projects: [ProjectLink, ProjectLink];
}

export interface EducationTimelineProps {
  heading: string;
  entries: TimelineEntry[];
  nodes: BranchNode[];
  className?: string;
  /** Horizontal distance (px) from the box edge to the branch node dot. Default 90. */
  nodeOffset?: number;
  /** Length (px) of each arrow from the node dot. Default 70. */
  arrowLength?: number;
  /** Half-angle (deg) between the two arrows at a node, measured from the horizontal axis. Default 32. */
  arrowSpreadDeg?: number;
}

interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
}

const DEFAULTS = {
  nodeOffset: 90,
  arrowLength: 70,
  arrowSpreadDeg: 32,
};

export default function EducationTimeline({
  heading,
  entries,
  nodes,
  className,
  nodeOffset = DEFAULTS.nodeOffset,
  arrowLength = DEFAULTS.arrowLength,
  arrowSpreadDeg = DEFAULTS.arrowSpreadDeg,
}: EducationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [rects, setRects] = useState<Record<string, Rect>>({});
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const next: Record<string, Rect> = {};
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
    setContainerSize({
      width: containerRect.width,
      height: containerRect.height,
    });
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
    // Re-run when the set of entries changes (boxes mounted/unmounted).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, measure]);

  const registerBox = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) boxRefs.current.set(id, el);
      else boxRefs.current.delete(id);
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full text-white ${className ?? ""}`}
    >
      <style>{`
        @keyframes education-timeline-dash {
          to { stroke-dashoffset: -20; }
        }
        .education-timeline-dash {
          animation: education-timeline-dash 1.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .education-timeline-dash { animation: none; }
        }
      `}</style>

      <h2 className="mb-14 text-center text-3xl font-light tracking-tight">
        {heading}
      </h2>

      <div className="relative flex justify-center">
        <div className="flex w-full max-w-xl flex-col gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              ref={registerBox(entry.id)}
              className="flex min-h-27.5 flex-col justify-center border border-white/70 px-6 py-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium">{entry.title}</h3>
                {entry.period && (
                  <span className="text-sm whitespace-nowrap text-white/50">
                    {entry.period}
                  </span>
                )}
              </div>
              {entry.subtitle && (
                <p className="mt-1 text-sm text-white/70">{entry.subtitle}</p>
              )}
              {entry.description && (
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {containerSize.width > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={containerSize.width}
            height={containerSize.height}
          >
            <defs>
              <marker
                id="et-arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path
                  d="M0,0 L8,4 L0,8"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.4"
                />
              </marker>
            </defs>

            {nodes.map((node) => {
              const geo = computeNodeGeometry(
                node,
                rects,
                nodeOffset,
                arrowLength,
                arrowSpreadDeg,
              );
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
                  {arrows.map(({ id, x2, y2 }) => (
                    <line
                      key={id}
                      x1={nodeX}
                      y1={nodeY}
                      x2={x2}
                      y2={y2}
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
          const geo = computeNodeGeometry(
            node,
            rects,
            nodeOffset,
            arrowLength,
            arrowSpreadDeg,
          );
          if (!geo) return null;
          const isLeft = node.side === "left";

          return geo.arrows.map((arrow) => {
            const proj = node.projects.find((p) => p.id === arrow.id)!;
            const Tag = proj.href ? "a" : "button";
            return (
              <Tag
                key={proj.id}
                href={proj.href}
                onClick={proj.onClick}
                className="absolute text-xs whitespace-nowrap text-white/80 transition-colors hover:text-white"
                style={{
                  left: arrow.x2,
                  top: arrow.y2,
                  transform: isLeft
                    ? "translate(-100%, -50%)"
                    : "translate(4px, -50%)",
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

function computeNodeGeometry(
  node: BranchNode,
  rects: Record<string, Rect>,
  nodeOffset: number,
  arrowLength: number,
  arrowSpreadDeg: number,
) {
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
