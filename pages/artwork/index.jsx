import ArtworkCard from "@/components/ArtworkCard";
import ArtworkPagination from "@/components/ArtworkPagination";
import Error from "next/error";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const PER_PAGE = 12;
const ArtworkList = () => {
  const [ artworkList, setArtworkList ] = useState([]);
  const [ page, setPage ] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];


  const { data, error, isLoading } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );
  useEffect(() => {
    if (data) {
      let results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    setPage((cur) => cur - 1 > 0 ? cur - 1 : 1);
  }

  const nextPage = () => {
    setPage((cur) => artworkList.length > cur ? cur + 1 : cur);
  }

  if (error) return <Error statusCode={404} />
  if (isLoading) return <span>Loading...</span>
  if (!data) return null;

  return (
    <>
      <div className="container mx-auto p-6">
        {artworkList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {artworkList[page - 1].map((objectID) => (
                <ArtworkCard key={objectID} objectId={objectID} />
              ))}
            </div>
            <ArtworkPagination page={page} previousPage={previousPage} nextPage={nextPage} />

          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Nothing is here. Try searching for something else.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ArtworkList;