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
import {formatDate} from "@/lib/date-utils";
import {ProcessStatusBadge} from "@/components/process-status-badge";
import { labelsByProcessStatus } from "@/models/labels-by-opportunity-status";
import { HeaderTitle } from "@/components/header-title";
import OpportunityAction from "./opportunity-actions";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/opportunities`, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const opportunities = (await response.json()) as Opportunity[];

  return (
    <>
      <HeaderTitle title="Opportunités" />
      <Table>
        <TableCaption>Vos opportunités</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>N°</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Prix produit</TableHead>
            <TableHead>% de succès</TableHead>
            <TableHead>Prix opportunité</TableHead>
            <TableHead>Mise à jour</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity.id}>
              <TableCell>{opportunity.id}</TableCell>
              <TableCell className="text-center">
                <ProcessStatusBadge status={opportunity.status} props={labelsByProcessStatus[opportunity.status]} />
              </TableCell>
              <TableCell className="font-medium">
                {opportunity.client.firstName} {opportunity.client.lastName}{" "}
              </TableCell>
              <TableCell className="font-medium">{opportunity.product.name}</TableCell>
              <TableCell>{opportunity.product.price}€</TableCell>
              <TableCell>{opportunity.successProbability}%</TableCell>
              <TableCell>{opportunity.price}€</TableCell>
              <TableCell>{formatDate(opportunity.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <OpportunityAction opportunity={opportunity} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
