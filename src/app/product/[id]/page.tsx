import { stripe } from "@/lib/stripe";
import ProductComponent from "./ProductComponent";
import { IProduct } from "@/components/ProductSlider";
import Stripe from "stripe";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 3600; // revalida a cada 1 hora
export const dinamicParams = true;
export async function generateStaticParams() {
  const products = await stripe.products.list(); // ou sua lógica de busca
  const toproducts = products.data.slice(0, 5); // você pode limitar a lista se quiser
  return toproducts.map((product) => ({ id: product.id }));
}

async function fetchProduct(id: string) {
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    price: Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount! / 100),
    defaultPriceId: price.id,
  } as IProduct;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return <ProductComponent product={product} />;
}
