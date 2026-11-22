import Link from 'next/link'
import { KINDS, postHref, relatedPosts, tagSlug, type Post } from '@/lib/writing'

/** Tags (linking to the filtered Writing page) and a few related pieces. */
export function PostFooter({ post, drafts }: { post: Post; drafts: boolean }) {
  const related = relatedPosts(post, drafts)
  return (
    <div className="mt-14 border-t pt-6">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t} href={`/writing?tag=${tagSlug(t)}`} className="chip hover:text-foreground">
              {t}
            </Link>
          ))}
        </div>
      )}
      {related.length > 0 && (
        <div className="mt-10">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">More like this</div>
          <ul className="divide-y border-y">
            {related.map((r) => (
              <li key={r.kind + r.slug}>
                <Link href={postHref(r)} className="group flex items-baseline gap-4 py-3.5">
                  <span className="w-16 shrink-0 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {KINDS.find((k) => k.kind === r.kind)?.one}
                  </span>
                  <span className="group-hover:underline underline-offset-4 line-clamp-2">
                    {r.title || r.body.replace(/[*_>#]/g, '').slice(0, 120) + (r.body.length > 120 ? '…' : '')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
