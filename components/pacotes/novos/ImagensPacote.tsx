import Section from "./Section";
import UploadImagem from "@/components/admin/UploadImagem";

type ImagensPacoteProps = {
  fotoCapa: File | null;
  setFotoCapa: (file: File | null) => void;
  fotoCard: File | null;
  setFotoCard: (file: File | null) => void;
  fotoBanner: File | null;
  setFotoBanner: (file: File | null) => void;

  capaAtualUrl?: string;
  cardAtualUrl?: string;
  bannerAtualUrl?: string;
};

export default function ImagensPacote({
  fotoCapa,
  setFotoCapa,
  fotoCard,
  setFotoCard,
  fotoBanner,
  setFotoBanner,
  capaAtualUrl,
  cardAtualUrl,
  bannerAtualUrl,
}: ImagensPacoteProps) {
  return (
    <Section title="Imagens" description="Recomendamos seguir as proporções">
      <UploadImagem
        label="Foto de capa (16:9)"
        value={fotoCapa}
        onChange={setFotoCapa}
        imagemAtualUrl={capaAtualUrl}
        aspect="16:9"
      />

      <UploadImagem
        label="Imagem de destaque (4:3)"
        value={fotoCard}
        onChange={setFotoCard}
        imagemAtualUrl={cardAtualUrl}
        aspect="4:3"
      />

      <UploadImagem
        label="Banner da página (21:9)"
        value={fotoBanner}
        onChange={setFotoBanner}
        imagemAtualUrl={bannerAtualUrl}
        aspect="21:9"
      />
    </Section>
  );
}
