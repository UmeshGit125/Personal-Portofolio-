import { blog } from '../data'
import { Heading, SectionHead, externalProps } from './Rich'

export default function Blog() {
  if (!blog.show) return null

  return (
    <section id="blog" className="section section--alt">
      <div className="container">
        <SectionHead num="04" label="Writing" />
        <div className="split-head">
          <Heading lines={blog.heading} />
          <a href={blog.allPostsUrl} {...externalProps(blog.allPostsUrl)} className="text-link">
            View all posts →
          </a>
        </div>

        <div className="post-grid">
          {blog.posts.map((post, i) => (
            <a key={post.title} href={post.url} {...externalProps(post.url)} className="post">
              {i === 0 && <div className="accent-bar" />}
              <div className="post-top">
                <span className="tag tag--accent">{post.category}</span>
                {i === 0 && <span>Latest</span>}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="tags">
                {post.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="post-foot">
                <div>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <span>Read →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
