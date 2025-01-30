import { HeaderTitle } from "@/components/header-title";
import { ClientForm } from "./client-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle title="Ajouter un client" />
      <ClientForm />
    </div>
  );
}
