import { LoaderCircle } from "lucide-react";
import { FC } from "react";

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <LoaderCircle className="animate-spin" />
    </div>
  );
};
