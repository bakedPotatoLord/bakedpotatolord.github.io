import { serverQueryContent } from '#content/server'
import type { ImageEntry } from '@nuxtjs/sitemap'

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find())
  return contentList
    .filter(c => c?.titleUrl && c?.inProgress == "false")
    .map((c) => {
      let images: ImageEntry[] = c?.images?.map((loc:string)=>({loc})) ?? []
      images.push({loc:c?.coverImg,caption:c?.coverImgAlt})
      return asSitemapUrl({
        loc: `/blog/${c?.titleUrl}`,
        lastmod: new Date(c.dateEdited),
        images,
      })
    })
})
