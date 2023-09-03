"use Client"
///This handles the cart receipt page

///Libraries -->
import CartReceipt from '@/app/components/order/cart/receipt/CartReceipt';
import { IProduct } from '@/app/utils/interfaces';
import { backend, shuffleArray, deleteItemByKey } from '@/app/utils/utils';

///Commencing the code

///This fetches the product info page
async function getCart(id: string) {
  try {

    const response = await fetch(
      `${backend}/user/dashboard/order/cart/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
  
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  
    const product = await response.json();
    return product;
  } catch (error) {
      console.error(error);
  }
}

/**
 * @title Product info page
 */
export default async function CartOrderByIdPage({ params: { id } }: { params: { id: string }}) {
    const cart = await getCart(id)

  return (
    <main className="cart">
      <CartReceipt cart_={cart[0]} />
    </main>
  )
}