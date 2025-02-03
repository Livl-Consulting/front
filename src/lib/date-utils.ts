import {format} from "date-fns";
import {fr} from "date-fns/locale/fr";

export function formatDate(date: Date): string {
  return format(date, 'dd LLLL y', {locale: fr});
}