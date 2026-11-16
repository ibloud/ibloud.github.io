# Ecosystem subdomain migration

Approved destination: `https://ecosystem.loptrlab.com/`.

## Current status

Preparation only. The existing directory and portfolio remain published at their
current URLs. No DNS, Pages settings, live canonicals, or redirects have changed.
The ecosystem currently lives inside `ibloud/ibloud.github.io`, rather than in a
separate `ecosystem` repository. Changing that repository's custom domain would
move the portfolio and affect the default addresses of other project sites.

## Standalone build

Run from this repository:

```sh
python tools/build-ecosystem-site.py --output /tmp/loptr-ecosystem-site
```

Choose a fresh output directory. The build moves the directory homepage to `/`
and discovery pages to `/projects/<project>/`. It copies image assets, generates
the new sitemap and robots.txt, and updates canonical and social URLs. Links to
portfolio, research, collaboration, provenance, and architecture documents remain
absolute links to the original portfolio. Project content and status claims stay
the same. Validation checks every new canonical, social URL, local resource,
internal page link, and referenced fragment.

The generated `CNAME` belongs only in the separate publishing repository. Never
add it to the root of `ibloud/ibloud.github.io`.

## Activation order

1. Create a dedicated public publishing repository, suggested name
   `ibloud/ecosystem`, and publish the generated output to its main branch.
   Keep this source repository authoritative; rebuild and republish after changes.
2. Verify `loptrlab.com` in GitHub account Pages settings. GitHub supplies the
   exact TXT challenge; obtain it there rather than inventing a value.
3. In the dedicated repository, enable Pages from `main` / root and set its
   custom domain to `ecosystem.loptrlab.com` before adding the DNS record.
4. At the authoritative DNS provider, add:

   | Type | Host | Value |
   | --- | --- | --- |
   | CNAME | ecosystem | ibloud.github.io |

   Inspect existing records for that exact hostname first. Do not change apex,
   mail, or other subdomain records. The destination contains no URL scheme or
   repository path.
5. When the certificate is available, enforce HTTPS. Check homepage, all discovery
   pages, image previews, navigation, keyboard access, and iPad portrait/landscape.
6. Only after the new site passes live checks, update referring links and retire
   old directory pages using the generated `url-mapping.json`.

## Old URL handling

GitHub Pages does not provide arbitrary server-side 301 redirect configuration
for a subdirectory moved out of a user site. Its automatic custom-domain redirect
would apply to the publishing site, not just `/ecosystem/` in this repository.
Do not promise automatic 301 redirects for these old URLs.

After activation, use immediate HTML meta-refresh redirects with a visible new
destination link and canonical on each old directory page, or use a host capable
of permanent redirects if controlling the old host becomes possible. Preserve
query strings and fragments with progressive JavaScript where appropriate. Check
bookmarks such as `/ecosystem/#urbanalienadventures` against the new page's IDs.
Keep these migration pages available; do not redirect unrelated portfolio pages.
Update the old sitemap to omit migrated directory URLs. Submit the new sitemap
and inspect indexing in Search Console. Do not change old canonicals to an
unavailable destination before activation.

## Remaining prerequisites

The connector available during preparation can edit repository content but has
no create-repository or Pages-administration operation. No authoritative DNS
connector is available. Dedicated-repository creation, account verification,
Pages setup, and DNS activation require another authorized access path. Local
DNS lookup was unavailable in this runtime, so existing DNS status is unverified.

## References

- [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## Rollback

Before activation there is no live change to roll back. After activation, restore
the original directory pages and sitemap from the pre-cutover commit if needed.
Remove the exact DNS record before disabling or releasing the dedicated Pages
site. Keep the domain verification and leave all unrelated DNS records intact.
