import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from "@/components/ui/table";
import { apiUrl } from "@/lib/utils";
import {formatDate} from "@/lib/date-utils";
import { Supplier } from "@/models/supplier";
import { HeaderTitle } from "@/components/header-title";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/suppliers`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const suppliers = (await response.json()) as Supplier[];

  return (
    <>
    <HeaderTitle goBackUrlLink="/" title="Fournisseurs" />
    <Table>
      <TableCaption>Vos fournisseurs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Prénom</TableHead>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead className="w-[100px]">Entreprise</TableHead>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Mise à jour</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.firstName}</TableCell>
            <TableCell className="font-medium">{supplier.lastName}</TableCell>
            <TableCell className="font-medium">{supplier.companyName}</TableCell>
            <TableCell className="font-medium">{supplier.email}</TableCell>
            <TableCell>{formatDate(supplier.updatedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
