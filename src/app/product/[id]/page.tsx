import { stripe } from "@/lib/stripe";
import ProductComponent from "./ProductComponent";
import { IProduct } from "@/components/ProductSlider";
import Stripe from "stripe";
// ...existing code...
import type { Metadata } from "next";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 3600; // revalida a cada 1 hora
export const dynamicParams = true;

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

const getProduct = cache(fetchProduct);

// Metadados dinâmicos para o App Router
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  const title = `${product.name} | Ignite Shop`;
  const description = product.description ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images?.length ? product.images : undefined,
      type: "website",
    },
    alternates: {
      canonical: `/product/${params.id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = await getProduct(id);

  return <ProductComponent product={product} />;
}
