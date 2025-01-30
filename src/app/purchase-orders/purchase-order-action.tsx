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
import { PurchaseOrder } from "@/models/purchase-order";
import { cancelPurchaseOrder } from "@/lib/fetch/cancel-purchase-order.fetch";
import Link from "next/link";

type PurchaseOrderActionProps = {
  purchaseOrder: PurchaseOrder;
};

export default function PurchaseOrderAction({ purchaseOrder }: PurchaseOrderActionProps) {
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
        <DropdownMenuItem disabled={purchaseOrder.status === "cancelled"}>
            <Link href={`/purchase-orders/${purchaseOrder.id}/payments`}>
                <span>Procéder au paiement</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => cancelPurchaseOrder(purchaseOrder.id)}
          disabled={purchaseOrder.status !== "progress"}>
          <span>Annuler la commande</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
