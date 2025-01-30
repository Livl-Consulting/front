import React, {FC} from "react";
import {Badge} from "@/components/ui/badge";

type Props = {
    status: any
    props: React.ReactNode
};

export const ProcessStatusBadge: FC<Props> = ({ status, props }) => {
    return <>
        <Badge className="justify-center" variant={status}>{props}</Badge>
    </>
}