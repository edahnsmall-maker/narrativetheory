# Archived: home page v1 (static sections)

Snapshot taken before migrating to the "Construction" scrollytelling home page
(see `New_Home_Scrollytelling_Spec_1.md`). This is not a live route — it's a
plain backup so the pre-scrollytelling home page and its four diagrams can be
restored or compared without digging through git history.

- `page.tsx` — the home page as it rendered immediately before the rewrite.
- `components/` — the four diagram components (StateField, StoryPoints,
  BodyMatrix, ModeSpotlight) as they existed at the same moment, since the
  live versions get edited during the migration to the Theory page.

To restore: copy `page.tsx` back to `app/page.tsx` and the components back to
`components/nt/`, adjusting imports if the live versions have since diverged.

Also tagged in git as `home-v1-static` at the commit just before this change.
