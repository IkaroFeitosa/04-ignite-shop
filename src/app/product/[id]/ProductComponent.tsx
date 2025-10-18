import { IProduct } from "@/components/ProductSlider";
import styles from "@/styles/pages/product.module.scss";
import Image from "next/image";
interface ProductComponentProps {
  product: IProduct;
}

export default function ProductComponent({ product }: ProductComponentProps) {
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
        <button>Comprar agora</button>
      </div>
    </main>
  );
}
