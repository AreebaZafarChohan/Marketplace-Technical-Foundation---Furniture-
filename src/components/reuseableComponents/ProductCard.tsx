"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardProps } from "../../../types/components";

const ProductCard: React.FC<{ productData: CardProps }> = ({ productData}) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  if (!productData) {
    return null; // Safeguard in case productData is undefined
  }

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newItem = {
      id: productData.id,
      image: productData.imageUrl,
      name: productData.name,
      price: productData.price,
    };
    localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
    setPopupMessage(`${productData.name} has been added to your cart! ✅✨`);
    setTimeout(() => setPopupMessage(null), 2000);
  };

  return (
    <div
      key={productData.id}
      className="relative flex flex-col gap-4 product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      style={{ minHeight: "350px" }} // Ensure cards have a consistent minimum height
    >
      {/* Product Image */}
      <Image
        src={productData.imageUrl || "/placeholder-image.png"}
        alt={productData.name || "Product Image"}
        width={200}
        height={200}
        className="w-full h-[300px] object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between">
        {/* Product Name and Price */}
        <div>
          <h4 className="font-clash font-normal leading-6 text-darkPrimary text-lg truncate">
            {productData.name || "No Name"}
          </h4>
          <p className="font-satoshi font-normal leading-6 text-darkPrimary text-base">
            &#163;{productData.price || 0}
          </p>
        </div>

        {/* Rating and Stock */}
        <div className="flex justify-between items-center mt-2">
          <h4 className="font-sans font-semibold text-sm bg-yellow-500 px-2 py-1 rounded">
            {`Rating - ${productData.rating}` || "No Rating"}
          </h4>
          <p className="font-sans font-bold text-xs text-green-500">
            {`In Stock (${productData.stock || 0})`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4 gap-2">
          <button
            onClick={handleAddToCart}
            className="w-[120px] rounded px-4 py-2 bg-black/70 text-white hover:bg-gray-900"
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${productData.id}`}
            className="w-[120px] rounded px-4 py-2 bg-gray-200 text-black hover:bg-gray-400"
          >
            See Details
          </Link>
        </div>
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="absolute top-12 right-4 bg-gray-900/60 text-white px-4 py-2 rounded-md shadow-md">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
