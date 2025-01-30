"use client"

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
import { PriceRequest } from "@/models/price-request";
import { cancelPriceRequest } from "@/lib/fetch/cancel-price-request.fetch";
import { createPurchaseOrderFromPriceRequest } from "@/lib/fetch/create-purchase-order-from-price";

type PriceRequestActionProps = {
  priceRequest: PriceRequest;
};

export default function PriceRequestAction({ priceRequest }: PriceRequestActionProps) {
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
          onClick={() => createPurchaseOrderFromPriceRequest(priceRequest.id)} 
          disabled={priceRequest.status !== "progress"}>
          <span>Créer la commande</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => cancelPriceRequest(priceRequest.id)}
          disabled={priceRequest.status !== "progress"}>
          <span>Annuler la demande de prix</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
