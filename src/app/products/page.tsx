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
import { Product } from "@/models/product";
import {formatDate} from "@/lib/date-utils";
import { HeaderTitle } from "@/components/header-title";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/products`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const products = (await response.json()) as Product[];

  return (
    <>
      <HeaderTitle goBackUrlLink="/" title="Produits" />
      <Table>
        <TableCaption>Vos produits</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Créé le</TableHead>
            <TableHead>Mise à jour</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="text-right">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{formatDate(p.createdAt)}</TableCell>
              <TableCell>{formatDate(p.updatedAt)}</TableCell>
              <TableCell className="text-right">{p.price}</TableCell>
              <TableCell className="text-right">
                {p.type === 'sale' ? 'Vente' : p.type === 'purchase' ? 'Achat' : 'Vente & Achat'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
