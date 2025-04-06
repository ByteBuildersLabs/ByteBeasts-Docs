import { defineConfig } from "vocs";
import { routes } from "./routes";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Shiki currently does not support cairo
// We temporarily use shiki fine grained bundle with custom cairo grammar
// This require custom highlighter, and patch of vocs to remove initial shiki instance

export default defineConfig({
  iconUrl: "/svg/lighticon.png",
  // iconUrl: {
  //   light: "/svg/Icon_Light.svg",
  //   dark: "/svg/Icon_Dark.svg",
  // },
  logoUrl: {
    light: "/svg/horizontaldarklogo.png",
    dark: "/svg/horizontallightlogo.png",
    
  },
  title: "Dojo by Example",
  rootDir: ".",
  sidebar: routes,
  editLink: {
    text: "Website",
    pattern:
      "",
  },
  socials: [
    {
      icon: "github",
      link: "https://github.com/ByteBuildersLabs",
    },
    {
      icon: "x",
      link: "https://x.com/0xByteBeasts",
    },
  ],
  sponsors: [
    {
      name: "Powered by",
      height: 60,
      items: [
        [
          {
            name: "Cartridge",
            link: "https://docs.cartridge.gg/",
            image: "/collaborators/Cartridge.svg",
          },
        ],
        [
          {
            name: "Starknet",
            link: "https://www.starknet.io",
            image: "/collaborators/Starknet.svg",
          },
          {
            name: "Dojo",
            link: "https://book.dojoengine.org/",
            image: "/collaborators/DojoLogo.svg",
          },
        ],
      ],
    },
  ],
  // Theme configuration
  theme: {
    accentColor: {
      dark: "#FFF6F0",
      light: "#1C1C1C",
    },
    variables: {
      color: {
        textAccent: {
          dark: "#FFF6F0",  // Same colors as accentColor
          light: "#1C1C1C",
        }
      }
    }
  },
  font: {
    google: "DM Sans",
  },
  markdown: {
    code: {
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          strict: false,
          displayMode: false,
          output: "mathml",
        },
      ],
    ],
  },
});
