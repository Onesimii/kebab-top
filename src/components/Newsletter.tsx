/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Пожалуйста, введите корректный адрес электронной почты!");
      return;
    }
    setSubscribed(true);
    setError(null);
    setEmail("");
  };

  return (
    <section className="py-20 bg-surface-container-low charcoal-grain border-y border-outline-variant/15 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Pitch info */}
        <div>
          <span className="text-primary font-bold text-xs tracking-widest uppercase mb-3 block">
            Скидка за подписку
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white mb-6">
            Получайте <span className="text-primary">горячие</span> предложения
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">
            Подпишитесь на нашу фирменную рассылку и мгновенно получите промокод на скидку 15% для вашего первого заказа. Только сочные кулинарные новости и закрытые акции для своих.
          </p>
        </div>

        {/* Dynamic Subscribe Form Card */}
        <div className="bg-surface-container-high p-8 rounded-2xl shadow-xl border border-outline-variant/20 relative overflow-hidden">
          {subscribed ? (
            <div className="py-10 text-center space-y-4 animate-fade-in" id="subscribe-success">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Вы в клубе любителей огня!</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mx-auto leading-normal">
                Проверьте вашу почту — мы отправили вам промокод на <strong>скидку 15%</strong> на первый сочный заказ!
              </p>
              <button
                onClick={() => setSubscribed(false)}
                className="text-xs text-primary underline block mx-auto font-semibold hover:text-white transition-colors cursor-pointer"
              >
                Подписать другой email
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-5"
              id="subscribe-form"
              noValidate
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="newsletter-email"
                  className="font-label-lg text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-wider"
                >
                  Ваш Email
                </label>
                <div className="relative">
                  <input
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className={`w-full bg-surface-container-lowest border rounded-xl pl-11 pr-4 py-3.5 text-on-surface text-sm outline-none transition-all placeholder:text-on-surface-variant/30 font-medium ${
                      error
                        ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="kebab-lover@mail.com"
                    type="email"
                    required
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                  />
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-on-surface-variant/55" />
                </div>
                {error && (
                  <p
                    id="newsletter-error"
                    className="text-xs text-red-400 font-bold ml-1 animate-fade-in"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-display text-xs tracking-widest font-extrabold uppercase hover:glow-orange-sm transition-all active:scale-[0.98] cursor-pointer shadow-lg"
                id="btn-subscribe"
              >
                Подписаться
              </button>
              <p className="text-[10px] text-on-surface-variant/60 text-center leading-normal font-medium mt-1">
                Нажимая кнопку, вы безоговорочно соглашаетесь со всеми условиями обработки персональных данных и нашей политикой конфиденциальности.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
