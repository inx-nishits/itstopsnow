import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

export function urlForImage(source: unknown, width?: number) {
  if (!source) return null;
  try {
    let img = builder.image(source).auto("format").fit("max");
    if (width) img = img.width(width);
    return img.url();
  } catch {
    return null;
  }
}
