import {OpportunityStatus} from "@/models/opportunity-status.type";

export const labelsByOpportunityStatus: {[key in OpportunityStatus]: string} = {
    validated: 'Validé',
    progress: 'En cours',
    cancelled: 'Annulé',
}