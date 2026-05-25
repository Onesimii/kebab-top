/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onGoToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end select-none">
      {/* Backdrop overlay filter */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Tray panel */}
      <div className="relative w-full max-w-md bg-surface-container h-full shadow-[2px_0_35px_rgba(0,0,0,0.6)] flex flex-col justify-between border-l border-outline-variant/30 animate-slide-in-right">
        {/* Tray Head */}
        <div className="p-6 bg-surface-container-highest border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h3 className="font-display font-extrabold text-lg text-white">Корзина</h3>
            {cart.length > 0 && (
              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-wide font-extrabold px-2 py-0.5 rounded-full font-label-lg">
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:text-white hover:bg-surface-container-high cursor-pointer transition-all"
            id="cart-drawer-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tray Body Content lists */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant/25 flex items-center justify-center text-on-surface-variant/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">Корзина пуста</h4>
                <p className="text-xs text-on-surface-variant max-w-[200px] mx-auto mt-2 leading-relaxed">
                  Выберите самые сочные кебабы и шаурму из нашего меню уличного гриля!
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-primary/10 hover:bg-primary transition-all text-primary hover:text-on-primary font-bold text-xs px-6 py-2.5 rounded-lg border border-primary/20"
              >
                Вернуться в меню
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const hasAdditions = item.options.extraOnion || item.options.extraSauceCount > 0;
              return (
                <div
                  key={item.id}
                  className="flex gap-4 py-3 border-b border-outline-variant/10 last:border-0"
                  id={`drawer-item-${item.id}`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/15 bg-surface">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-label-lg text-sm text-on-surface font-extrabold line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-primary font-bold text-xs font-label-sm whitespace-nowrap pl-2">
                          {item.price * item.quantity} ₽
                        </span>
                      </div>
                      {hasAdditions && (
                        <p className="text-[10px] text-primary font-semibold mt-0.5">
                          [
                          {item.options.extraSauceCount > 0 &&
                            `соус x${item.options.extraSauceCount}`}
                          {item.options.extraSauceCount > 0 && item.options.extraOnion && ", "}
                          {item.options.extraOnion && "маринов. лук"}
                          ]
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5.5 h-5.5 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-[11px] font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5.5 h-5.5 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-on-surface-variant hover:text-red-400 transition-colors p-1 rounded hover:bg-surface-container cursor-pointer"
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

        {/* Tray Footer Pricing + checkout actions */}
        {cart.length > 0 && (
          <div className="p-6 bg-surface-container-high border-t border-outline-variant/15 space-y-4">
            <div className="flex justify-between items-center text-on-surface">
              <span className="font-display font-extrabold text-sm uppercase tracking-wider">
                Сумма заказа
              </span>
              <span className="text-xl font-black text-primary font-mono">{cartTotal} ₽</span>
            </div>
            <button
              onClick={onGoToCheckout}
              className="w-full py-4 bg-primary text-on-primary font-display font-extrabold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:glow-orange-sm active:scale-[0.98] transition-all cursor-pointer shadow-lg"
              id="drawer-checkout-btn"
            >
              <span>Оформить заказ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
