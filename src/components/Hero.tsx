/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOrderNow, onExploreMenu }: HeroProps) {
  return (
    <section className="relative h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with warm night-grill gradient and dark overlay wrapper */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGwMz7QkM8XBz1hERnvzxeuCVwKufCjPFUWQlENf9-cbffV3MQVMTPRV73MZEcJiTwxseHPGlg1b0Z99WQfnik2p8INXErt14Pia76jMA2ErDJHlviP5QFuHep2d7WjcYmKVl1zqiqKzZqN2H8Fd68u9FEXhNFEuV5p3BrFBUr2JHms6ZE1TnEYzDu5I6ltp6NvcFSaGM3dmrBHdkNx3OUYU_ZRlU4QHyP5wJOnSpuzZHcb10lCDBK9GQCNevh-7lFkYQWeNey70"
          alt="Sizzling kebab on open grill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4 block">
          FLAME &amp; PITA • PREMIUM STREET GRILL
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.95] mb-6 text-glow font-extrabold">
          Самый сочный <br />
          <span className="text-primary">кебаб</span> в городе
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
          Аутентичный вкус уличного гриля. Свежевыпеченная пита, сочное мясо на углях и секретные специи, манящие своим ароматом.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onOrderNow}
            className="w-full sm:w-auto bg-primary text-on-primary px-12 py-4 rounded-lg font-display text-xs tracking-widest font-extrabold uppercase hover:glow-orange-sm transition-all active:scale-95 cursor-pointer"
            id="hero-order-now"
          >
            Заказать сейчас
          </button>
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto border-2 border-primary text-primary px-12 py-4 rounded-lg font-display text-xs tracking-widest font-extrabold uppercase hover:bg-primary/10 transition-all active:scale-95 cursor-pointer"
            id="hero-explore-menu"
          >
            Наше меню
          </button>
        </div>
      </div>
    </section>
  );
}
