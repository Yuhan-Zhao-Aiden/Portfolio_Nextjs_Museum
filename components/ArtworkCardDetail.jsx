import useSWR from "swr";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Error from "next/error";


const ArtworkCardDetail = ({ objectId }) => {
  const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);

  if (error) return <Error statusCode={404} />

  if (isLoading) return <span>Loading...</span>
  if (!data) return null;

  return (
    <Card className="shadow-lg border card-shadow transition-all ease-in-out border-gray-200 mt-8">
      {
        data.primaryImage &&
        <CardHeader>
          <img 
            src={data.primaryImage} 
            className="rounded-md w-full h-auto object-cover"
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
      </CardContent>

    </Card>
  )
}

export default ArtworkCardDetail;