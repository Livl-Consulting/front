import {FC} from "react";
import {Badge} from "@/components/ui/badge";
import {labelsByOpportunityStatus} from "@/models/labels-by-opportunity-status";
import {OpportunityStatus} from "@/models/opportunity-status.type";


type Props = {
    status: OpportunityStatus
};

export const OpportunityStatusBadge: FC<Props> = ({ status }) => {
    return <>
        <Badge variant={status}>{labelsByOpportunityStatus[status]}</Badge>
    </>
}