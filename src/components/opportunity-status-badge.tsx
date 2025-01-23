import {OpportunityStatus} from "@/enums/opportunity-status";
import {FC} from "react";
import {Badge} from "@/components/ui/badge";


type Props = {
    status: OpportunityStatus
};

const badgeVariantByStatus: {[key in OpportunityStatus]: 'validated' | 'progress' | 'cancelled'} = {
    [OpportunityStatus.VALIDATED]: 'validated',
    [OpportunityStatus.PROGRESS]: 'progress',
    [OpportunityStatus.CANCELLED]: 'cancelled',
}

const labelByStatus: {[key in OpportunityStatus]: string} = {
    [OpportunityStatus.VALIDATED]: 'Validé',
    [OpportunityStatus.PROGRESS]: 'En cours',
    [OpportunityStatus.CANCELLED]: 'Annulé',
}

export const OpportunityStatusBadge: FC<Props> = ({ status }) => {
    return <>
        <Badge variant={badgeVariantByStatus[status]}>{labelByStatus[status]}</Badge>
    </>
}