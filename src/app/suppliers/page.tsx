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
    <HeaderTitle  title="Fournisseurs" />
    <Table>
      <TableCaption>Vos fournisseurs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Prénom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Entreprise</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mise à jour</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell>{supplier.firstName}</TableCell>
            <TableCell>{supplier.lastName}</TableCell>
            <TableCell>{supplier.companyName}</TableCell>
            <TableCell>{supplier.email}</TableCell>
            <TableCell>{formatDate(supplier.updatedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
