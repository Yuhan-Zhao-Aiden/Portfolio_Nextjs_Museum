import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Error from "next/error";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "./ui/button";

const ArtworkCard = ({ objectId }) => {
  const { error, data, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)

  if (error) return <Error statusCode={404} />

  if (isLoading) return <span>Loading...</span>

  if (!data) return null;

  return (
    <Card className="shadow-lg hover:scale-105 transition-transform">
      <CardHeader>
        <img src={data.primaryImageSmall || "https://placehold.co/400?text=Not+Available"} className=" rounded-md w-full h-[300px]" />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{data.title || "N/A"}</h2>
        <p className="text-sm text-gray-600">{data.objectDate || "N/A"} / {data.classification || "N/A"} / {data.medium || "N/A"}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/artwork/${objectId}`}>View Object {objectId}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ArtworkCard;