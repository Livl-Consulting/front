"use client";

import { ClientPicker } from "@/components/client-picker";
import { ProductPicker } from "@/components/product-picker";
import { FieldErrors } from "@/components/ui/field-errors";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Quote } from "@/models/quote";
import { FC, useActionState } from "react";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { labelsByProcessStatus } from "@/models/labels-by-opportunity-status";
import { addQuote } from "@/lib/actions/add-quote.action";

export const QuoteForm: FC<{
  quote?: Quote;
}> = ({ quote }) => {
  const [state, action] = useActionState(addQuote, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Client</Label>
              <ClientPicker name="clientId" initialClient={quote?.client}/>
              <FieldErrors errors={state?.errors?.clientId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="productId">Produit</Label>
              <ProductPicker name="product" productType='sale' allowQuantityEdit={false} allowPriceEdit={true}/>
              <FieldErrors errors={state?.errors?.productId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="price">Probabilité de succès (%)</Label>
              <Input
                  type="number"
                  id="successProbability"
                  defaultValue={quote?.successProbability}
                  name="successProbability"
                  placeholder="Ajourter la probabilité de succès de l'opportunité"
                  min={0}
                  max={100}
              />
              <FieldErrors errors={state?.errors?.successProbability?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Status</Label>
              <Select name="status">
                  <SelectTrigger>
                      <SelectValue placeholder="Status de l'opportunité"/>
                  </SelectTrigger>
                  <SelectContent>
                      {
                          Object.entries(labelsByProcessStatus).map(([key, value]) => {
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


