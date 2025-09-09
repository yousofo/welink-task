import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

function Checkout() {
  return (
    <>
      <header>
        <h1>Checkout</h1>
      </header>
      <main className="container mx-auto p-4 flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Link href="/gates" className="underline text-sm">
            Go back
          </Link>
          <h3 className="text-2xl font-bold">Check out a Ticket</h3>
        </div>
        <CheckoutForm />
      </main>
    </>
  );
}

export default Checkout;
