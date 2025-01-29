import {FC} from "react";
import {Badge} from "@/components/ui/badge";
import {labelsByProcessStatus} from "@/models/labels-by-opportunity-status";
import {ProcessStatus} from "@/models/process-status.type";

type Props = {
    status: ProcessStatus
};

export const ProcessStatusBadge: FC<Props> = ({ status }) => {
    return <>
        <Badge variant={status}>{labelsByProcessStatus[status]}</Badge>
    </>
}