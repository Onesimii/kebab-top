/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingCart, Menu, Flame } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onNavigate: (screen: "menu" | "checkout" | "detail") => void;
  onCartClick: () => void;
  currentScreen: string;
}

export default function Header({
  cartCount,
  onNavigate,
  onCartClick,
  currentScreen,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 dark:bg-surface/95 backdrop-blur-md shadow-[0_4px_20px_rgba(30,20,10,0.4)] transition-all">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Brand Logo with glowing effect */}
        <button
          onClick={() => onNavigate("menu")}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          id="btn-logo"
        >
          <Flame className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-display text-xl md:text-2xl font-extrabold text-primary uppercase tracking-tighter">
            Flame &amp; Pita
          </span>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-12">
          <button
            onClick={() => onNavigate("menu")}
            className={`font-label-lg font-bold text-sm tracking-widest uppercase transition-colors cursor-pointer ${
              currentScreen === "menu"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
            id="nav-menu"
          >
            Меню
          </button>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("menu");
              setTimeout(() => {
                document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-on-surface-variant font-bold text-sm tracking-widest uppercase hover:text-primary transition-colors font-label-lg"
          >
            Контакты
          </a>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("menu");
              setTimeout(() => {
                document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-on-surface-variant font-bold text-sm tracking-widest uppercase hover:text-primary transition-colors font-label-lg"
          >
            О Нас
          </a>
        </nav>

        {/* Cart Trigger Button & Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container-high cursor-pointer"
            id="btn-cart-icon"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate("checkout")}
            className="hidden sm:inline-block bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-lg text-sm font-bold hover:glow-orange-sm transition-all active:scale-95 cursor-pointer"
            id="btn-checkout-top"
          >
            Оформить
          </button>
        </div>
      </div>
    </header>
  );
}
