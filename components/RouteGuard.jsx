import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";
import { useEffect } from "react";
import { useRouter } from "next/router";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const PRIVATE_PATHS = ['/favourites', '/history'];
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const updateAtoms = async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    if (!PRIVATE_PATHS.includes(router.pathname)) return;
    if (!isAuthenticated()) { router.push("/login"); }
    else (async () => {
      await updateAtoms();
    })()
  }, [router.pathname]);

  return <>
    {children}
  </>
}

export default RouteGuard;
