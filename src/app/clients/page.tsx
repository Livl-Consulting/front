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
import { HeaderTitle } from "@/components/header-title";

export default async function Page() {
  console.log("API_URL", apiUrl());
  console.log(`${apiUrl()}/clients`)
  const response = await fetch(`${apiUrl()}/clients`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const clients = (await response.json()) as Client[];

  return (
    <>
      <HeaderTitle  title="Clients" />
      <Table>
        <TableCaption>Vos clients</TableCaption>
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
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.companyName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{formatDate(client.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
