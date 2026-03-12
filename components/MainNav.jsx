import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import UserNav from "./UserNav";
import NavLink from "./NavLink";

import { addToHistory } from "@/lib/userData";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

import { isAuthenticated } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // avoid hydration error
  }, []);

  async function handleSearch(event) {
    event.preventDefault()
    const searchField = event.target.elements.search.value
    const queryString = "title=true&q=" + searchField;
    setSearchHistory(await addToHistory(queryString))
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  }

  const toggleNav = () => {
    setIsExpanded((cur) => !cur);
  }

  const closeNav = () => {
    setIsExpanded(false);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
      <span className="text-xl font-bold">The MET</span>
      <button onClick={toggleNav} className="lg:hidden">
        {
          isExpanded ? <IoClose /> : <GiHamburgerMenu />
        }
      </button>
      <nav className={`absolute top-full left-0 w-full bg-primary p-4 flex flex-col gap-4 items-start transition-all duration-300 lg:static lg:flex-row lg:w-auto lg:bg-transparent lg:p-0 lg:flex lg:items-center lg:gap-7 ${isExpanded ? "flex" : "hidden"}`}>
        <NavLink href="/" handle={closeNav}>
          Home
        </NavLink>
        <NavLink href="/search" handle={closeNav}>
          Advanced Search
        </NavLink>
        <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto">
          <Input name="search" placeholder="Search artwork..." className="bg-white text-black" />
          <Button variant="search" type="submit">Search</Button>
        </form>
        {mounted && (
          (isAuthenticated()) ? <UserNav handle={closeNav}/>
          : 
          <>
            <NavLink href="/login" handle={closeNav}>
              Login
            </NavLink>
            <NavLink href="/register" handle={closeNav}>
              Register
            </NavLink>
          </>
        )}
        
      </nav>
    </header>
  )
}
