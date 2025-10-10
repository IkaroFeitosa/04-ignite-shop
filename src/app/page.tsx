"use client";
import styles from "../styles/pages/home.module.scss";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import camiseta1Img from "../assets/camisetas/1.png";
import camiseta2Img from "../assets/camisetas/2.png";
import camiseta3Img from "../assets/camisetas/3.png";
import camiseta4Img from "../assets/camisetas/4.png";
import "keen-slider/keen-slider.min.css";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <main className={styles.HomeContainer + " keen-slider"} ref={sliderRef}>
      <a href="" className={styles.Product + " keen-slider__slide"}>
        <Image src={camiseta1Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </a>
      <a href="" className={styles.Product + " keen-slider__slide"}>
        <Image src={camiseta2Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </a>
      <a href="" className={styles.Product + " keen-slider__slide"}>
        <Image src={camiseta3Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 89,90</span>
        </footer>
      </a>
      <a href="" className={styles.Product + " keen-slider__slide"}>
        <Image src={camiseta4Img.src} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Y2</strong>
          <span>R$ 99,90</span>
        </footer>
      </a>
    </main>
  );
}
