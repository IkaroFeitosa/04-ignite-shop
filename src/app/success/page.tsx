import styles from "@/styles/pages/success.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
  return (
    <main className={styles.SuccessContainer}>
      <h1>Compra realizada com sucesso!</h1>

      <div className={styles.ImageContainer}>
        <Image src="/success.svg" alt="Success" width={130} height={130} />
      </div>

      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua{" "}
        <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua
        casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </main>
  );
}
