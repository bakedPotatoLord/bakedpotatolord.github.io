
export enum tool {
  Vue,
  Nuxt,
  TypeScript,
  Vite,
  Bun,
  Java,
  Onshape,
  Vcarve,
  WPILib,
  rasPi,
  GSheets,
}

const toolMap = new Map<tool, string>([
  [tool.Nuxt, "/images/icons/nuxt-icon.svg"],
  [tool.Vue, "/images/icons/vue.webp"],
  [tool.TypeScript, "/images/icons/typescript.png"],
  [tool.Vite, "/images/icons/vite.svg"],
  [tool.Bun, "/images/icons/bun.png"],
  [tool.Java, "/images/icons/java.png"],
  [tool.Onshape, "/images/icons/onshape-logo.svg"],
  [tool.Vcarve, "/images/icons/vcarve.svg"],
  [tool.WPILib, "/images/icons/wpi.png"],
  [tool.rasPi, "/images/icons/raspberry-pi-icon.png"],
  [tool.GSheets, "/images/icons/sheetsLogo.png"],
])

const altMap = new Map<tool, string>([
  [tool.Nuxt, "Nuxt.js"],
  [tool.Vue, "Vue.js"],
  [tool.TypeScript, "TypeScript"],
  [tool.Vite, "Vite"],
  [tool.Bun, "Bun"],
  [tool.Java, "Java"],
  [tool.Onshape, "Onshape"],
  [tool.Vcarve, "Vcarve"],
  [tool.WPILib, "WPILib"],
  [tool.rasPi, "Raspberry Pi"],
  [tool.GSheets, "Google Sheets"],
])


export const getToolUrl = (tool: tool) => {
  return toolMap.get(tool) 
}

export const getToolAlt = (tool: tool) => {
  return altMap.get(tool) || "unlabeled tool"
}