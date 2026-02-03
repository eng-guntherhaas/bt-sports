import Section from "./Section";
import UploadImagem from "@/components/admin/UploadImagem";

type ImagensPacoteProps = {
  fotoCapa: File | null;
  setFotoCapa: (file: File | null) => void;
  fotoDestaque: File | null;
  setFotoDestaque: (file: File | null) => void;
  fotoBanner: File | null;
  setFotoBanner: (file: File | null) => void;

  capaAtualUrl?: string;
  destaqueAtualUrl?: string;
  bannerAtualUrl?: string;
};

export default function ImagensPacote({
  fotoCapa,
  setFotoCapa,
  fotoDestaque,
  setFotoDestaque,
  fotoBanner,
  setFotoBanner,
  capaAtualUrl,
  destaqueAtualUrl,
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
        value={fotoDestaque}
        onChange={setFotoDestaque}
        imagemAtualUrl={destaqueAtualUrl}
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
