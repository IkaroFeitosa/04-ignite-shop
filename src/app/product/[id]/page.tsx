import { stripe } from "@/lib/stripe";
import ProductComponent from "./ProductComponent";
import { IProduct } from "@/components/ProductSlider";
import Stripe from "stripe";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function fetchProduct(id: string) {
  // Função para buscar os dados do produto pela ID
  // Pode ser uma chamada à API ou consulta ao banco de dados
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
  } as IProduct;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id);

  return <ProductComponent product={product} />;
}
