/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Category, MenuItem, CartItem, DeliveryDetails, PaymentMethod } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import Newsletter from "./components/Newsletter";
import CartDrawer from "./components/CartDrawer";
import OrderSuccessModal from "./components/OrderSuccessModal";

const KEY_CART = "flame_pita_cart";
const KEY_ADDRESS = "flame_pita_address";

// Loaded defaults directly from the mockup screens
const DEFAULT_CART: CartItem[] = [
  {
    id: "classic-kebab-default",
    menuItemId: "classic-kebab",
    name: "Классический Кебаб",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlibOhT8FPsarURpeosXmeQmwUFHtbtVEZNC2VVvTphQ4DtNmjL_hZIOrIxfZ-bPyjTrS-I7cD2hq6z4xQAmsMoAyuS5l_q8U0l9slNwiW3Tj-I0IVqDuGx9WumXjAQf070q4bDX1dK0VYqx3QFGJsBfbbZYWpPl2hFI8h1O09XZfFw1yluIb81uZuY1xrVTGXVBlDIPgshCnwT0nk-a9f-F91NQEEUeXOBCO7t9AQnXRqnI03n_CfJ6niWrOV26jLPMtRpkP-ZHE",
    quantity: 1,
    options: {
      extraSauceCount: 0,
      extraOnion: false,
    },
    basePrice: 450,
  },
  {
    id: "fries-xl-default",
    menuItemId: "fries-xl",
    name: "Картофель Фри XL",
    price: 190,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nhWGNwJQ8wYydrV0cIgticr26b_X7F3CiJVqfmbzcaG56g-xEEiPw4ZRxtvZfWCWYkmLWilW6tBn5BBy67YoPP1lBnWWO5Pe1rcsQ1zb8ypqmXAHm6BwHF23uCQPt1P1nPMM4jKFF-q0c62BnRnm3EIBQCDHd_QxXtcgpwI2glENZZi15F61YZZT-PN2J3y6-QIgWReLoJU0WGfHD4dA0KZ6Oq2v7h44aT2vwLpZ8xuXsaK9HrTmQQ0ViND0DpSwknSh5tS4dp8",
    quantity: 1,
    options: {
      extraSauceCount: 0,
      extraOnion: false,
    },
    basePrice: 190,
  },
];

const DEFAULT_ADDRESS: DeliveryDetails = {
  city: "Москва",
  street: "",
  building: "12",
  entrance: "1",
  apartment: "42",
  comment: "",
};

export default function App() {
  // Screens state: "menu", "detail", "checkout"
  const [currentScreen, setCurrentScreen] = useState<"menu" | "detail" | "checkout">("menu");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(KEY_CART);
      return saved ? JSON.parse(saved) : DEFAULT_CART;
    } catch {
      return DEFAULT_CART;
    }
  });

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>(() => {
    try {
      const saved = localStorage.getItem(KEY_ADDRESS);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESS;
    } catch {
      return DEFAULT_ADDRESS;
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CARD);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState<{
    cart: CartItem[];
    total: number;
    details: DeliveryDetails;
  } | null>(null);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(KEY_CART, JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const handleUpdateAddress = (fields: Partial<DeliveryDetails>) => {
    const updated = { ...deliveryDetails, ...fields };
    setDeliveryDetails(updated);
    try {
      localStorage.setItem(KEY_ADDRESS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (product: MenuItem, extraSauceCount: number, extraOnion: boolean) => {
    const sauceCost = extraSauceCount * 50;
    const onionCost = extraOnion ? 30 : 0;
    const finalUnitPrice = product.price + sauceCost + onionCost;

    // Create a unique identifier for this product-configuration combination
    const instanceId = `${product.id}-s${extraSauceCount}-o${extraOnion ? "1" : "0"}`;

    const existingIndex = cart.findIndex((item) => item.id === instanceId);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: instanceId,
        menuItemId: product.id,
        name: product.name,
        price: finalUnitPrice,
        basePrice: product.price,
        image: product.image,
        quantity: 1,
        options: {
          extraSauceCount,
          extraOnion,
        },
      };
      saveCart([...cart, newItem]);
    }
  };

  const handlePlaceOrder = () => {
    const total = cart.reduce((acc, current) => acc + current.price * current.quantity, 0);
    setPlacedOrderSummary({
      cart: [...cart],
      total,
      details: { ...deliveryDetails },
    });
    setIsOrderPlaced(true);
  };

  const clearCartAndReset = () => {
    saveCart([]);
    setIsOrderPlaced(false);
    setPlacedOrderSummary(null);
    setCurrentScreen("menu");
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-background text-on-background font-sans min-h-screen custom-scrollbar flex flex-col justify-between overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      {/* Universal header */}
      <Header
        cartCount={cartItemsCount}
        onNavigate={(screen) => {
          if (screen === "detail" && selectedProduct) {
            setCurrentScreen("detail");
          } else if (screen === "checkout") {
            setCurrentScreen("checkout");
          } else {
            setCurrentScreen("menu");
          }
        }}
        onCartClick={() => setIsCartOpen(true)}
        currentScreen={currentScreen}
      />

      {/* Primary Routing Showcase */}
      <div className="flex-grow">
        {currentScreen === "menu" ? (
          <>
            <Hero
              onOrderNow={() => {
                // Instantly open Detail Screen for Lula kebab (our hero product) or scroll categories
                const lulaItem = /* Default lamb */ {
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
                    carbs: "6 г",
                  },
                  cookingTime: "15-20 мин",
                  spicyLevel: "Средне-острое",
                };
                setSelectedProduct(lulaItem);
                setCurrentScreen("detail");
              }}
              onExploreMenu={() => {
                document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onSelectProduct={(prod) => {
                setSelectedProduct(prod);
                setCurrentScreen("detail");
              }}
            />
            <Newsletter />
          </>
        ) : currentScreen === "detail" && selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => {
              setCurrentScreen("menu");
            }}
            onAddToCart={handleAddToCart}
          />
        ) : currentScreen === "checkout" ? (
          <Checkout
            cart={cart}
            deliveryDetails={deliveryDetails}
            paymentMethod={paymentMethod}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateAddress={handleUpdateAddress}
            onUpdatePayment={(method) => setPaymentMethod(method)}
            onSubmitOrder={handlePlaceOrder}
            onBackToMenu={() => setCurrentScreen("menu")}
          />
        ) : null}
      </div>

      <Footer />

      {/* Sliding Quick Cart Drawer Tray */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onGoToCheckout={() => {
          setIsCartOpen(false);
          setCurrentScreen("checkout");
        }}
      />

      {/* Real-time Order Placed Simulation Modal */}
      {isOrderPlaced && placedOrderSummary && (
        <OrderSuccessModal
          cart={placedOrderSummary.cart}
          deliveryDetails={placedOrderSummary.details}
          totalPrice={placedOrderSummary.total}
          onClose={clearCartAndReset}
        />
      )}
    </div>
  );
}
