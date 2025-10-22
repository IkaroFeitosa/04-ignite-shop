import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  if (!priceId) {
    return NextResponse.json(
      { message: "Price ID is required" },
      { status: 400 }
    );
  }

  console.log("Price ID recebido na API:", priceId);
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    cancel_url: cancelUrl,
    success_url: successUrl,
    /* payment_method_types: ["card"], */
  });
  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 }
  );
}
