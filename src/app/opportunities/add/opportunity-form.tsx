"use client";

import { ClientPicker } from "@/components/client-picker";
import { ProductPicker } from "@/components/product-picker";
import { FieldErrors } from "@/components/ui/field-errors";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { addOpportunity } from "@/lib/actions/add-opportunity.action.ts";
import { Opportunity } from "@/models/opportunity";
import { FC, useActionState } from "react";

export const OpportunityForm: FC<{
  opportunity?: Opportunity;
}> = ({ opportunity }) => {
  const [state, action] = useActionState(addOpportunity, { success: false });

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="clientId">Client</Label>
        <ClientPicker name="clientId" initialClient={opportunity?.client} />
        <FieldErrors errors={state?.errors?.clientId?._errors} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="products">Client</Label>
        <ProductPicker name="products" />
        <FieldErrors errors={state?.errors?.clientId?._errors} />
      </div>
      <SubmitButton>Enregistrer</SubmitButton>
      <FieldErrors errors={state.message ? [state.message] : []} />
    </form>
  );
};
