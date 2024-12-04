"use client";

import { useFormStatus } from "react-dom";
import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { Loader } from "./loader";

export const SubmitButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      disabled={pending || props.disabled}
      type="submit"
    >
      {props.children}
      {pending && <Loader className="ml-2" />}
    </Button>
  );
};
