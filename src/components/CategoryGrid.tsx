/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import { MenuItem, Category, MENU_ITEMS } from "../types";

interface CategoryGridProps {
  onSelectCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
  onSelectProduct: (product: MenuItem) => void;
}

export default function CategoryGrid({
  onSelectCategory,
  selectedCategory,
  onSelectProduct,
}: CategoryGridProps) {
  const menuListRef = useRef<HTMLDivElement>(null);

  const scrollMenuList = (direction: "left" | "right") => {
    if (menuListRef.current) {
      const scrollAmt = direction === "left" ? -350 : 350;
      menuListRef.current.scrollBy({ left: scrollAmt, behavior: "smooth" });
    }
  };

  const filteredItems = selectedCategory
    ? MENU_ITEMS.filter((item) => item.category === selectedCategory)
    : MENU_ITEMS;

  return (
    <section id="categories-section" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Popular Categories Heading & Navigation buttons */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <span className="text-primary font-label-lg text-xs uppercase tracking-[0.25em] font-bold">
            Наш выбор
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-white">
            Популярные категории
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
              selectedCategory === null
                ? "bg-primary text-on-primary font-extrabold"
                : "border border-outline-variant text-on-surface hover:border-primary hover:text-primary"
            }`}
            id="cat-btn-all"
          >
            Все блюда
          </button>
          <button
            onClick={() => scrollMenuList("left")}
            className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all cursor-pointer"
            id="cat-scroll-left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollMenuList("right")}
            className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-all cursor-pointer"
            id="cat-scroll-right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        {/* Large Card: Кебабы */}
        <div
          onClick={() => onSelectCategory(Category.KEBABS)}
          className={`md:col-span-7 group relative h-[400px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(30,20,10,0.4)] cursor-pointer border transition-all ${
            selectedCategory === Category.KEBABS ? "border-primary scale-[0.99] ring-2 ring-primary/40" : "border-transparent"
          }`}
          id="bento-kebabs"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfjwJt0GJoppVWtBh9hHruhRe2YbxTWzMzBHKpZ51LFV1zpbGiRmYWifWa7H62A008KUrmsI0D5UZVrZkiNQkhQbkDlz1BmGRRPKjI3sk0gD77HIcXKu7DQTZ-9pGX4hsq0HOc5rAXOc6b1VhWnaDQW2hxstPE2AOIrCoLGkM3RLeKCq1wAK8xSObBQEHt7VK1VJChdPTpqPiUZE1P7mZznEtUUPzMGfChXUDGtQhd2LmcP7UlsUd1OE0y5XmCkqRAxgmJnIsPlW0"
            alt="Кебабы"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">
              Кебабы
            </h3>
            <p className="text-on-surface-variant font-sans text-sm mb-4">
              Классика на углях с фирменным томатным и чесночным соусами
            </p>
            <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-lg text-xs font-bold transition-all hover:scale-105 pointer-events-none">
              Смотреть всё
            </button>
          </div>
        </div>

        {/* Vertical Card: Шаурма */}
        <div
          onClick={() => onSelectCategory(Category.SHAWARMA)}
          className={`md:col-span-5 group relative h-[400px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(30,20,10,0.4)] cursor-pointer border transition-all ${
            selectedCategory === Category.SHAWARMA ? "border-primary scale-[0.99] ring-2 ring-primary/40" : "border-transparent"
          }`}
          id="bento-shawarma"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3QTnrXhu1RVuNmlTh2rC_jWRVnznaOFl4f04DO6XjBzi6kVYJce9_Y9c9dq_chrP1h0MR2ZNKum1WN7RO-PhuulZ7unjiGel3z0-MXpdXbucTnB55MdfofDXaI_VJ2LlQiXR7WuvAu_dBmSd2f7H6K5G7j2eUXjSqygBlwAwalLRdfD5yyB5bStqr91ugGWsz5DKTjEycdzrFtWZTIfUtaF0uO5zKRiCjwoXny6EH1FIeXgBnsaDPtfW-8Fq8yK-mG7hqpWsw3Ig"
            alt="Шаурма"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">
              Шаурма
            </h3>
            <p className="text-on-surface-variant font-sans text-sm mb-4">
              В хрустящем лаваше или согретой пите с нежнейшим куриным мясом
            </p>
            <button className="bg-surface-container-highest text-primary px-5 py-2.5 rounded-lg font-label-lg text-xs font-bold transition-all hover:scale-105 pointer-events-none">
              Выбрать начинку
            </button>
          </div>
        </div>

        {/* Half Card: Гарниры */}
        <div
          onClick={() => onSelectCategory(Category.SIDES)}
          className={`md:col-span-6 group relative h-[300px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(30,20,10,0.4)] cursor-pointer border transition-all ${
            selectedCategory === Category.SIDES ? "border-primary scale-[0.99] ring-2 ring-primary/40" : "border-transparent"
          }`}
          id="bento-sides"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVwPS_hCEPY5KKrjicgorGxfqcocU6Q0v7wFO-jrIaVRUhxzkgv_Us3Dikss6eOj1p-NrVth8kQ9ueuAX96NWSmDA8Zq-gE6OMh5OjpkG2GTCb6QgOH4xCQA45U2P9LSZakRGSqz6_YGswfcAs7Szbne6nyzsyMPNzcpGQkTjry6gwQsUiTNOJT3MXCDAUNga14bMZAVW3wpLxpBPwY-GTxBzSximTOE3p6X7RPv4kdpB6aqjxGu5EY5iT81L-1gTq6MoKKx6fZlE"
            alt="Гарниры"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider">
              Гарниры
            </h3>
            <p className="text-on-surface-variant text-xs mt-1">
              Нежный хумус, хрустящий фалафель и картофель фри
            </p>
          </div>
        </div>

        {/* Half Card: Напитки */}
        <div
          onClick={() => onSelectCategory(Category.DRINKS)}
          className={`md:col-span-6 group relative h-[300px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(30,20,10,0.4)] cursor-pointer border transition-all ${
            selectedCategory === Category.DRINKS ? "border-primary scale-[0.99] ring-2 ring-primary/40" : "border-transparent"
          }`}
          id="bento-drinks"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwwKLbEMWOfpK1ZjVXUKkk4zAulzXFQ6ltasYrQATWcgSQjDRhVZ0bKqXGzJTIlHKwxvMTPwveToQLwD3dqFV6Ofk1nLJRzLBUfQIPaj1PVCsb02OEGWDWdSF-ErEdx8unHclGCFpDS-ttrahGMEMWrl7FW8cmcoe3IXoaFl928Sw9Jojy-dSDydNuG8F091EHEPHzRgvHibveR5Tw9e10KMZK_JP33azmpcg9lMRA3zp8nQqQUkTqIikBEd4G_pzBJLO6i0-7k2c"
            alt="Напитки"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider">
              Напитки
            </h3>
            <p className="text-on-surface-variant text-xs mt-1">
              Традиционный освежающий айран и домашние прохладные лимонады
            </p>
          </div>
        </div>
      </div>

      {/* Menu list header/divider */}
      <div className="mt-20 border-t border-outline-variant/20 pt-16" id="menu-items-scroll-section">
        <div className="flex items-center gap-3 mb-8">
          <Flame className="w-6 h-6 text-primary" />
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            {selectedCategory === null
              ? "Все наши деликатесы"
              : selectedCategory === Category.KEBABS
              ? "Фирменные кебабы на углях"
              : selectedCategory === Category.SHAWARMA
              ? "Разнообразие шаурмы"
              : selectedCategory === Category.SIDES
              ? "Хрустящие гарниры"
              : "Прохладительные напитки"}
          </h3>
        </div>

        {/* Horizontal scrollable / Grid menu display */}
        <div
          ref={menuListRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 scroll-smooth custom-scrollbar"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="bg-surface-container rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1.5 border border-outline-variant/10 hover:border-primary/50 cursor-pointer flex flex-col group justify-between"
              id={`item-card-${item.id}`}
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.price > 450 && (
                    <span className="absolute top-3 left-3 bg-primary-container text-on-primary-container text-xs uppercase tracking-wider font-bold px-2 px-y rounded-md font-label-lg">
                      Шеф-Выбор
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-md text-primary font-bold px-3 py-1 rounded-lg text-sm">
                    {item.price} ₽
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-on-surface-variant text-xs mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(item);
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary transition-all duration-300 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-label-lg"
                >
                  Выбрать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
