import styles from "../styles/pages/home.module.scss";
import Image from "next/image";

import camiseta1Img from "../assets/camisetas/1.png";
import camiseta2Img from "../assets/camisetas/2.png";

export default function Home() {
  console.log(styles);
  return (
    <main className={styles.HomeContainer}>
      <a href="" className={styles.Product}>
        <Image src={camiseta1Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </a>
      <a href="" className={styles.Product}>
        <Image src={camiseta2Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </a>
    </main>
  );
}
