import { redirect } from "next/navigation";

export default function CheckpointPage({ params }: { params: { week: string } }) {
  redirect(`/boss/${params.week}`);
}
