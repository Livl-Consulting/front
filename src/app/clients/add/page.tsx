import { ClientForm } from "./client-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 my-20">
      <h1 className="text-xl font-bold">Ajouter un client</h1>
      <ClientForm />
    </div>
  );
}
