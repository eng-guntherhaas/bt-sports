import ContactForm from "@/components/contato/ContactForm";

export const metadata = {
  title: "Contato | Biarritz Turismo Sports",
  description:
    "Entre em contato com a Biarritz Turismo Sports e fale com nossa equipe.",
};

export default function ContatoPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
