import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/models/product";
import { Table } from "lucide-react";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/products`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const products = (await response.json()) as Product[];

  return (
    <Table>
      <TableCaption>Vos produits</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Créé le</TableHead>
          <TableHead>Mise à jour</TableHead>
          <TableHead className="text-right">Prix</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>{p.createdAt.toString()}</TableCell>
            <TableCell>{p.updateAt.toString()}</TableCell>
            <TableCell className="text-right">{p.price}</TableCell>
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
