"use client";
import { useState } from "react";

type CartItem = {
  name: string;
  quantity: number;
};

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPurchased, setIsPurchased] = useState(false);

  const items = ["원두", "플라스틱 컵", "컵홀더", "빨대"];

  // 장바구니
  const addToCart = (item: string) => {
    setIsPurchased(false);
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { name: item, quantity: 1 }];
      }
    });
  };

  // 수량 증가
  const increaseQuantity = (itemName: string) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // 수량 감소
  const decreaseQuantity = (itemName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  // 구매하기 
  const handlePurchase = () => {
    if (cart.length > 0) {
      setCart([]);
      setIsPurchased(true);
    }
  };

  return (
    <div className="container h-screen overflow-hidden flex flex-col">
      <div className="flex-grow ">
        <h1 className="text-2xl font-bold mb-4">Shop</h1>
        <div className="flex flex-col items-center space-y-6 p-4 bg-gray-50 rounded-lg">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => addToCart(item)}
              className="block w-2/3 p-5 rounded shadow text-center"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start bg-gray-50 p-4">
        <div className="w-1/2 pr-2">
          <h2 className="text-lg font-bold mb-2">장바구니🛒</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">장바구니가 비어 있습니다.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((cartItem) => (
                <li
                  key={cartItem.name}
                  className="flex justify-between items-center p-2 rounded-lg shadow"
                >
                  <span>{cartItem.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(cartItem.name)}
                      className="px-2"
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(cartItem.name)}
                      className="px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-1/3">
          <button
            onClick={handlePurchase}
            className="block w-full p-3 bg-emerald-500 text-white rounded-md"
          >
            구매하기
          </button>
          {isPurchased && (
            <p className="mt-3 text-center text-emerald-500 font-bold">
              구매 완료되었습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
