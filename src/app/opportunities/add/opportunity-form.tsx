"use client";

import { ClientPicker } from "@/components/client-picker";
import { ProductPicker } from "@/components/product-picker";
import { FieldErrors } from "@/components/ui/field-errors";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { addOpportunity } from "@/lib/actions/add-opportunity.action.ts";
import { Opportunity } from "@/models/opportunity";
import { FC, useActionState } from "react";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {labelsByOpportunityStatus} from "@/models/labels-by-opportunity-status";

export const OpportunityForm: FC<{
  opportunity?: Opportunity;
}> = ({ opportunity }) => {
  const [state, action] = useActionState(addOpportunity, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Client</Label>
              <ClientPicker name="clientId" initialClient={opportunity?.client}/>
              <FieldErrors errors={state?.errors?.clientId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="productId">Produit</Label>
              <ProductPicker name="productId"/>
              <FieldErrors errors={state?.errors?.clientId?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="price">Probabilities de succès (%)</Label>
              <Input
                  type="number"
                  id="price"
                  defaultValue={opportunity?.successProbability}
                  name="price"
                  min={0}
                  max={100}
              />
              <FieldErrors errors={state?.errors?.successProbability?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="description">Status</Label>
              <Select>
                  <SelectTrigger>
                      <SelectValue placeholder="Status de l'opportunité"/>
                  </SelectTrigger>
                  <SelectContent>
                      {/*<SelectItem value="m@example.com">m@example.com</SelectItem>*/}
                      {/*<SelectItem value="m@google.com">m@google.com</SelectItem>*/}
                      {/*<SelectItem value="m@support.com">m@support.com</SelectItem>*/}
                      {
                          Object.entries(labelsByOpportunityStatus).map(([key, value]) => {
                              return (
                                  <SelectItem key={key} value={value}>{value}</SelectItem>
                              )
                          })
                      }
                  </SelectContent>
              </Select>
              <FieldErrors errors={state?.errors?.successProbability?._errors}/>
          </div>
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
