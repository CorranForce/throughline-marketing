import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only handle to the team's database (Supabase Postgres).
 *
 * Credentials: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (server-side env
 * vars only — the service-role key bypasses RLS, so it must never appear in a
 * client bundle or in any module the client pulls in).
 *
 * The client is created lazily — per call, inside a `createServerFn()` handler
 * or an `src/routes/api/*` route, never at module load and never client-side —
 * so the site still builds and serves before the Supabase project is connected:
 * the error only surfaces if a query actually runs without the env vars.
 * `@supabase/supabase-js` is loaded via a dynamic import inside the factory for
 * the same reason: the runtime dependency never ends up in a client bundle, and
 * the prod build keeps passing even though `~/db` is reachable from client
 * module graph (see build-gotchas.md).
 *
 * Use the returned client only inside a `createServerFn()` handler or an
 * `src/routes/api/*` route (never client code):
 *
 *   const getPosts = createServerFn().handler(async () => {
 *     const db = await getSupabase();
 *     const { data, error } = await db.from("posts").select("id, title");
 *     if (error) throw error;
 *     // Coerce non-primitive columns (timestamps are JS Dates) to strings before
 *     // returning to the client, or React will refuse to render them:
 *     return data.map((r) => ({ ...r, created_at: String(r.created_at) }));
 *   });
 */
export async function getSupabase(): Promise<SupabaseClient> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set — connect the Supabase project (server-side env vars) before running queries."
    );
  }
  // Validate the URL shape early (new URL throws on a malformed value).
  new URL(url);
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}