import { getHomepageData } from "@/lib/homepage/getHomepageData";
import HomePageClient from "@/components/home/HomePageClient";

export default async function Home() {
  const data = await getHomepageData();
  return <HomePageClient data={data} />;
}
