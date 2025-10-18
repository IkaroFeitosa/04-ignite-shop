"use client";
import styles from "../styles/pages/home.module.scss";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: string;
}
interface IProductSliderProps {
  products: IProduct[];
}

export function ProductSlider({ products }: IProductSliderProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <main className={styles.HomeContainer + " keen-slider"} ref={sliderRef}>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className={styles.Product + " keen-slider__slide"}
          prefetch={false}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            width={520}
            height={480}
          />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Link>
      ))}
    </main>
  );
}
