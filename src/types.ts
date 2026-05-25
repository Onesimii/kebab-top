/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  ingredients?: string[];
  nutrition?: {
    calories: string;
    proteins: string;
    fats: string;
    carbs: string;
  };
  cookingTime?: string;
  spicyLevel?: string;
}

export enum Category {
  KEBABS = "kebabs",
  SHAWARMA = "shawarma",
  SIDES = "sides",
  DRINKS = "drinks"
}

export interface CartItem {
  id: string; // Unique instance ID (item.id + serialized options)
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options: {
    extraSauceCount: number; // +50 RUB each
    extraOnion: boolean; // +30 RUB
  };
  basePrice: number;
}

export interface DeliveryDetails {
  city: string;
  street: string;
  building: string;
  entrance: string;
  apartment: string;
  comment: string;
}

export enum PaymentMethod {
  CARD = "card",
  CASH = "cash"
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "lula-lamb",
    name: "Люля-кебаб из ягненка",
    description: "Традиционный кебаб из сочного фарша ягненка, приготовленный на открытом огне. Каждая порция пропитана ароматом дыма и восточных специй, подается на теплом лаваше.",
    price: 750,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpNltZbZbFOYublRqqEv9iUbQJjgA-tZycbYaGTP5jq3SY1F510FupbwdsMt93IYXNlI-Qf4j5vhA_JlMxD1E3rwlSUbINtyYVwZnfVVUqxmBIBGWNn-y0A3_JWuvPyuEiLjKWYTiMLFNz-AX-LXNEeS7MXN0p86crT_9mMirNMb_LC19jkxg1xZeZz5298qREDDbmoz9x-fxKcxa_UF_uPnajj2sjf-vuo_mT6RX6TxQXpuu46KaJu8h8mrOw_gE_pwHZ5z0nyio",
    category: Category.KEBABS,
    ingredients: ["Ягненок", "Авторские специи", "Красный лук", "Свежий лаваш", "Зелень"],
    nutrition: {
      calories: "420 ккал",
      proteins: "28 г",
      fats: "32 г",
      carbs: "6 г"
    },
    cookingTime: "15-20 мин",
    spicyLevel: "Средне-острое"
  },
  {
    id: "classic-kebab",
    name: "Классический Кебаб",
    description: "Классический сочный люля-кебаб на углях с фирменным томатным соусом, зеленью и хрустящим маринованным луком.",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlibOhT8FPsarURpeosXmeQmwUFHtbtVEZNC2VVvTphQ4DtNmjL_hZIOrIxfZ-bPyjTrS-I7cD2hq6z4xQAmsMoAyuS5l_q8U0l9slNwiW3Tj-I0IVqDuGx9WumXjAQf070q4bDX1dK0VYqx3QFGJsBfbbZYWpPl2hFI8h1O09XZfFw1yluIb81uZuY1xrVTGXVBlDIPgshCnwT0nk-a9f-F91NQEEUeXOBCO7t9AQnXRqnI03n_CfJ6niWrOV26jLPMtRpkP-ZHE",
    category: Category.KEBABS,
    ingredients: ["Говядина", "Фирменный соус", "Маринованный лук", "Тонкий лаваш"],
    nutrition: {
      calories: "380 ккал",
      proteins: "24 г",
      fats: "26 г",
      carbs: "5 г"
    },
    cookingTime: "10-15 мин",
    spicyLevel: "Неострое"
  },
  {
    id: "chicken-kebab",
    name: "Куриный Кебаб на Углях",
    description: "Мягкий и нежный куриный фарш с ароматными травами, приготовленный на открытом огне.",
    price: 420,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfjwJt0GJoppVWtBh9hHruhRe2YbxTWzMzBHKpZ51LFV1zpbGiRmYWifWa7H62A008KUrmsI0D5UZVrZkiNQkhQbkDlz1BmGRRPKjI3sk0gD77HIcXKu7DQTZ-9pGX4hsq0HOc5rAXOc6b1VhWnaDQW2hxstPE2AOIrCoLGkM3RLeKCq1wAK8xSObBQEHt7VK1VJChdPTpqPiUZE1P7mZznEtUUPzMGfChXUDGtQhd2LmcP7UlsUd1OE0y5XmCkqRAxgmJnIsPlW0",
    category: Category.KEBABS,
    ingredients: ["Курица", "Чесночный соус", "Зеленый лук", "Лаваш"],
    nutrition: {
      calories: "340 ккал",
      proteins: "22 г",
      fats: "20 г",
      carbs: "4 г"
    },
    cookingTime: "12-15 мин",
    spicyLevel: "Неострое"
  },
  {
    id: "shawarma-classic",
    name: "Шаурма Классическая",
    description: "Сочная классическая шаурма из обжаренной на вертеле курочки с хрустящими огурчиками и чесночным соусом.",
    price: 390,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3QTnrXhu1RVuNmlTh2rC_jWRVnznaOFl4f04DO6XjBzi6kVYJce9_Y9c9dq_chrP1h0MR2ZNKum1WN7RO-PhuulZ7unjiGel3z0-MXpdXbucTnB55MdfofDXaI_VJ2LlQiXR7WuvAu_dBmSd2f7H6K5G7j2eUXjSqygBlwAwalLRdfD5yyB5bStqr91ugGWsz5DKTjEycdzrFtWZTIfUtaF0uO5zKRiCjwoXny6EH1FIeXgBnsaDPtfW-8Fq8yK-mG7hqpWsw3Ig",
    category: Category.SHAWARMA,
    ingredients: ["Куриный вертел", "Свежие огурцы", "Томаты", "Чесночный соус", "Хрустящий лаваш"],
    nutrition: {
      calories: "450 ккал",
      proteins: "26 г",
      fats: "23 г",
      carbs: "35 г"
    },
    cookingTime: "5-10 мин",
    spicyLevel: "Неострое"
  },
  {
    id: "shawarma-pita",
    name: "Шаурма в Пите",
    description: "Аппетитная начинка из румяной курочки со спелыми помидорами, маринованными огурчиками и соусом в пышной пите.",
    price: 410,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhGwMz7QkM8XBz1hERnvzxeuCVwKufCjPFUWQlENf9-cbffV3MQVMTPRV73MZEcJiTwxseHPGlg1b0Z99WQfnik2p8INXErt14Pia76jMA2ErDJHlviP5QFuHep2d7WjcYmKVl1zqiqKzZqN2H8Fd68u9FEXhNFEuV5p3BrFBUr2JHms6ZE1TnEYzDu5I6ltp6NvcFSaGM3dmrBHdkNx3OUYU_ZRlU4QHyP5wJOnSpuzZHcb10lCDBK9GQCNevh-7lFkYQWeNey70",
    category: Category.SHAWARMA,
    ingredients: ["Пышная пита", "Куриное бедро", "Красная капуста", "Фирменный соус"],
    nutrition: {
      calories: "490 ккал",
      proteins: "28 г",
      fats: "25 г",
      carbs: "38 г"
    },
    cookingTime: "7-10 мин",
    spicyLevel: "Средне-острое"
  },
  {
    id: "fries-xl",
    name: "Картофель Фри XL",
    description: "Хрустящий снаружи и мягкий внутри картофель фри с крупной морской солью и ароматными травами.",
    price: 190,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nhWGNwJQ8wYydrV0cIgticr26b_X7F3CiJVqfmbzcaG56g-xEEiPw4ZRxtvZfWCWYkmLWilW6tBn5BBy67YoPP1lBnWWO5Pe1rcsQ1zb8ypqmXAHm6BwHF23uCQPt1P1nPMM4jKFF-q0c62BnRnm3EIBQCDHd_QxXtcgpwI2glENZZi15F61YZZT-PN2J3y6-QIgWReLoJU0WGfHD4dA0KZ6Oq2v7h44aT2vwLpZ8xuXsaK9HrTmQQ0ViND0DpSwknSh5tS4dp8",
    category: Category.SIDES,
    nutrition: {
      calories: "320 ккал",
      proteins: "4 г",
      fats: "16 г",
      carbs: "38 г"
    },
    cookingTime: "5 мин",
    spicyLevel: "Неострое"
  },
  {
    id: "hummus-traditional",
    name: "Хумус с оливковым маслом",
    description: "Нежное шелковистое пюре из отборного нута с тахини, соком свежего лимона и оливковым маслом Extra Virgin.",
    price: 250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVwPS_hCEPY5KKrjicgorGxfqcocU6Q0v7wFO-jrIaVRUhxzkgv_Us3Dikss6eOj1p-NrVth8kQ9ueuAX96NWSmDA8Zq-gE6OMh5OjpkG2GTCb6QgOH4xCQA45U2P9LSZakRGSqz6_YGswfcAs7Szbne6nyzsyMPNzcpGQkTjry6gwQsUiTNOJT3MXCDAUNga14bMZAVW3wpLxpBPwY-GTxBzSximTOE3p6X7RPv4kdpB6aqjxGu5EY5iT81L-1gTq6MoKKx6fZlE",
    category: Category.SIDES,
    nutrition: {
      calories: "280 ккал",
      proteins: "8 г",
      fats: "18 г",
      carbs: "22 г"
    },
    cookingTime: "3-5 мин",
    spicyLevel: "Неострое"
  },
  {
    id: "ayran-glass",
    name: "Айран Традиционный",
    description: "Прохладный, освежающий кавказский айран с мелко порубленной мятой и легкой кислинкой.",
    price: 130,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwKLbEMWOfpK1ZjVXUKkk4zAulzXFQ6ltasYrQATWcgSQjDRhVZ0bKqXGzJTIlHKwxvMTPwveToQLwD3dqFV6Ofk1nLJRzLBUfQIPaj1PVCsb02OEGWDWdSF-ErEdx8unHclGCFpDS-ttrahGMEMWrl7FW8cmcoe3IXoaFl928Sw9Jojy-dSDydNuG8F091EHEPHzRgvHibveR5Tw9e10KMZK_JP33azmpcg9lMRA3zp8nQqQUkTqIikBEd4G_pzBJLO6i0-7k2c",
    category: Category.DRINKS,
    nutrition: {
      calories: "80 ккал",
      proteins: "3 г",
      fats: "4 г",
      carbs: "3 г"
    },
    cookingTime: "2 мин",
    spicyLevel: "Неострое"
  }
];
