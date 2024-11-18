
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



export const getToolUrl = (tool: tool) => {
  return toolMap.get(tool) 
}