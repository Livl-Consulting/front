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
import { cancelSaleOrder } from "@/lib/fetch/cancel-sale-order.fetch";
import { SaleOrder } from "@/models/sale-order";

type SaleOrderActionProps = {
  saleOrder: SaleOrder;
};

export default function SaleOrderAction({ saleOrder }: SaleOrderActionProps) {
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
          onClick={() => cancelSaleOrder(saleOrder.id)}
          disabled={saleOrder.status !== "progress"}>
          <span>Annuler commande</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
