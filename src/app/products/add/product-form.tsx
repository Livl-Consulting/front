"use client";

import { FieldErrors } from "@/components/ui/field-errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/lib/actions/add-product.action";
import { Product } from "@/models/product";
import { FC, useActionState } from "react";

export const ProductForm: FC<{
  product?: Product;
}> = ({ product }) => {
  const [state, action] = useActionState(addProduct, { success: false });

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nom</Label>
        <Input type="text" id="name" defaultValue={product?.name} name="name" />
        <FieldErrors errors={state?.errors?.name?._errors} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Prix</Label>
        <Input
          type="number"
          id="price"
          defaultValue={product?.price}
          name="price"
          min={0}
        />
        <FieldErrors errors={state?.errors?.price?._errors} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          defaultValue={product?.description}
          name="description"
        />
        <FieldErrors errors={state?.errors?.description?._errors} />
      </div>
      <SubmitButton>Enregistrer</SubmitButton>
      <FieldErrors errors={state.message ? [state.message] : []} />
    </form>
  );
};
