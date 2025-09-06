import CheckInSuccess from "@/components/CheckInSuccess";
import GateHeader from "@/components/GateHeader";
import MasterZones from "@/components/MasterZones";
import { useFetch } from "@/hooks/useFetch";

async function Gate({ params }: { params: { gateId: string } }) {
  // const { data, isLoading, error } = useFetch<{ id: number; title: string }[]>({
  //   queryKey: ["posts"],
  //   url: "/posts",
  // });
  const { gateId: id } = await params;

  return (
    <>
      <GateHeader />
      <main className="container mx-auto p-4">
        <MasterZones gateId={id} />
      </main>

      {/* after zone checkin success */}
      <CheckInSuccess />
    </>
  );
}

export default Gate;
