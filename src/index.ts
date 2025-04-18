// ImageData.tsx
export interface ImageItem {
  id: number;
  cardId: number;
  name: string;
  img: string;
  active: boolean;
}

export const imaged: ImageItem[] = [
  {
    id: 1,
    cardId: 101,
    name: "Toyota",
    img: "/img/tayotta.png",
    active: false,
  },
  {
    id: 2,
    cardId: 101,
    name: "Toyota",
    img: "/img/tayotta.png",
    active: false,
  },
  {
    id: 3,
    cardId: 104,
    name: "Bugatti",
    img: "/img/bugatti.png",
    active: false,
  },
  {
    id: 4,
    cardId: 104,
    name: "Bugatti",
    img: "/img/bugatti.png",
    active: false,
  },
  {
    id: 5,
    cardId: 109,
    name: "Audi",
    img: "/img/audi.png",
    active: false,
  },
  {
    id: 9,
    cardId: 109,
    name: "Audi",
    img: "/img/audi.png",
    active: false,
  },
  {
    id: 6,
    cardId: 106,
    name: "Kia",
    img: "/img/kia.png",
    active: false,
  },
  {
    id: 10,
    cardId: 106,
    name: "Kia",
    img: "/img/kia.png",
    active: false,
  },
  {
    id: 7,
    cardId: 111,
    name: "BMW",
    img: "/img/bmw.png",
    active: false,
  },
  {
    id: 11,
    cardId: 111,
    name: "BMW",
    img: "/img/bmw.png",
    active: false,
  },
  {
    id: 8,
    cardId: 108,
    name: "Mercedes",
    img: "img/mercades.png",
    active: false,
  },
  {
    id: 12,
    cardId: 108,
    name: "Mercedes",
    img: "img/mercades.png",
    active: false,
  },
];
