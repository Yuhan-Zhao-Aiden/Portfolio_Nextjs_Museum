import { Button } from "./ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export default function PaginationDemo({ previousPage, nextPage, page }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button onClick={previousPage}>{"< Previous"}</Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" >
            {page}
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <Button onClick={nextPage}>{"Next >"}</Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}