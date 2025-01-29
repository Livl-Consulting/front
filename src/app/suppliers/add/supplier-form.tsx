"use client";

import { FieldErrors } from "@/components/ui/field-errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { FC, useActionState } from "react";
import {addSupplier} from "@/lib/actions/add-supplier.action";
import { Supplier } from "@/models/supplier";

export const SupplierForm: FC<{
  supplier?: Supplier;
}> = ({ supplier }) => {
  const [state, action] = useActionState(addSupplier, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input type="text" id="lastName" defaultValue={supplier?.lastName} name="lastName"/>
              <FieldErrors errors={state?.errors?.firstName?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input type="text" id="firstName" defaultValue={supplier?.firstName} name="firstName"/>
              <FieldErrors errors={state?.errors?.lastName?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" defaultValue={supplier?.email} name="email"/>
              <FieldErrors errors={state?.errors?.email?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Entreprise</Label>
              <Input type="text" id="companyName" defaultValue={supplier?.companyName} name="companyName"/>
              <FieldErrors errors={state?.errors?.companyName?._errors}/>
          </div>
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
