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
import {formatDate} from "@/lib/date-utils";
import {ProcessStatusBadge} from "@/components/process-status-badge";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/opportunities`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const opportunities = (await response.json()) as Opportunity[];

  return (
    <Table>
      <TableCaption>Vos opportunités</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="w-[100px]">Client</TableHead>
          <TableHead className="w-[100px]">Produit</TableHead>
          <TableHead className="w-[100px]">Probabilité de succès</TableHead>
          <TableHead className="w-[100px]">Prix</TableHead>
          <TableHead>Mise à jour</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {opportunities.map((opportunity) => (
          <TableRow key={opportunity.id}>
            <TableCell>
              <ProcessStatusBadge status={opportunity.status} />
            </TableCell>
            <TableCell className="font-medium">
              {opportunity.client.firstName} {opportunity.client.lastName}{" "}
            </TableCell>
            <TableCell className="font-medium">{opportunity.product.name}</TableCell>
            <TableCell>{opportunity.successProbability}%</TableCell>
            <TableCell>{opportunity.product.price}</TableCell>
            <TableCell>{formatDate(opportunity.updatedAt)}</TableCell>
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
    </Table>
  );
}
