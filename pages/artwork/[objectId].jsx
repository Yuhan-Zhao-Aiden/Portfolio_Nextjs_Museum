import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

const ArtworkDetail = () => {
  const router = useRouter();
  const id = router.query.objectId;

  return (
    <div className="container w-[75vw] mx-auto">
      <ArtworkCardDetail objectId={id} />
    </div>
  )
}

export default ArtworkDetail;