export const homepageInformationAlertQuery = `*[_type == "homepageInformationAlert"][0] {
  enabled,
  badgeLabel,
  messageBefore,
  highlightPhrase,
  messageAfter,
  ctaLabel,
  ctaHref,
  footnote
}`;

export const homepageStatsQuery = `*[_type == "siteStatistic"] | order(order asc) {
  "id": key,
  label,
  endValue,
  prefix,
  suffix,
  suffixText,
  isPulsing,
  duration,
  description
}`;

export const homepageVoicesQuery = `*[_type == "homepageVoice" && featured != false] | order(order asc)[0...6] {
  "id": _id,
  name,
  relationship,
  quote,
  "imageUrl": portraitImage.asset->url,
  portraitImage,
  featured
}`;

export const homepageRollPreviewQuery = `*[_type == "memorial"] | order(candleCount desc)[0...6] {
  "id": coalesce(slug.current, _id),
  name,
  "role": rank,
  force,
  "years": yearsServed,
  candleCount,
  "imageUrl": portraitImage.asset->url,
  portraitImage,
  quote
}`;

export const homepageEventsQuery = `*[_type == "event" && featuredOnHomepage == true && dateTime(date) >= dateTime(now())] | order(date asc)[0...3] {
  "id": _id,
  title,
  "date": coalesce(dateLabel, string(date)),
  time,
  location,
  description,
  badge,
  "href": coalesce(link, "/events")
}`;
