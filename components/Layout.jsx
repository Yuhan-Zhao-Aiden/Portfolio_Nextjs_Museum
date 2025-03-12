import MainNav from "./MainNav"
import Hero from "./Hero"

export default function Layout({ 
  children, 
  currentPath 
}) {
  return (
    <>
      <MainNav />
      {currentPath === "/" && <Hero />}
      <div className="container mx-auto mt-5 p-10">{children}</div>
    </>
  )
}
