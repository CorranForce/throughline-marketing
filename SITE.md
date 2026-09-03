# Your site

This is the team's website. It's a [TanStack Start](https://tanstack.com/start)
app (React + Vite + Tailwind), served on **port 3000**. It starts life as a simple
"coming soon" placeholder (the headline reads the business name from `site.json` at
request time), but it's a real full-stack framework — build it out into the real
site and grow it into a dynamic app without changing hosting or starting a second
server.

## Layout

```
src/
  routes/
    __root.tsx     # the HTML shell: <head>, fonts, global layout
    index.tsx      # the landing page ("/")
  styles/app.css   # Tailwind entrypoint + base styles
vite.config.ts     # serves on 0.0.0.0:3000
```

Add a page by creating a new file under `src/routes/` — e.g. `about.tsx` becomes
`/about`. Files are routes; the router is generated automatically.

## Serving and shipping

How this site is served and how changes go live **depends on the team's setup**:
your system prompt's **Website** section is the authority — follow it, not this
file. The `package.json` scripts (`publish`, `go-live`) exist for setups whose
Website section tells you to run them; don't run them otherwise. Server logs live
in `.run/`.

## Making it dynamic

The site is static today, but adding backend behavior is one file away — no second
process, no extra port, all served on the same port 3000:

- **Server function** — call server-only code (DB, secrets, fetch) directly from a
  component:

  ```tsx
  import { createServerFn } from "@tanstack/react-start";

  const getMessage = createServerFn().handler(async () => {
    return { message: "Hello from the server" };
  });
  ```

- **API route** — add `src/routes/api/<name>.ts` for a REST endpoint.

## Adding a database

The site stores data in **Supabase Postgres** (leads table for the enquiry
form). Server-side env vars `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` supply
credentials (service-role key only in server code — never in a client bundle).

Query it from server-only code with the `~/db` helper — never from the client.
`getSupabase()` creates the client lazily (per call, inside a
`createServerFn()` handler or an `src/routes/api/*` route) and dynamically
imports `@supabase/supabase-js`, so the site still builds and serves before
the Supabase project is connected, and the prod build keeps passing:

```tsx
import { createServerFn } from "@tanstack/react-start";
import { getSupabase } from "~/db";

const getPosts = createServerFn().handler(async () => {
  const db = await getSupabase();
  const { data, error } = await db.from("posts").select("id, title");
  if (error) throw error;
  // Coerce non-primitive columns before returning — timestamps come back as JS
  // Dates, which React will not render:
  return data.map((r) => ({ ...r, created_at: String(r.created_at) }));
});
```

`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are injected into this sandbox
once connected and passed to the live host on publish — the same code works in
the preview and in production. Run `/home/team/shared/leads-schema.sql` against
the Supabase project (management dashboard SQL editor or psql) to create the
`leads` table. One Supabase project serves both the preview and the live site.
