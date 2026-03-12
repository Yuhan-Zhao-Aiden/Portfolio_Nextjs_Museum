import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";

const FavouritePage = () => {
  const [favouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;
  return (
    <>
      <div className="container mx-auto p-6">
        {favouritesList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {favouritesList.map((objectID) => (
                <ArtworkCard key={objectID} objectId={objectID} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Nothing Here. Try adding some new art to the list!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default FavouritePage;
