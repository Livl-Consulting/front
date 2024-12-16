import { FC } from "react";

export const FieldErrors: FC<{ errors?: string[] }> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-2">
      {errors.map((error, index) => (
        <p key={index} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ))}
    </div>
  );
};
