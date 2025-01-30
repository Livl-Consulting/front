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
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { labelsByProductsType } from "@/models/labels-by-products-type";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/products`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const products = (await response.json()) as Product[];

  return (
    <>
      <HeaderTitle  title="Produits" />
      <Table>
        <TableCaption>Vos produits</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Type</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Prix</TableHead>
            <TableHead>Mis à jour le</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="text-center">
                <ProcessStatusBadge status={p.type} props={labelsByProductsType[p.type]} />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell className="text-center">{p.price}€</TableCell>
              <TableCell>{formatDate(p.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
