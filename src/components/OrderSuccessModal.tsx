/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Sparkles, Flame, User } from "lucide-react";
import { CartItem, DeliveryDetails } from "../types";

interface OrderSuccessModalProps {
  cart: CartItem[];
  deliveryDetails: DeliveryDetails;
  totalPrice: number;
  onClose: () => void;
}

export default function OrderSuccessModal({
  cart,
  deliveryDetails,
  totalPrice,
  onClose,
}: OrderSuccessModalProps) {
  const [prepStep, setPrepStep] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(1200); // 20 minutes in seconds

  const steps = [
    { label: "Принимаем и подтверждаем заказ", desc: "Уже передали информацию на кухню", activeIcon: Sparkles },
    { label: "Маринуем мясо и готовим шампуры", desc: "Шеф-повар отбирает специи собственного помола", activeIcon: Flame },
    { label: "Кебаб подрумянивается на березовых углях", desc: "Обжариваем до безупречной корочки", activeIcon: Flame },
    { label: "Свежевыпеченная пита и упаковка", desc: "Сохраняем сочность и жар в термопакетах", activeIcon: CheckCircle },
    { label: "Курьер мчится на ваш адрес", desc: "Горячий ужин будет у вас с минуты на минуту!", activeIcon: MapPin },
  ];

  // Simulating the preparation steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setPrepStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 12000); // changes step every 12 seconds in preview

    return () => clearInterval(stepInterval);
  }, []);

  // Simulating countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const simulatedOrderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar select-none">
      <div className="bg-surface-container max-w-2xl w-full rounded-2xl overflow-hidden border border-primary/30 shadow-[0_12px_45px_rgba(0,0,0,0.6)] animate-scale-up">
        {/* Glowing Head */}
        <div className="p-6 md:p-8 bg-surface-container-highest border-b border-outline-variant/30 text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-primary"></div>
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-primary uppercase tracking-[0.25em] font-extrabold">
              Заказ №{simulatedOrderId} Успешно Оформлен!
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-white mt-1">
              Ваш кебаб готовится!
            </h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Progress Steps */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-base text-primary uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Статус приготовления
            </h3>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
              {steps.map((step, idx) => {
                const Icon = step.activeIcon;
                const isCompleted = idx < prepStep;
                const isCurrent = idx === prepStep;
                const isPending = idx > prepStep;

                return (
                  <div
                    key={idx}
                    className={`relative transition-all duration-300 ${
                      isPending ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <div
                      className={`absolute -left-6 top-1 w-4.5 h-4.5 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : isCurrent
                          ? "bg-primary border-primary text-black animate-pulse"
                          : "bg-surface-container-low border-outline-variant text-on-surface-variant"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <div>
                      <h4
                        className={`font-label-lg text-sm font-bold ${
                          isCurrent ? "text-primary font-extrabold" : "text-white"
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-on-surface-variant text-xs mt-0.5 leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Time estimation + Delivery Details */}
          <div className="space-y-6">
            {/* Delivery time count panel */}
            <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Clock className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <div>
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                  Ориентировочное время доставки
                </span>
                <div className="text-2xl font-black text-white mt-1 font-mono">
                  {formatTime(secondsLeft)}
                </div>
              </div>
            </div>

            {/* Address Summary */}
            <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/15 space-y-3 text-xs leading-normal">
              <h4 className="font-label-lg font-bold text-primary uppercase text-xs tracking-wider mb-2">
                Адрес Доставки
              </h4>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white font-medium">
                  {deliveryDetails.city}, {deliveryDetails.street}, д. {deliveryDetails.building}
                  {deliveryDetails.entrance ? `, под. ${deliveryDetails.entrance}` : ""}
                  {deliveryDetails.apartment ? `, кв. ${deliveryDetails.apartment}` : ""}
                </span>
              </div>
              {deliveryDetails.comment && (
                <div className="pt-2.5 border-t border-outline-variant/10 text-on-surface-variant italic">
                  &ldquo;{deliveryDetails.comment}&rdquo;
                </div>
              )}
            </div>

            {/* Order total list summary */}
            <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/15 space-y-3 text-xs">
              <h4 className="font-label-lg font-bold text-primary uppercase text-xs tracking-wider border-b border-outline-variant/10 pb-2">
                Сводка заказа
              </h4>
              <div className="space-y-2 max-h-[100px] overflow-y-auto custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between font-medium">
                    <span className="text-on-surface-variant">
                      {item.name} <span className="text-primary">x{item.quantity}</span>
                    </span>
                    <span className="text-white">{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>
              <div className="pt-2.5 border-t border-outline-variant/10 flex justify-between font-bold text-sm text-white">
                <span className="font-display">Оплачено</span>
                <span className="text-primary font-black">{totalPrice} ₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 md:p-8 bg-surface-container-high border-t border-outline-variant/30 flex justify-center">
          <button
            onClick={onClose}
            className="bg-primary text-on-primary px-10 py-3.5 rounded-xl font-display text-xs tracking-widest font-extrabold uppercase hover:glow-orange-sm transition-all active:scale-95 cursor-pointer"
            id="success-btn-close"
          >
            К новым вкусам!
          </button>
        </div>
      </div>
    </div>
  );
}
