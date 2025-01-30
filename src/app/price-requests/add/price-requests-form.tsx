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
import { PriceRequest } from "@/models/price-request";
import { addPriceRequest } from "@/lib/actions/add-price-request.action";
import { SupplierPicker } from "@/components/supplier-picker";

export const PriceRequestForm: FC<{
  priceRequest?: PriceRequest;
}> = ({ priceRequest }) => {
  const [state, action] = useActionState(addPriceRequest, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Fournisseur</Label>
              <SupplierPicker name="supplierId" initialSupplier={priceRequest?.supplier}/>
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
                      <SelectValue placeholder=""/>
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
