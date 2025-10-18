import { IProduct, ProductSlider } from "@/components/ProductSlider";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const revalidate = 3600; // revalida a cada 1 hora
async function getProducts() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return response.data.map((product) => {
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
  });
}

export default async function Home() {
  const products = await getProducts();
  return <ProductSlider products={products} />;
}
