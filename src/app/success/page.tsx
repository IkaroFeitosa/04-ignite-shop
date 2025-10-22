import { stripe } from "@/lib/stripe";
import styles from "@/styles/pages/success.module.scss";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

async function getSessionDetails(sessionId: string) {
  const sessionDetails = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "customer"],
  });
  console.log("Detalhes da sessão:", sessionDetails);
  const customerName = sessionDetails.customer_details?.name;
  const product = sessionDetails.line_items?.data[0]?.price
    ?.product as Stripe.Product;
  return {
    customerName,
    product: {
      name: product.name,
      imageUrl: product.images[0],
    },
  };
}

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const searchParamsResult = await searchParams;
  const { session_id } = searchParamsResult;
  console.log("ID da sessão de checkout:", session_id);
  const sessionDetails = await getSessionDetails(session_id);
  return (
    <main className={styles.SuccessContainer}>
      <h1>Compra realizada com sucesso!</h1>

      <div className={styles.ImageContainer}>
        <Image
          src={sessionDetails.product.imageUrl}
          alt="Success"
          width={130}
          height={130}
        />
      </div>

      <p>
        Uhuul <strong>{sessionDetails.customerName}</strong>, sua{" "}
        <strong>{sessionDetails.product.name}</strong> já está a caminho da sua
        casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </main>
  );
}
