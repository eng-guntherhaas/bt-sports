export const links = [
  { name: "Nossa história", href: "#historia" },
  { name: "Filosofia", href: "#filosofia" },
];

export const stats = [
  { name: "Anos de atuação", value: "15+" },
  { name: "Eventos realizados", value: "50+" },
  { name: "Atletas impactados", value: "1 mil+" },
];

type Parceiro = {
  name: string;
  href: string;
  imgMobile?: string;
  imgDesktop: string;
};

export const parceiros: Parceiro[] = [
  {
    name: "Maratona de Berlim",
    href: "https://www.bmw-berlin-marathon.com/en/registration/tour-operators",
    imgDesktop: "/img/banner-berlim.png",
  },
  {
    name: "Maratona de Paris",
    href: "https://www.schneiderelectricparismarathon.com/fr/participer/agences-voyages",
    imgDesktop: "/img/banner-paris.png",
  },
  {
    name: "Meia Maratona de Paris",
    href: "https://www.hokasemideparis.fr/fr/participer/tour-operateurs",
    imgDesktop: "/img/banner-meia_paris.png",
  },
  {
    name: "Maratona de Sydney",
    href: "https://www.tcssydneymarathon.com/international-entry",
    imgMobile: "/img/banner-sydney-mobile.png",
    imgDesktop: "/img/banner-sydney.png",
  },
  {
    name: "Maratona de Cape Town",
    href: "https://capetownmarathon.com/international-entry/",
    imgDesktop: "/img/banner-cape_town.png",
  },
  {
    name: "Maratona de Xangai",
    href: "https://shmarathon.com/",
    imgDesktop: "/img/banner-shangai.png",
  },
  {
    name: "Maratona de Chicago",
    href: "https://www.chicagomarathon.com",
    imgMobile: "/img/banner-chicago-mobile.png",
    imgDesktop: "/img/banner-chicago.png",
  },
  {
    name: "Atout France",
    href: "https://www.atout-france.fr/en",
    imgDesktop: "/img/banner-atout-france.png",
  },
];
