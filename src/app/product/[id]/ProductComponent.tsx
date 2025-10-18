"use client";
import { IProduct } from "@/components/ProductSlider";
import styles from "@/styles/pages/product.module.scss";
import Image from "next/image";
interface ProductComponentProps {
  product: IProduct;
}

export default function ProductComponent({ product }: ProductComponentProps) {
  async function handleBuyNow() {
    console.log("Comprar agora:", product.defaultPriceId);
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId: product.defaultPriceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
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
        <button onClick={handleBuyNow}>Comprar agora</button>
      </div>
    </main>
  );
}
