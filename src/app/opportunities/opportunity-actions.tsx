"use client"

import { HeaderTitle } from "@/components/header-title";
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

type OpportunityActionProps = {
  opportunity: Opportunity;
};

export default function OpportunityAction({ opportunity }: OpportunityActionProps) {
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
          onClick={() => createQuoteFromOpportunity(opportunity.id)} 
          disabled={opportunity.status !== "progress"}>
          <span>Valider en devis</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => cancelOpportunity(opportunity.id)}
          disabled={opportunity.status !== "progress"}>
          <span>Annuler opportunité</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
