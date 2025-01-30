"use client";

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
import { addSupplierPayment } from "@/lib/actions/add-supplier-payment.action";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";

export const SupplierPaymentsForm: FC<{
  totalDue: number;
  purchaseOrderId: number;
}> = ({ totalDue, purchaseOrderId }) => {
  const [state, action] = useActionState(addSupplierPayment, { success: false });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  return (
      <form action={action} className="flex flex-col gap-6">
          <Input type="hidden" name="purchaseOrderId" value={purchaseOrderId}/>
          <div className="flex flex-col gap-2">
                <Label htmlFor="description">Montant</Label>
                <Input type="number" name="amount" id="amount" className="input" max={totalDue} min={1}/>
                <FieldErrors errors={state?.errors?.amount?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea name="notes" id="notes" className="input"/>
                <FieldErrors errors={state?.errors?.notes?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="paymentMethod">Méthode de paiement</Label>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="paymentDate">Date du paiement</Label>
            <Input type="hidden" id="paymentDate" name="paymentDate" value={formattedDate} />
            <DatePicker value={date} onChange={setDate} />
            <FieldErrors errors={state?.errors?.paymentDate?._errors}/>
           </div>
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
