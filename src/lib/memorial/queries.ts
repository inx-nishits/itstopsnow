export const memorialListQuery = `*[_type == "memorial"] | order(candleCount desc) {
  "id": coalesce(slug.current, _id),
  "sanityId": _id,
  name,
  "rank": rank,
  force,
  region,
  "yearsServed": yearsServed,
  quote,
  "portraitImageUrl": portraitImage.asset->url,
  portraitImage,
  candleCount,
  tributeCount
}`;

export const memorialDetailQuery = `*[_type == "memorial" && (slug.current == $id || _id == $id)][0] {
  "id": coalesce(slug.current, _id),
  "sanityId": _id,
  name,
  "rank": rank,
  force,
  region,
  "yearsServed": yearsServed,
  age,
  dateOfLoss,
  quote,
  familyQuote,
  biography,
  "portraitImageUrl": portraitImage.asset->url,
  portraitImage,
  "galleryUrls": gallery[].asset->url,
  gallery,
  candleCount,
  tributeCount,
  rememberedCount,
  "timeline": *[_type == "timelineEvent" && references(^._id)] | order(date asc) {
    title,
    date,
    description
  },
  "tributes": *[_type == "tribute" && references(^._id) && status == "approved"] | order(createdAt desc)[0...12] {
    "name": authorName,
    "relationship": coalesce(relationship, "Supporter"),
    "timeAgo": createdAt,
    "text": message
  }
}`;

export const memorialRollPreviewQuery = `*[_type == "memorial"] | order(candleCount desc)[0...6] {
  "id": coalesce(slug.current, _id),
  name,
  "rank": rank,
  force,
  "yearsServed": yearsServed,
  quote,
  "portraitImageUrl": portraitImage.asset->url,
  portraitImage,
  candleCount,
  tributeCount
}`;

export const memorialIdsQuery = `*[_type == "memorial"]{ "id": coalesce(slug.current, _id) }.id`;
