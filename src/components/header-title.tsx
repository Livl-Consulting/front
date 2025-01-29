import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

type Props = {
    goBackUrlLink: string;
    title: string;
}

export const HeaderTitle = ({ goBackUrlLink, title }: Props) => {
    return (
        <div className="flex items-center justify-start gap-5 mb-5">
        <Button variant="outline" asChild>
          <Link href={goBackUrlLink}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
    </div>
    );
}