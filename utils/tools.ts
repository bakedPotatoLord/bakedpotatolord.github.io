
const toolLib : [string,string,string,string][] = [
  ["Vue", "/images/icons/vue.webp","Vue.js","https://vuejs.org/"],
  ["Nuxt", "/images/icons/nuxt-icon.svg","Nuxt.js","https://nuxt.com/"],
  ["TypeScript", "/images/icons/typescript.png","TypeScript","https://www.typescriptlang.org/"],
  ["JavaScript", "/images/icons/javascript.png","JavaScript","https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
  ["NPM", "/images/icons/npm.png","NPM","https://www.npmjs.com/"],
  ["Vite", "/images/icons/vite.svg","Vite","https://vitejs.dev/"],
  ["Bun", "/images/icons/bun.png","Bun","https://bun.sh/"],
  ["Java", "/images/icons/java.png","Java","https://www.java.com/"],
  ["Onshape", "/images/icons/onshape-logo.svg","Onshape","https://www.onshape.com/"],
  ["Vcarve", "/images/icons/vcarve.svg","Vcarve","https://vcarve.com/"],
  ["WPILib", "/images/icons/wpi.png","WPILib","https://www.wpilib.org/"],
  ["rasPi", "/images/icons/raspberry-pi-icon.png","Raspberry Pi","https://www.raspberrypi.org/"],
  ["GSheets", "/images/icons/sheetsLogo.png","Google Sheets","https://docs.google.com/spreadsheets/"],
  ["Milling", "/images/icons/milling.svg","Milling","https://en.wikipedia.org/wiki/Milling"],
  ["Electronics", "/images/icons/electronics.svg","Electronics","https://en.wikipedia.org/wiki/Electronics"],
  ["Kicad", "/images/icons/kicad.png","KiCad","https://www.kicad.org/"],
] as const

export type tool  = typeof toolLib[number][0]

const toolMap = new Map<tool, string>(toolLib.map(tool => [tool[0] as tool,tool[1]]))
const altMap = new Map<tool, string>(toolLib.map(tool => [tool[0],tool[2]]))
const linkMap = new Map<tool, string>(toolLib.map(tool => [tool[0],tool[3]]))

export const getToolImage = (tool: tool) => {
  return toolMap.get(tool) 
}

export const getToolAlt = (tool: tool) => {
  return altMap.get(tool) || "unlabeled tool"
}

export const getToolLink = (tool: tool) => {
  return linkMap.get(tool) 
}