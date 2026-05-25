/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Share2, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Flame & Pita | Authentic Street Grilling',
        text: 'The most succulent kebabs in town, handcrafted with original spices!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Ссылка скопирована в буфер обмена!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <footer
      id="footer"
      className="w-full mt-20 bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand Info */}
          <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
            <span className="font-display text-2xl text-primary font-extrabold tracking-tighter uppercase">
              Flame &amp; Pita
            </span>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              Аутентичный вкус уличного гриля. Свежевыпеченная пита, сочное мясо на углях и секретные специи.
            </p>
            <span className="text-on-surface-variant/60 font-mono text-[11px] mt-2">
              © {new Date().getFullYear()} Flame &amp; Pita. All Rights Reserved.
            </span>
          </div>

          {/* Quick Details & Location */}
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <h4 className="text-primary font-display font-bold text-base uppercase tracking-wider">
              Контакты и Адрес
            </h4>
            <div className="flex flex-col gap-2.5 text-on-surface-variant text-sm">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Москва, ул. Пятницкая, д. 12</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Ежедневно: 10:00 — 23:00</span>
              </div>
            </div>
          </div>

          {/* Social Interactions & Sharing */}
          <div className="flex flex-col items-center md:items-end justify-between h-full gap-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end text-sm">
              <a href="#privacy" className="text-on-surface-variant hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-on-surface-variant hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#careers" className="text-on-surface-variant hover:text-primary transition-colors">
                Careers
              </a>
            </div>

            <div className="flex gap-4">
              <button
                onClick={shareApp}
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-all cursor-pointer"
                title="Поделиться"
                id="btn-share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-all"
                title="Открыть на карте"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
