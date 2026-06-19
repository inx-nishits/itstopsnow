import { getAllMemorials, getWallStats } from "@/lib/memorial/getMemorialData";
import RemembranceWallClient from "@/components/remembrance/RemembranceWallClient";

export default async function RemembrancePage() {
  const [{ memorials }, wallStats] = await Promise.all([
    getAllMemorials(),
    getWallStats(),
  ]);

  return <RemembranceWallClient memorials={memorials} wallStats={wallStats} />;
}
