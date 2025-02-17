"use client";

import { FieldErrors } from "@/components/ui/field-errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { FC, useActionState } from "react";
import {Client} from "@/models/client";
import {addClient} from "@/lib/actions/add-client.action";

export const ClientForm: FC<{
  client?: Client;
}> = ({ client }) => {
  const [state, action] = useActionState(addClient, { success: false });

  return (
      <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input type="text" id="lastName" defaultValue={client?.lastName} name="lastName"/>
              <FieldErrors errors={state?.errors?.firstName?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input type="text" id="firstName" defaultValue={client?.firstName} name="firstName"/>
              <FieldErrors errors={state?.errors?.lastName?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" defaultValue={client?.email} name="email"/>
              <FieldErrors errors={state?.errors?.email?._errors}/>
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Entreprise</Label>
              <Input type="text" id="companyName" defaultValue={client?.companyName} name="companyName"/>
              <FieldErrors errors={state?.errors?.companyName?._errors}/>
          </div>
          <SubmitButton>Enregistrer</SubmitButton>
          <FieldErrors errors={state.message ? [state.message] : []}/>
      </form>
  );
};
