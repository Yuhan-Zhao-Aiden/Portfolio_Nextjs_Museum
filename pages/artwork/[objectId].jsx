import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import SigninAlert from "@/components/SigninAlert";
import { useRouter } from "next/router";
import { useState } from "react";

const ArtworkDetail = () => {
  const router = useRouter();
  const id = router.query.objectId;

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="container w-[75vw] mx-auto">
      <SigninAlert classList={showAlert ? "" : "hidden"} />
      <ArtworkCardDetail objectId={id} alertTrigger={setShowAlert}/>
    </div>
  )
}

export default ArtworkDetail;