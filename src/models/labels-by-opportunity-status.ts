import {ProcessStatus} from "@/models/process-status.type";

export const labelsByProcessStatus: {[key in ProcessStatus]: string} = {
    progress: 'En cours',
    validated: 'Validé',
    cancelled: 'Annulé',
}