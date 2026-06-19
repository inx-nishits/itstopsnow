import { redirect } from "next/navigation";

/** Legacy footer link — opens story submission on the stories listing. */
export default function StorySubmitRedirect() {
  redirect("/stories?submit=1");
}
