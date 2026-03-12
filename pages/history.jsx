import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead
} from "@/components/ui/table";

import { removeFromHistory } from "@/lib/userData";

const HistoryPage = () => {
  const router = useRouter();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory) return null;

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    parsedHistory.push(Object.fromEntries(params.entries()));
  })

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]))
  }

  if (parsedHistory.length === 0) {
    return <Card className="mt-10">
      <CardContent>
        <p>Nothing Here. Try searching for some artwork.</p>
      </CardContent>
    </Card>
  }

  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Parameters</TableHead>
          <TableHead>String</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {parsedHistory.map((history, index) => (
          <TableRow key={index} onClick={(e) => historyClicked(e, index)}>
            <TableCell>{index}</TableCell>
            <TableCell>{JSON.stringify(history)}</TableCell>
            <TableCell>{searchHistory[index]}</TableCell>
            <TableCell>
              <Button onClick={(e) => removeHistoryClicked(e, index)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

}

export default HistoryPage;
