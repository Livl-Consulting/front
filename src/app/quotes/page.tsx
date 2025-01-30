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
  import { Quote } from "@/models/quote";
  import {formatDate} from "@/lib/date-utils";
  import {ProcessStatusBadge} from "@/components/process-status-badge";
  import { HeaderTitle } from "@/components/header-title";
import QuoteAction from "./quote-actions";
import { labelsByProcessStatus } from "@/models/labels-by-opportunity-status";
  
  export default async function Page() {
    const response = await fetch(`${apiUrl()}/quotes`);
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const quotes = (await response.json()) as Quote[];
  
    return (
      <>
        <HeaderTitle  title="Devis" />
        <Table>
          <TableCaption>Vos devis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">N° de devis</TableHead>
              <TableHead className="text-center">Opportunité</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Prix produit</TableHead>
              <TableHead>% de succès</TableHead>
              <TableHead>Prix devis</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="text-center">{quote.id}</TableCell>
                <TableCell className="text-center">{quote.opportunityId || "-"}</TableCell>
                <TableCell className="text-center">
                  <ProcessStatusBadge status={quote.status} props={labelsByProcessStatus[quote.status]} />
                </TableCell>
                <TableCell className="font-medium">
                  {quote.client.firstName} {quote.client.lastName}{" "}
                </TableCell>
                <TableCell className="font-medium">{quote.product.name}</TableCell>
                <TableCell>{quote.product.price}€</TableCell>
                <TableCell>{quote.successProbability}%</TableCell>
                <TableCell>{quote.price}€</TableCell>
                <TableCell className="text-right">
                  <QuoteAction quote={quote} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  