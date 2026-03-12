import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({ href, children, handle }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={handle}
      className={router.pathname === href ? " text-red-300" : ""}
    >
      { children }
    </Link>
  )
}

export default NavLink;
