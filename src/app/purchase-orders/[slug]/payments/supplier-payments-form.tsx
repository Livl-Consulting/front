"use client";

import { ClientPicker } from "@/components/client-picker";
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
import { SupplierPicker } from "@/components/supplier-picker";
import { addSupplierPayment } from "@/lib/actions/add-supplier-payment.action";
import { SupplierPayment } from "@/models/supplier-payment";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const SupplierPaymentsForm: FC<{
  supplierPayment?: SupplierPayment;
  purchaseOrderId: number;
}> = ({ supplierPayment, purchaseOrderId }) => {
  const [state, action] = useActionState(addSupplierPayment, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <Input type="hidden" name="purchaseOrderId" value={purchaseOrderId}/>
          <div className="flex flex-col gap-2">
                <Label htmlFor="description">Montant</Label>
                <Input type="number" name="amount" id="amount" className="input"/>
                <FieldErrors errors={state?.errors?.amount?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
                <Label htmlFor="description">Notes</Label>
                <Textarea name="notes" id="notes" className="input"/>
                <FieldErrors errors={state?.errors?.notes?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Méthode de paiement</Label>
              <Select name="paymentMethod">
                  <SelectTrigger>
                      <SelectValue placeholder=""/>
                  </SelectTrigger>
                  <SelectContent>
                      {
                          Object.entries(labelsPaymentMethod).map(([key, value]) => {
                              return (
                                  <SelectItem id={key} key={key} value={key}>{value}</SelectItem>
                              )
                          })
                      }
                  </SelectContent>
              </Select>
              <FieldErrors errors={state?.errors?.paymentMethod?._errors}/>
          </div>
            
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
