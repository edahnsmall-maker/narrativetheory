import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // There's a stray package-lock.json in the user folder; without this, Turbopack
  // treats the whole user folder as the project root and dev chunks fail to load.
  turbopack: { root: path.resolve(process.cwd()) },
  outputFileTracingRoot: path.resolve(process.cwd()),
  // Old edahnsmall.com (Squarespace) addresses, so existing links keep working.
  async redirects() {
    const posts: [string, string][] = [
      ['2025/5/13/ja50bin9jlzn2urxerzb2rq7t725ly', '/theory'],
      ['2024/3/19/vectors-desire-and-intimacy', '/writing/2024-03-19-vectors-desire-and-intimacy'],
      ['2023/7/3/2-what-do-we-mean-by-narrative', '/writing/2023-07-03-what-do-we-mean-by-narrative'],
      ['2023/7/3/1-getting-started-what-is-narrative-theory', '/writing/2023-07-03-what-is-narrative-theory'],
      ['2023/4/21/our-default-narrative-style', '/writing/2023-04-21-our-default-narrative-style'],
      ['2023/4/8/practical-nt-easy-examples', '/writing/2023-04-08-energy-states'],
      ['2023/4/8/meta-narrative-theory', '/writing/2023-04-08-meta-narrative-theory'],
      ['2023/4/8/wild-hunches', '/writing/2023-04-08-wild-hunches'],
      ['2023/4/4/is-therapy-broken', '/writing/2023-04-04-is-therapy-broken'],
      ['2023/3/27/nt-overview', '/writing/2023-03-27-an-overview-of-narrative-theory'],
      ['2023/3/27/nt-background', '/writing/2023-03-27-the-story-of-narrative-theory'],
      ['2023/2/23/on-karma-amp-conflict', '/writing/2023-02-23-on-karma-and-conflict'],
      ['2022/12/23/how-do-i-do-zen-meditation', '/writing/2022-12-23-how-do-i-meditate'],
    ]
    return [
      ...posts.map(([from, to]) => ({ source: `/blog/${from}`, destination: to, permanent: true })),
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:rest*', destination: '/writing', permanent: true },
      { source: '/narrative-theory', destination: '/theory', permanent: true },
      { source: '/contact-wells', destination: '/contact', permanent: true },
      { source: '/projects', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
