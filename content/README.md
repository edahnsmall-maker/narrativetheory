# Writing

Everything on the site's **Writing** page comes from the files in this folder.

- `notes/` short thoughts. One file per note.
- `essays/` longer pieces.

A file is just text with a few lines at the top:

```
---
title: Letting Go
date: 2026-05-24
tags: zen, meditation
summary: One line that shows on the Writing page.
draft: true
---

The writing goes here. Blank line between paragraphs.

## A heading

**bold**, *italic*, [a link](https://example.com), > a quote, - a list.
```

Notes don't need a title or summary, just a date and the text.

`draft: true` keeps it off the live site. You can still see drafts when you run the site on your computer, or on the live site by adding `?drafts=1` to the address. Delete that line (or set it to `false`) to publish.

## Adding something

**From Claude:** say something like "add this as a note on the site" and paste it, or "turn this into an essay draft." Claude writes the file here, and once it's committed and pushed, the site updates itself.

**From the command line** (in the `site` folder):

```
npm run note -- "There are no hard lines. It's all a matter of convenience."
npm run essay -- "Letting Go"
```

The first makes a note with today's date. The second makes an empty essay draft to fill in.

**By hand:** copy any file in here, rename it `YYYY-MM-DD-some-name.md`, and edit it.
