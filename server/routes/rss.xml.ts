import RSS from 'rss'
import { serverQueryContent } from '#content/server'
export default defineEventHandler(async (event) => {
    const siteUrl = (useRuntimeConfig().public.siteUrl ?? "www.potatolord.win") as string
    // Since I have trailing slashes in my URL, I will remove it
  
    const feed = new RSS({
        title: 'Potato Blog',
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss.xml`,
        description: `A blog on Technology, Theology, and Liberty by Josiah Hamm`,
    });
    const docs = await serverQueryContent(event)
        .sort({ datePublished: -1 })
        .where({ inProgress: { $eq: "false" } })
        .find()
    // Filter out the blog posts.
    const posts = docs.filter((doc) => true)
    for (const post of posts) {
        feed.item({
            title: post.title ?? '-',
            url: `${siteUrl}/${post.titleUrl}`,
            date: new Date(post.datePublished),
            description: post.description,
            author: post.author ?? "Josiah Hamm",
        })
    }
    const feedString = feed.xml({ indent: true })
    event.res.setHeader('content-type', 'text/xml')
    event.res.end(feedString)
})