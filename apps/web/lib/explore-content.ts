// apps/web/lib/explore-content.ts

export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const EXPLORE_ITEMS: ExploreItem[] = [
  {
    id: "prototype-lab",
    title: "Prototype Lab",
    description:
      "A digital twin sandbox — run live simulations, watch stress and thermal data update in real time.",
    image: "/img/prototype.jpg",
    href: "/dashboard/prototypes",
  },
  {
    id: "research-library",
    title: "Research Library",
    description:
      "AI reads your papers and CAD files, extracting parameters and data so nothing stays buried in a PDF.",
    image: "/img/research.jpg",
    href: "/dashboard/research",
  },
  {
    id: "simulation",
    title: "Live Simulation",
    description:
      "Parameters, live telemetry, and export controls in one screen — see it working, not just described.",
    image: "/img/simulation.jpg",
    href: "/dashboard/prototypes",
  },
];