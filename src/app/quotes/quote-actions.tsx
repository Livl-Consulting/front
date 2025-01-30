"use client"

import { Opportunity } from "@/models/opportunity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { createQuoteFromOpportunity } from "@/lib/fetch/create-quote-from-opportunity.fetch";
import { cancelOpportunity } from "@/lib/fetch/cancel-opportunity.fetch";
import { Quote } from "@/models/quote";
import { createOrderFromQuote } from "@/lib/fetch/create-order-from-quote.fetch";
import { cancelQuote } from "@/lib/fetch/cancel-quote.fetch";

type QuoteActionProps = {
  quote: Quote;
};

export default function QuoteAction({ quote }: QuoteActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" asChild >
          <span>
            <EllipsisVertical />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => createOrderFromQuote(quote.id)} 
          disabled={quote.status !== "progress"}>
          <span>Créer la commande</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => cancelQuote(quote.id)}
          disabled={quote.status !== "progress"}>
          <span>Annuler devis</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
