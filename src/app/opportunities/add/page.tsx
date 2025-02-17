import { HeaderTitle } from "@/components/header-title";
import { OpportunityForm } from "./opportunity-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle title="Ajouter une opportunité" />
      <OpportunityForm />
    </div>
  );
}
