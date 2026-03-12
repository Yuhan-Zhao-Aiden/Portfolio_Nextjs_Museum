import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { removeToken, readToken } from "@/lib/authenticate";

import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";

export default function UserNav({ handle }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleLogout = () => {
    removeToken();
    setFavouritesList([]);
    setSearchHistory([]);
    router.push("/login");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span>{readToken().userName.split('@')[0]}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem 
          asChild 
          onClick={handle}
          className={router.pathname === "/favourites" ? "text-blue-500 bg-slate-300" : ""}
        >
          <Link href="/favourites"><span>Favourites</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          asChild 
          onClick={handle}
          className={router.pathname === "/history" ? "text-blue-500 bg-slate-300" : ""}
        > 
          <Link href="/history"><span>Search History</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          asChild 
          onClick={handle}
        >
          <Button onClick={handleLogout} className="w-full">Log out</Button> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
