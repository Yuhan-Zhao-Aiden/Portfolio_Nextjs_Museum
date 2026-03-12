import useSWR from "swr";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import Error from "next/error";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { favouritesAtom } from "@/store";
import Image from "next/image";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const ArtworkCardDetail = ({ objectId, alertTrigger }) => {
  const { data, error, isLoading } = useSWR(objectId ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}` : null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  if (error) return <Error statusCode={404} />
  if (isLoading) return <span>Loading...</span>
  if (!data) return null;

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectId));
  }, [favouritesList]);

  const favouritesClicked = async () => {
    if (!isAuthenticated()) {
      alertTrigger(true);
      setTimeout(() => { alertTrigger(false) }, 3000);
      return;
    }
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectId));
    } else {
      setFavouritesList(await addToFavourites(objectId));
    }
    setShowAdded(cur => !cur);
  };

  return (
    <Card className="shadow-lg border card-shadow transition-all ease-in-out border-gray-200 mt-8">
      {
        data.primaryImage &&
        <CardHeader>
          <Image
            src={data.primaryImage} 
            className="w-full h-auto object-cover rounded"
            width={800}
            height={600}
            sizes="100vw"
          />
        </CardHeader>
      }
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{data.title || "N/A"}</h2>
        <p className="text-sm text-gray-600">
          {data.objectDate || "N/A"} / {data.classification || "N/A"} / {data.medium || "N/A"}
        </p>

        <br />
        <br />

        <p>Artist: {data.artistDisplayName || "N/A"}</p>
        {data.artistDisplayName && (
          <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            Wiki
          </a>
        )}
        <p>Credit Line: {data.creditLine || "N/A"}</p>
        <p>Dimensions: {data.dimensions || "N/A"}</p>
        <br />
        <Button 
          onClick={favouritesClicked}
          variant={showAdded ? "secondary" : "default"}
        >+ Favourite{showAdded && " (added)"}</Button>
      </CardContent>
    </Card>
  )
}

export default ArtworkCardDetail;