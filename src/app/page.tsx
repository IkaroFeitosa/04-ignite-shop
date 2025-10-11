import { IProduct, ProductSlider } from "@/components/ProductSlider";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

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
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    } as IProduct;
  });
}

export default async function Home() {
  const products = await getProducts();
  return <ProductSlider products={products} />;
}
