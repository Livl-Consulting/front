import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { apiUrl } from "@/lib/utils";
import { Opportunity } from "@/models/opportunity";
import { Edit } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/opportunities`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const products = (await response.json()) as Opportunity[];

  return (
    <Table>
      <TableCaption>Vos opportunités</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Client</TableHead>
          <TableHead>Créé le</TableHead>
          <TableHead>Mise à jour</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">
              {p.client.firstName} {p.client.lastName}{" "}
            </TableCell>
            <TableCell>{p.createdAt.toString()}</TableCell>
            <TableCell>{p.updatedAt.toString()}</TableCell>
            <TableCell className="text-right">
              <Button variant={"ghost"} size={"icon"} asChild>
                <Link href={"#"}>
                  <Edit size={16} />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}
