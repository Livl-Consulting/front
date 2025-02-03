"use client";

import { ClientPicker } from "@/components/client-picker";
import { ProductPicker } from "@/components/product-picker";
import { FieldErrors } from "@/components/ui/field-errors";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { FC, useActionState } from "react";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { labelsBySaleOrderStatus } from "@/models/labels-by-sale-order-status";
import { addSaleOrder } from "@/lib/actions/add-sale-order.action";
import { SaleOrder } from "@/models/sale-order";
import React from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";

export const SaleOrdersForm: FC<{
  saleOrder?: SaleOrder;
}> = ({ saleOrder }) => {
  const [state, action] = useActionState(addSaleOrder, { success: false });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''; 

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Client</Label>
              <ClientPicker name="clientId" initialClient={saleOrder?.client}/>
              <FieldErrors errors={state?.errors?.clientId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="productId">Produit</Label>
              <ProductPicker name="product" productType='sale' allowQuantityEdit={false} allowPriceEdit={true}/>
              <FieldErrors errors={state?.errors?.productId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dueDate">Date échéance du paiement</Label>
            <Input type="hidden" id="dueDate" name="dueDate" value={formattedDate} />
            <DatePicker value={date} onChange={setDate} />
            <FieldErrors errors={state?.errors?.dueDate?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Status</Label>
              <Select name="status">
                  <SelectTrigger>
                      <SelectValue placeholder="Status de l'opportunité"/>
                  </SelectTrigger>
                  <SelectContent>
                      {
                          Object.entries(labelsBySaleOrderStatus).map(([key, value]) => {
                              return (
                                  <SelectItem key={key} value={key} disabled={key !== "progress"}>{value}</SelectItem>
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


