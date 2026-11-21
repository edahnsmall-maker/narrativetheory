# Setting up Narrative Theory

This guide takes the site from "works on my computer" to "live, with sign-in and
memberships." You don't need to be a developer. Set aside about an hour.

You will create accounts with four services:

| Service | What it does | Cost to start |
| --- | --- | --- |
| **Supabase** | Stores accounts, sessions and notebooks; sends sign-in emails | Free tier |
| **Stripe** | Takes membership payments | Per-transaction fee |
| **Anthropic** | Runs the AI guide | Pay per use |
| **Vercel** | Hosts the website | Free tier |

Keep a private note open as you go (a password manager's secure note is ideal).
You'll copy several values into it, then paste them all into Vercel at the end.
Wherever you see `<domain>` below, use your real web address, for example
`narrativetheory.com`.

---

## A. Supabase — accounts and database

1. Go to [supabase.com](https://supabase.com), sign up, and click **New project**.
   Pick a name, a strong database password (save it in your note), and the
   region closest to most of your readers. Wait a minute or two for it to finish.
2. In the left sidebar open **SQL Editor** → **New query**. Open the file
   `supabase/schema.sql` from this project, copy everything in it, paste it into
   the editor, and click **Run**. You should see "Success."
3. Open **Authentication** → **Sign In / Providers** (sometimes called
   **Providers**). Make sure **Email** is enabled. Turn on "magic link" /
   passwordless sign-in if it's shown as a separate switch.
4. Open **Authentication** → **URL Configuration**:
   - **Site URL**: `https://<domain>`
   - **Redirect URLs**: add `https://<domain>/auth/callback`
     (Also add `http://localhost:3000/auth/callback` if you ever want to test
     real sign-in on your own computer.)
5. Optional but recommended: under **Authentication** → **Emails**, edit the
   "Magic Link" template so it sounds like you, and set up custom SMTP (for
   example with Resend or Postmark). Supabase's built-in email sender is only
   meant for testing and sends very few emails per hour.
6. Open **Project Settings** → **API** (or **API Keys**) and copy three values
   into your note:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_ROLE_KEY`
     (Treat this one like a password. Never post it anywhere.)

## B. Stripe — memberships

Tip: Stripe has a **Test mode** switch (top right). Do steps 1–7 in test mode
first, try a purchase with card number `4242 4242 4242 4242`, then repeat them
in live mode and use the live values.

1. Sign up at [stripe.com](https://stripe.com) and complete the business
   details Stripe asks for (needed before you can take real payments).
2. Go to **Product catalog** → **Add product**.
   - Name: **Narrative Theory Membership**
   - Pricing: **Recurring**, **Monthly**, amount **$12** (or your price).
   - Save.
3. Open the product, find the price you just made, and copy its **Price ID**
   (starts with `price_`) → `STRIPE_PRICE_ID`.
4. Go to **Developers** → **API keys**. Copy the **Secret key** (starts with
   `sk_live_` or `sk_test_`) → `STRIPE_SECRET_KEY`.
5. Go to **Developers** → **Webhooks** → **Add endpoint** (or **Add
   destination**).
   - Endpoint URL: `https://<domain>/api/billing/webhook`
   - Events to send — choose exactly these four:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Save.
6. On the endpoint's page, click **Reveal** under **Signing secret** and copy it
   (starts with `whsec_`) → `STRIPE_WEBHOOK_SECRET`.
7. Go to **Settings** → **Billing** → **Customer portal** and click
   **Activate**. Allow customers to update payment methods and to cancel
   subscriptions. For cancellations, choose **At the end of the billing
   period** (this matches what the pricing page promises).

## C. Anthropic — the AI guide

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign up.
2. Under **Billing**, add a payment method and some credit. Consider setting a
   monthly spend limit so there are no surprises.
3. Under **API Keys**, click **Create key**, name it "Narrative Theory site",
   and copy it (starts with `sk-ant-`) → `ANTHROPIC_API_KEY`.

## D. Vercel — putting the site online

1. Put this project in a GitHub repository (a developer friend can do this in
   five minutes if needed).
2. Sign up at [vercel.com](https://vercel.com) with your GitHub account, click
   **Add New** → **Project**, and import the repository. If the project lives in
   a subfolder, set **Root Directory** to `site`.
3. Before clicking Deploy, open **Environment Variables** and add each of these
   (name on the left, value on the right):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<domain>` (no slash at the end) |
   | `NEXT_PUBLIC_PRICE_LABEL` | The price as shown, e.g. `$12` — must match Stripe |
   | `NEXT_PUBLIC_SUPABASE_URL` | From step A6 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From step A6 |
   | `SUPABASE_SERVICE_ROLE_KEY` | From step A6 |
   | `STRIPE_SECRET_KEY` | From step B4 |
   | `STRIPE_PRICE_ID` | From step B3 |
   | `STRIPE_WEBHOOK_SECRET` | From step B6 |
   | `ANTHROPIC_API_KEY` | From step C3 |

   Optional ones — leave them out unless you have a reason:

   | Name | What it does |
   | --- | --- |
   | `NT_SESSION_MODEL` | AI model for guided sessions. Default is `claude-opus-5-5`. Set `claude-sonnet-5-5` to lower costs. |
   | `NT_PROGRAM_MODEL` | AI model for the Program. Default `claude-opus-5-5`. |
   | `NT_FALLBACK_MODEL` | Model used if the main one is busy. Default `claude-opus-4-8`. |
   | `NT_PRACTICE_AI` | Set to `1` to switch the guide to scripted practice mode (no AI cost) — useful for demos. |

4. Click **Deploy**. When it finishes, go to **Settings** → **Domains** and
   add your domain; Vercel shows the DNS records to set at your domain
   registrar.
5. If you change any environment variable later, go to **Deployments**, open
   the latest one, and click **Redeploy** — changes only take effect after a
   redeploy.

### Check that it works

1. Visit `https://<domain>/signin`, enter your email, and click the link that
   arrives. You should land on your account page.
2. Click **Become a member** and pay (use the `4242…` test card while Stripe is
   in test mode). You should come back to a thank-you message and see your plan
   as **Member**. If the plan still says Free after a minute, check
   Stripe → Developers → Webhooks → your endpoint for failed deliveries; a
   wrong `STRIPE_WEBHOOK_SECRET` is the usual cause.
3. Click **Manage billing** — Stripe's portal should open.

## E. Working on your own computer (no accounts needed)

You can run the whole site locally without setting up anything above:

```
npm install
npm run dev
```

Then open http://localhost:3000. With no keys set:

- **Sign-in** is a development sign-in: type any email and you're in. No email
  is sent. Accounts, sessions and notebooks are saved to `.data/dev-store.json`
  on your computer.
- **Billing** is simulated: "Become a member" instantly makes you a member for
  30 days, and "Manage billing" switches you back to Free. No card, no Stripe.
- **The AI guide** runs in practice mode with scripted replies, so you can click
  through every screen without spending anything.

To try any real service locally, copy `.env.local.example` to `.env.local` and
fill in just the values for that service. Each service switches on by itself:
the AI needs only `ANTHROPIC_API_KEY`; real sign-in needs the three Supabase
values; real billing needs `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` (and, for
webhooks to reach your computer, the Stripe CLI: `stripe listen --forward-to
localhost:3000/api/billing/webhook`, which prints a `whsec_` secret to use as
`STRIPE_WEBHOOK_SECRET`). Restart `npm run dev` after editing `.env.local`.

## Mode stories (Mode Field Guide)

Readers can share stories of a mode on each Field Guide page. Stories are private until you approve them.

- Set `NT_ADMIN_EMAILS` to your email address (comma-separate several) in the hosting environment's settings. That makes `/studio/stories` and the Studio work for you and nobody else.
- Review stories at `/studio/stories`: Approve shows a story on its mode page (without a name), Hide keeps it off.
- If you already ran `supabase/schema.sql` before this feature existed, run it again. It only adds the new `mode_stories` table and leaves everything else alone.
