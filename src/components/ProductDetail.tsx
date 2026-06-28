/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Plus, Minus, Clock, Flame, Utensils, Check } from "lucide-react";
import { MenuItem } from "../types";

interface ProductDetailProps {
  product: MenuItem;
  onBack: () => void;
  onAddToCart: (product: MenuItem, extraSauceCount: number, extraOnion: boolean) => void;
}

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
}: ProductDetailProps) {
  const [extraSauceCount, setExtraSauceCount] = useState<number>(0);
  const [extraOnion, setExtraOnion] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const saucePrice = 50;
  const onionPrice = 30;

  const currentPrice = product.price + extraSauceCount * saucePrice + (extraOnion ? onionPrice : 0);

  const handleIncrementSauce = () => {
    setExtraSauceCount((prev) => prev + 1);
  };

  const handleDecrementSauce = () => {
    setExtraSauceCount((prev) => Math.max(0, prev - 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, extraSauceCount, extraOnion);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onBack();
    }, 1200);
  };

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-16" id="product-detail-screen">
      {/* Back to menu button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group cursor-pointer"
          id="btn-back-menu"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-label-lg text-sm font-bold tracking-wider uppercase">
            Назад в меню
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Heavy High-End Product image with rotating Price Tag */}
        <div className="lg:col-span-7 relative group">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-outline-variant/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
            />
          </div>
          {/* Sizzling Orange Price Tag */}
          <div className="absolute top-6 right-6 bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-display text-xl font-extrabold shadow-lg transform rotate-2">
            {product.price} ₽
          </div>
        </div>

        {/* Right Column: Descriptions & Real-time configurator */}
        <div className="lg:col-span-5 space-y-8">
          <section>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              {product.description}
            </p>
          </section>

          {/* Ingredients list chips */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/20">
              <h3 className="font-label-lg text-xs font-bold text-tertiary mb-3 uppercase tracking-widest">
                Ингредиенты
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-surface-container-high rounded-full border border-outline-variant text-on-surface text-xs font-semibold"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization Controls */}
          <div className="space-y-4">
            <h3 className="font-label-lg text-xs font-bold text-tertiary uppercase tracking-widest">
              Добавить к заказу
            </h3>
            <div className="space-y-3">
              {/* Extra sauce counter */}
              <div className="flex justify-between items-center p-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                    <span className="text-primary text-xs font-bold font-mono">Соус</span>
                  </div>
                  <div>
                    <div className="font-label-lg text-sm text-on-surface font-bold">
                      Дополнительный соус
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium mt-0.5">
                      +50 ₽ / порция
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrementSauce}
                    className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    id="sauce-decrement"
                    aria-label="Уменьшить количество соуса"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-label-lg font-bold w-5 text-center text-sm">
                    {extraSauceCount}
                  </span>
                  <button
                    onClick={handleIncrementSauce}
                    className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    id="sauce-increment"
                    aria-label="Увеличить количество соуса"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Red Onion toggle */}
              <div className="flex justify-between items-center p-4 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                    <span className="text-primary text-xs font-bold font-mono">Лук</span>
                  </div>
                  <div>
                    <div className="font-label-lg text-sm text-on-surface font-bold">
                      Больше маринованного лука
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium mt-0.5">
                      +30 ₽
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    checked={extraOnion}
                    onChange={(e) => setExtraOnion(e.target.checked)}
                    className="sr-only peer"
                    type="checkbox"
                    id="checkbox-onion"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-secondary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Core Interactive Add to Cart CTA */}
          <div className="pt-6 border-t border-outline-variant/20">
            <button
              onClick={handleAddToCart}
              disabled={addedAnimation}
              className={`w-full py-4 rounded-xl font-display text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:glow-orange-sm transition-all active:scale-[0.98] shadow-lg cursor-pointer ${
                addedAnimation
                  ? "bg-emerald-600 text-white"
                  : "bg-primary-container text-on-primary-container"
              }`}
              id="detail-add-to-cart"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5" />
                  Добавлено в корзину!
                </>
              ) : (
                <>
                  <Utensils className="w-4 h-4" />
                  Добавить в корзину — {currentPrice} ₽
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Nutrition + Flavor secrets bottom row */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
          <h3 className="font-display text-xl font-extrabold text-primary mb-4">
            Пищевая ценность
          </h3>
          <ul className="space-y-3.5 text-xs">
            <li className="flex justify-between border-b border-outline-variant/10 pb-2">
              <span className="text-on-surface-variant font-medium">Калории</span>
              <span className="text-on-surface font-extrabold">
                {product.nutrition?.calories || "380 ккал"}
              </span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/10 pb-2">
              <span className="text-on-surface-variant font-medium">Белки</span>
              <span className="text-on-surface font-extrabold">
                {product.nutrition?.proteins || "22 г"}
              </span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/10 pb-2">
              <span className="text-on-surface-variant font-medium">Жиры</span>
              <span className="text-on-surface font-extrabold">
                {product.nutrition?.fats || "24 г"}
              </span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/10 pb-2">
              <span className="text-on-surface-variant font-medium">Углеводы</span>
              <span className="text-on-surface font-extrabold">
                {product.nutrition?.carbs || "8 г"}
              </span>
            </li>
          </ul>
          <div className="mt-4 text-[11px] text-tertiary italic leading-normal">
            * Рассчитано на порцию 250г без учета соусов.
          </div>
        </div>

        <div className="md:col-span-2 p-8 pita-gradient rounded-2xl border border-outline-variant/20 flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 flex-shrink-0">
              <Flame className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-1">
                Секрет вкуса
              </h4>
              <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                Мы используем исключительно охлажденное фермерское мясо и перемалываем его вручную, чтобы сохранить первозданную текстуру, затем обжариваем его на березовых углях.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-background/50 rounded-xl">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <div className="font-label-lg text-white font-bold text-sm">
                {product.cookingTime || "12-15 мин"}
              </div>
              <div className="text-[10px] text-on-surface-variant mt-0.5">Время готовки</div>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <Utensils className="w-5 h-5 text-primary mb-2" />
              <div className="font-label-lg text-white font-bold text-sm">
                {product.spicyLevel || "Средне-острое"}
              </div>
              <div className="text-[10px] text-on-surface-variant mt-0.5">Уровень специй</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
