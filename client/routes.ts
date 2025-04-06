import { Sidebar, SidebarItem } from "vocs";

const config: Sidebar = [
  {
    text: "Introduction",
    link: "/",
  },
  {
    text: "ByteBeasts Vision",
    link: "/ByteBeastsVision/vision",
  },
  {
    text: "Problem",
    link: "/Problem/problem",
  },
  {
    text: "Solution",
    link: "/Solution/solution",
  },
  {
    text: "Business Model",
    link: "/BusinessModel/business-model",
  },
  {
    text: "Market Competition",
    link: "/MarketCompetition/market-competition",
  },
  {
    text: "Differentiation",
    link: "/Differentiation/differentiation",
  },
  {
    text: "Market Size",
    link: "/MarketSize/market-size",
  },
  {
    text: "Product Vision",
    link: "/ProductVision/product-vision",
  },
  {
    text: "Traction",
    link: "/Traction/traction",
  },
  {
    text: "Founding",
    link: "/Founding/founding",
  },
  {
    text: "Roadmap",
    link: "/Roadmap/roadmap",
  },
];

/**
 * Gets all top-level routes from the sidebar config
 * @param sidebar
 * @returns Array of route paths and their corresponding section names
 */
const getTopLevelRoutes = (sidebar: SidebarItem[]): Array<[string, string]> =>
  sidebar
    .filter((item) => item.text !== "Introduction") // Skip Introduction
    .map((item) => {
      // Convert the text to a URL-friendly format and get the first link if available
      const path =
        item.link || `/${item.text.toLowerCase().replace(/\s+/g, "-")}`;
      return [path.split("/")[1], item.text] as [string, string];
    });

/**
 * Generates a complete sidebar configuration with automatic route-based collapsing
 * @param sidebar
 * @returns Complete sidebar configuration object with route-specific collapsed states
 */
const generateSidebarConfig = (sidebar: SidebarItem[]): Sidebar => {
  // Initialize with the default route
  const config: Sidebar = {
    "/": sidebar,
  };

  // Configure for all top-level routes
  getTopLevelRoutes(sidebar).forEach(([route, sectionName]) => {
    config[`/${route}`] = sidebarFocusOn(sidebar, sectionName, true);
  });

  return config;
};

/**
 * Recursively modifies the sidebar structure to control which sections are collapsed
 * @param sidebar - The original sidebar configuration array
 * @param target - The section text to keep expanded (uncollapsed)
 * @param closeOther - Whether to force collapse all non-target sections
 * @returns Modified sidebar array with controlled collapsed states
 */
const sidebarFocusOn = (
  sidebar: SidebarItem[],
  target: string,
  closeOther: boolean = false
): SidebarItem[] =>
  sidebar.map((item) =>
    item.items && item.items.length > 0
      ? {
          ...item,
          collapsed: closeOther ? true : item.collapsed,
          items: sidebarFocusOn(item.items, target, closeOther),
        }
      : {
          ...item,
          collapsed: item.text === target ? item.collapsed : true,
        }
  );

export const routes = generateSidebarConfig(config);
