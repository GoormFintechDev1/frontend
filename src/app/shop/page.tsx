"use client";
import { useRouter } from "next/navigation";
import { useCreateItem, useItem } from "@/hooks/useShopQuery";
import { CartItem } from "@/interface/product";
import { Item } from "@/interface/shop";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<Item>({ mode: "onChange" });

  const { data: item } = useItem();
  console.log(item);

  const router = useRouter();

  const addToCart = (item: Item) => {
    setIsPurchased(false);
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productId === item.itemId);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prevCart,
          {
            productId: item.itemId ?? Date.now(),
            name: item.itemName,
            price: item.itemPrice,
            quantity: 1,
          },
        ];
      }
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.productId === productId
            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const handlePurchase = () => {
    if (cart.length > 0) {
      setCart([]);
      setIsPurchased(true);
    }
    router.push(`/toss?price=${10000}`);
  };

  const closeModal = () => setIsModalOpen(false);

  const itemMutation = useCreateItem();
  const onSubmit = (data: Item) => {
    itemMutation.mutate(data);
  };

  return (
    <div className="container h-screen overflow-hidden flex flex-col">
      <div className="flex-grow ">
        <h1 className="text-2xl font-bold mb-4">Shop</h1>
        <div className="flex flex-col items-center space-y-6 p-4 bg-gray-50 rounded-lg">
          {item?.map((item: Item, i: number) => (
            <button
              key={i}
              onClick={() => addToCart(item)}
              className="block w-2/3 p-5 rounded shadow text-center"
            >
              <h2 className="text-lg font-bold">{item.itemName}</h2>
              <p className="text-gray-500">{item.itemPrice.toLocaleString()}원</p>
            </button>
          ))}
          <button onClick={() => setIsModalOpen(true)} className="p-5 bg-white rounded-lg shadow text-center">
            +
          </button>
        </div>
      </div>

      <div>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30 z-10"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-t-3xl w-full max-w-lg p-10 text-center relative slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={closeModal}
                className="text-gray-700 font-bold text-2xl absolute top-2 right-4"
              >
                &times;
              </button>

              <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col ">
                  <label className="text-xl font-medium text-gray-700 text-start ">상품명</label>
                  <input
                    placeholder="상품명"
                    {...register("itemName")}
                    className="mt-1 p-3 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xl font-medium text-gray-700 text-start">가격</label>
                  <input
                    placeholder="가격"
                    {...register("itemPrice")}
                    className="mt-1 p-3 border border-gray-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 font-normal text-xl rounded-lg h-16"
                >
                  상품등록
                </button>
              </form>
            </div>
          </div>
        )}
      </div>


      <div className="flex justify-between items-start bg-gray-50 p-4">
        <div className="w-1/2 pr-2">
          <h2 className="text-lg font-bold mb-2">장바구니🛒</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">장바구니가 비어 있습니다.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((cartItem) => (
                <li key={cartItem.productId} className="flex justify-between items-center p-2 rounded-lg shadow">
                  <span>{cartItem.name}</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => decreaseQuantity(cartItem.productId)} className="px-2">
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => increaseQuantity(cartItem.productId)} className="px-2 py-1">
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-1/3">
          <button onClick={handlePurchase} className="block w-full p-3 bg-emerald-500 text-white rounded-md">
            구매하기
          </button>
          {isPurchased && (
            <p className="mt-3 text-center text-emerald-500 font-bold">구매 완료되었습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
