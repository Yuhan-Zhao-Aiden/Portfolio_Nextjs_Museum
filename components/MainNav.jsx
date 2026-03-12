import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/router"

export default function MainNav() {
  const router = useRouter()

  function handleSearch(event) {
    event.preventDefault()
    const searchField = event.target.elements.search.value
    router.push(`/artwork?title=true&q=${searchField}`)
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
      <span className="text-xl font-bold">The MET</span>
      <nav className="flex items-center gap-6">
        <Link href="/" >Home</Link>
        <Link href="/search">Advanced Search</Link>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input name="search" placeholder="Search artwork..." className="bg-white text-black" />
          <Button variant="search" type="submit">Search</Button>
        </form>
      </nav>
    </header>
  )
}
