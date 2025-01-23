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
import { Client } from "@/models/client";
import {formatDate} from "@/lib/date-utils";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/clients`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const clients = (await response.json()) as Client[];

  return (
    <Table>
      <TableCaption>Vos clients</TableCaption>
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
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.firstName}</TableCell>
            <TableCell className="font-medium">{client.lastName}</TableCell>
            <TableCell className="font-medium">{client.companyName}</TableCell>
            <TableCell className="font-medium">{client.email}</TableCell>
            <TableCell>{formatDate(client.updatedAt)}</TableCell>
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
