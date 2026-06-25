/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Truck, CreditCard, Trash2, ArrowRight, HelpCircle, Check, MapPin } from "lucide-react";
import { CartItem, DeliveryDetails, PaymentMethod } from "../types";

interface CheckoutProps {
  cart: CartItem[];
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateAddress: (fields: Partial<DeliveryDetails>) => void;
  onUpdatePayment: (method: PaymentMethod) => void;
  onSubmitOrder: () => void;
  onBackToMenu: () => void;
}

export default function Checkout({
  cart,
  deliveryDetails,
  paymentMethod,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateAddress,
  onUpdatePayment,
  onSubmitOrder,
  onBackToMenu,
}: CheckoutProps) {
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: boolean } = {};
    if (!deliveryDetails.city.trim()) errors.city = true;
    if (!deliveryDetails.street.trim()) errors.street = true;
    if (!deliveryDetails.building.trim()) errors.building = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (cart.length === 0) {
      return;
    }

    setFormErrors({});
    onSubmitOrder();
  };

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-16" id="checkout-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left column: Address + Payment Form */}
        <form onSubmit={handleValidateAndSubmit} className="flex-1 space-y-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-6 text-primary">
              Оформление заказа
            </h1>

            {/* Delivery address panel */}
            <div className="bg-surface-container p-6 md:p-8 rounded-2xl space-y-6 shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-3 border-b border-outline-variant/15 pb-4">
                <Truck className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-white">Адрес доставки</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs font-bold text-on-surface-variant font-label-lg">
                    Город *
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={deliveryDetails.city}
                    onChange={(e) => {
                      onUpdateAddress({ city: e.target.value });
                      if (e.target.value.trim() && formErrors.city) {
                        setFormErrors((prev) => ({ ...prev, city: false }));
                      }
                    }}
                    className={`w-full bg-surface-container-lowest border rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                      formErrors.city ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-outline-variant"
                    }`}
                    placeholder="Москва"
                  />
                  {formErrors.city && (
                    <span className="text-[10px] text-red-400 font-bold ml-1 animate-fade-in">
                      * Обязательное поле
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="street" className="text-xs font-bold text-on-surface-variant font-label-lg">
                    Улица *
                  </label>
                  <input
                    id="street"
                    type="text"
                    value={deliveryDetails.street}
                    onChange={(e) => {
                      onUpdateAddress({ street: e.target.value });
                      if (e.target.value.trim() && formErrors.street) {
                        setFormErrors((prev) => ({ ...prev, street: false }));
                      }
                    }}
                    className={`w-full bg-surface-container-lowest border rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                      formErrors.street ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-outline-variant"
                    }`}
                    placeholder="Введите название улицы"
                  />
                  {formErrors.street && (
                    <span className="text-[10px] text-red-400 font-bold ml-1 animate-fade-in">
                      * Обязательное поле
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                  <div className="space-y-1.5">
                    <label htmlFor="building" className="text-xs font-bold text-on-surface-variant font-label-lg">
                      Дом *
                    </label>
                    <input
                      id="building"
                      type="text"
                      value={deliveryDetails.building}
                      onChange={(e) => {
                        onUpdateAddress({ building: e.target.value });
                        if (e.target.value.trim() && formErrors.building) {
                          setFormErrors((prev) => ({ ...prev, building: false }));
                        }
                      }}
                      className={`w-full bg-surface-container-lowest border rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                        formErrors.building ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-outline-variant"
                      }`}
                      placeholder="12"
                    />
                    {formErrors.building && (
                      <span className="text-[10px] text-red-400 font-bold ml-1 animate-fade-in">
                        * Обязательно
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="entrance" className="text-xs font-bold text-on-surface-variant font-label-lg">
                      Подъезд
                    </label>
                    <input
                      id="entrance"
                      type="text"
                      value={deliveryDetails.entrance}
                      onChange={(e) => onUpdateAddress({ entrance: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="apartment" className="text-xs font-bold text-on-surface-variant font-label-lg">
                      Квартира
                    </label>
                    <input
                      id="apartment"
                      type="text"
                      value={deliveryDetails.apartment}
                      onChange={(e) => onUpdateAddress({ apartment: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="42"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="comment" className="text-xs font-bold text-on-surface-variant font-label-lg">
                  Комментарий курьеру
                </label>
                <textarea
                  id="comment"
                  value={deliveryDetails.comment}
                  onChange={(e) => onUpdateAddress({ comment: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-on-surface transition-all font-medium text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Код домофона, как быстрее найти вход..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-surface-container p-6 md:p-8 rounded-2xl space-y-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-3 border-b border-outline-variant/15 pb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 id="payment-method-heading" className="font-display text-xl font-bold text-white">
                Способ оплаты
              </h2>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="payment-method-heading"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Card option toggler */}
              <div
                role="radio"
                aria-checked={paymentMethod === PaymentMethod.CARD}
                tabIndex={0}
                onClick={() => onUpdatePayment(PaymentMethod.CARD)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onUpdatePayment(PaymentMethod.CARD);
                  }
                }}
                className={`relative flex items-center p-5 rounded-xl cursor-pointer transition-all border-2 group select-none outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  paymentMethod === PaymentMethod.CARD
                    ? "bg-surface-container-lowest border-primary"
                    : "bg-surface-container-lowest border-outline-variant hover:border-primary/50"
                }`}
                id="payment-method-card"
              >
                <div className="flex items-center gap-3">
                  <CreditCard
                    className={`w-5 h-5 ${
                      paymentMethod === PaymentMethod.CARD
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-sm text-on-surface font-semibold">
                      Банковская карта
                    </span>
                    <span className="text-xs text-on-surface-variant">Онлайн на сайте</span>
                  </div>
                </div>
                {paymentMethod === PaymentMethod.CARD && (
                  <span className="absolute top-2.5 right-2.5 bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center border border-primary text-[10px]">
                    ✓
                  </span>
                )}
              </div>

              {/* Cash option toggler */}
              <div
                role="radio"
                aria-checked={paymentMethod === PaymentMethod.CASH}
                tabIndex={0}
                onClick={() => onUpdatePayment(PaymentMethod.CASH)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onUpdatePayment(PaymentMethod.CASH);
                  }
                }}
                className={`relative flex items-center p-5 rounded-xl cursor-pointer transition-all border-2 group select-none outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  paymentMethod === PaymentMethod.CASH
                    ? "bg-surface-container-lowest border-primary"
                    : "bg-surface-container-lowest border-outline-variant hover:border-primary/50"
                }`}
                id="payment-method-cash"
              >
                <div className="flex items-center gap-3">
                  <Truck
                    className={`w-5 h-5 ${
                      paymentMethod === PaymentMethod.CASH
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-sm text-on-surface font-semibold">
                      Наличными
                    </span>
                    <span className="text-xs text-on-surface-variant">Курьеру при получении</span>
                  </div>
                </div>
                {paymentMethod === PaymentMethod.CASH && (
                  <span className="absolute top-2.5 right-2.5 bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center border border-primary text-[10px]">
                    ✓
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Right column: Sticky Order Summary panel */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-surface-container-high rounded-2xl overflow-hidden sticky top-24 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-outline-variant/20">
            <div className="p-5 bg-surface-container-highest border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-display font-extrabold text-lg text-primary">Ваш заказ</h3>
              <button
                onClick={onBackToMenu}
                className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                id="btn-add-more-checkout"
              >
                + Добавить блюда
              </button>
            </div>

            {/* Cart products list */}
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar px-5 py-3 space-y-4">
              {cart.length === 0 ? (
                <div className="py-8 text-center" id="empty-cart-indicator">
                  <p className="text-sm text-on-surface-variant font-medium">Ваша корзина пуста</p>
                  <button
                    onClick={onBackToMenu}
                    className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold font-label-lg"
                  >
                    Перейти к меню
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const hasAdditions = item.options.extraSauceCount > 0 || item.options.extraOnion;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 py-3 border-b border-outline-variant/10 last:border-0"
                      id={`cart-item-${item.id}`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/15 bg-surface">
                        <img
                          className="w-full h-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-label-lg text-sm text-on-surface font-bold line-clamp-1">
                              {item.name}
                            </span>
                            {hasAdditions && (
                              <p className="text-[10px] text-primary font-semibold mt-0.5">
                                [
                                {item.options.extraSauceCount > 0 &&
                                  `соус x${item.options.extraSauceCount}`}
                                {item.options.extraSauceCount > 0 &&
                                  item.options.extraOnion &&
                                  ", "}
                                {item.options.extraOnion && "маринов. лук"}
                                ]
                              </p>
                            )}
                          </div>
                          <span className="text-primary font-bold text-sm font-label-lg pl-2">
                            {item.price * item.quantity} ₽
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all cursor-pointer"
                              id={`qty-dec-${item.id}`}
                              aria-label="Уменьшить количество"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all cursor-pointer"
                              id={`qty-inc-${item.id}`}
                              aria-label="Увеличить количество"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-on-surface-variant hover:text-red-400 transition-colors p-1 rounded hover:bg-surface-container cursor-pointer"
                            id={`trash-${item.id}`}
                            aria-label="Удалить из корзины"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Calculations & Submit button */}
            <div className="p-5 space-y-4 bg-surface-container-high border-t border-outline-variant/15">
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Сумма заказа</span>
                <span className="font-mono">{cartTotal} ₽</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Доставка</span>
                <span className="text-primary font-bold">Бесплатно</span>
              </div>
              <div className="pt-3 border-t border-outline-variant/15 flex justify-between items-center text-on-surface">
                <span className="font-display font-extrabold text-base">Итого</span>
                <span className="text-xl font-black text-primary">{cartTotal} ₽</span>
              </div>

              <button
                onClick={handleValidateAndSubmit}
                disabled={cart.length === 0}
                className={`w-full py-4 mt-2 font-display font-extrabold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                  cart.length === 0
                    ? "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed opacity-60"
                    : "bg-primary text-on-primary hover:glow-orange-sm active:scale-[0.98] cursor-pointer"
                }`}
                id="btn-place-order"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-on-surface-variant/50 leading-relaxed font-medium">
                Нажимая кнопку, вы соглашаетесь с условиями{" "}
                <a href="#offer" className="underline hover:text-primary transition-colors">
                  оферты
                </a>{" "}
                и{" "}
                <a href="#rules" className="underline hover:text-primary transition-colors">
                  политикой конфиденциальности
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
