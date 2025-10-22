"use client";
import { IProduct } from "@/components/ProductSlider";
import styles from "@/styles/pages/product.module.scss";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
interface ProductComponentProps {
  product: IProduct;
}

export default function ProductComponent({ product }: ProductComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleBuyNow() {
    console.log("Comprar agora:", product.defaultPriceId);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const checkoutUrl = response.data.checkoutUrl;
      console.log(response.data);
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao criar sessão de checkout:", error);
    }

    // Lógica para redirecionar para a página de checkout
  }
  return (
    <main className={styles.ProductContainer}>
      <div className={styles.ImageContainer}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={520}
          height={480}
        />
      </div>
      <div className={styles.ProductDetails}>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isLoading} onClick={handleBuyNow}>
          {isLoading ? "Carregando..." : "Comprar agora"}
        </button>
      </div>
    </main>
  );
}
