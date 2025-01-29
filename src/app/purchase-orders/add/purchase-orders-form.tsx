"use client";

import { ProductPicker } from "@/components/product-picker";
import { FieldErrors } from "@/components/ui/field-errors";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { FC, useActionState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {labelsByProcessStatus} from "@/models/labels-by-opportunity-status";
import { SupplierPicker } from "@/components/supplier-picker";
import { PurchaseOrder } from "@/models/purchase-order";
import { addPurchaseOrder } from "@/lib/actions/add-purchase-order.action";

export const PurchaseOrdersForm: FC<{
  purchaseOrder?: PurchaseOrder;
}> = ({ purchaseOrder }) => {
  const [state, action] = useActionState(addPurchaseOrder, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Fournisseur</Label>
              <SupplierPicker name="supplierId" initialSupplier={purchaseOrder?.supplier}/>
              <FieldErrors errors={state?.errors?.supplierId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="productId">Produits</Label>
              <ProductPicker name="products" productType='purchase' allowQuantityEdit={true} allowPriceEdit={true} allowMultipleSelection={true} />
              <FieldErrors errors={state?.errors?.products?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Status</Label>
              <Select name="status">
                  <SelectTrigger>
                      <SelectValue placeholder="Status de la commande"/>
                  </SelectTrigger>
                  <SelectContent>
                      {
                          Object.entries(labelsByProcessStatus).map(([key, value]) => {
                              return (
                                  <SelectItem id={key} key={key} value={key}>{value}</SelectItem>
                              )
                          })
                      }
                  </SelectContent>
              </Select>
              <FieldErrors errors={state?.errors?.status?._errors}/>
          </div>
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
