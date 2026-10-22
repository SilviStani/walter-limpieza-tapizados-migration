import { siteUrl } from "../../lib/site.js";

export default function sitemap() {
  return [{ url: siteUrl.href }];
}
