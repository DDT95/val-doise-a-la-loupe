"use client";
import { useLayoutEffect, useRef } from "react";

// All three branches are rays from the same centre. Distinct rays cannot cross.
export function PortraitConnectors({ revision }: { revision: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    const workspace = svg?.closest(".workspace");
    if (!svg || !workspace) return;
    const update = () => {
      const stage = workspace.getBoundingClientRect();
      const focus = workspace.querySelector(".focus")?.getBoundingClientRect();
      if (!focus) return;
      svg.setAttribute("viewBox", `0 0 ${stage.width} ${stage.height}`);
      const x = focus.left + focus.width / 2 - stage.left;
      const y = focus.top + focus.height / 2 - stage.top;
      const radius = focus.width / 2 + 3;
      ["left", "right", "bottom"].forEach((arm, index) => {
        const path = svg.children[index];
        const card = workspace.querySelector(`.orbit-${arm}`)?.getBoundingClientRect();
        if (!card) { path.setAttribute("d", ""); return; }
        const dx = card.left + card.width / 2 - stage.left - x;
        const dy = card.top + card.height / 2 - stage.top - y;
        const distance = Math.hypot(dx, dy);
        // Stop at the first edge of the actual rendered card, on any viewport.
        const edge = Math.min(dx ? card.width / 2 / Math.abs(dx) : Infinity,
          dy ? card.height / 2 / Math.abs(dy) : Infinity);
        const end = 1 - edge;
        if (distance * end <= radius) { path.setAttribute("d", ""); return; }
        path.setAttribute("d", `M${x + dx * radius / distance} ${y + dy * radius / distance} L${x + dx * end} ${y + dy * end}`);
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(workspace);
    workspace.querySelectorAll(".orbit-arm,.focus").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [revision]);
  return <svg ref={ref} className="connectors" preserveAspectRatio="none" aria-hidden="true"><path/><path/><path/></svg>;
}
