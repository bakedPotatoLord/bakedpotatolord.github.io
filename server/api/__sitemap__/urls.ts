import { serverQueryContent } from '#content/server'

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find())
  return contentList
    .filter(c => c?.titleUrl && c?.inProgress == "false")
    .map((c) => {
      return asSitemapUrl({
        loc: `/blog/${c?.titleUrl}`,
        lastmod: new Date(c.dateEdited),
      })
    })
})
