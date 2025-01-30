'use client'

import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from 'next/navigation'

type Props = {
    title: string;
}

export const HeaderTitle = ({ title }: Props) => {
  const router = useRouter()

    return (
        <div className="flex items-center justify-start gap-5 mb-5">
        <Button variant="outline" asChild onClick={() => router.back()}>
          <span>
          <ArrowLeftIcon />

          </span>
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
    </div>
    );
}