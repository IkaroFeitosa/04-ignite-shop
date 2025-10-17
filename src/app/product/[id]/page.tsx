import styles from "@/styles/pages/product.module.scss";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className={styles.ProductContainer}>
      <div className={styles.ImageContainer}>{/* Imagem do produto */}</div>
      <div className={styles.ProductDetails}>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button>Comprar agora</button>
      </div>
    </main>
  );
}
