CorranForce/throughline-marketing fix list

Default branch: main. Write access: yes. Visibility: public.

Critical

- Locked TanStack Start version is in a critical XSS range
  - File: bun.lock resolves @tanstack/react-start to 1.168.26, with start-server-core 1.169.15
  - That range is flagged for unauthenticated reflected XSS in TanStack Start server-function responses (the same family of issues as niche-app-navigator).
  - There is no package-lock.json, so npm audit --package-lock-only could not be run. bun.lock is present.
  - Fix: upgrade @tanstack/react-start and related packages past the patched versions. Add a lockfile-based audit step (bun audit or npm) to CI.

High

- HTML rendered with dangerouslySetInnerHTML
  - File: src/components/blog.tsx line 121
  - section.html is injected as HTML. A nearby comment says the parser only allows headings, text, and inline links.
  - Fix: keep a strict sanitizer on that path, add a test that rejects script and event attributes, and treat any parser change as a security review.

Medium

- No CI, no LICENSE, no package-lock.json, and package.json still uses the template name team-site-template
  - Files: package.json, missing .github/workflows, missing LICENSE
  - .gitignore correctly ignores .env and .env.local. No committed secret values were found.
  - go-live.sh line 26 reads VERCEL_TOKEN from the environment, which is fine if the token stays out of git.
  - Fix: rename the package, add CI (build and audit), and add a LICENSE.

Low

- README.md and .gitignore are present. Protect main with a required review once CI exists.
