"use client"
///Cart Receipt component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./cartReceipt.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { ICartOrder } from '@/app/utils/interfaces';
import { formatDateMongo } from '@/app/utils/utils';
//import ReactDOMServer from 'react-dom/server';

///Commencing the code 
/**
 * @title Cart Receipt Component
 * @returns The Cart Receipt component
 */
const CartReceipt = ({ cart_ }: { cart_: ICartOrder }) => {
    const router = useRouter()
    const [cart, setCart] = useState<ICartOrder | undefined>(cart_)
    const routerPath = usePathname()

    //console.log("cart: ", cart ? formatDateMongo(cart?.createdAt) : "")

  return (
    <div className={styles.main}>
        <h2><strong>Cart Receipt</strong></h2>
        <span className={styles.mainBrief}>Thank&apos;s for patronizing IB Cakes & Catering</span>
        <div className={styles.container}>
            <div className={styles.orderSection}>
                <div className={styles.orderId}>
                    <span><strong>Cart Order ID:</strong></span>
                    <span className={styles.span2}>{cart ? cart._id : ""}</span>
                </div>
                <div className={styles.orderDate}>
                    <span>Order Date:</span>
                    <span className={styles.span2}><strong>{cart && cart.createdAt ? formatDateMongo(cart.createdAt) : ""}</strong></span>
                </div>
            </div>
            <div className={styles.deliverySection}>
                <div className={styles.deliveryDate}>
                    <span><strong>Estimated Delivery Date</strong></span>
                    <span>16th April, 2020</span>
                </div>
                <div className={styles.deliveryAddress}>
                    <span><strong>Delivery Info</strong></span>
                    <span>{cart && cart.customerSpec ? cart.customerSpec.fullName : ""}</span>
                    <span>{cart && cart.customerSpec ? cart?.customerSpec.emailAddress : ""}</span>
                    <span>{cart && cart.customerSpec ? cart?.customerSpec.phoneNumber : ""}</span>
                    <span>{cart && cart.customerSpec ? cart?.customerSpec.deliveryAddress : ""}</span>
                </div>
            </div>
            <div className={styles.cartList}>
                {cart && cart.productSpec ? cart.productSpec.cart.map((c, id) => (
                    <div className={styles.cartItem} key={id}>
                    <div className={styles.cartImage}>
                        <img 
                            src={c.image}
                            alt=''
                        />
                    </div>
                    <div className={styles.cartName}>
                        <span>{c.name}</span>
                    </div>
                    <div className={styles.cartPriceQuantity}>
                        <span><strong>N {c.subTotalPrice.toLocaleString("en-US")}</strong></span>
                        <span>Qty: {c.quantity}</span>
                    </div>
                </div>
                )) : (
                    <></>
                )}
                
            </div>
            <div className={styles.totalSection}>
                <div className={styles.subTotal}>
                    <span><strong>Subtotal</strong></span>
                    <span>N {cart && cart.productSpec ? cart.productSpec.totalPrice.toLocaleString("en-US") : ""}</span>
                </div>
                <div className={styles.deliveryFee}>
                    <span><strong>Delivery</strong></span>
                    <span>N 0.00</span>
                </div>
                <div className={styles.total}>
                    <span><strong>Total</strong></span>
                    <span>N {cart && cart.productSpec ? cart.productSpec.totalPrice.toLocaleString("en-US") : ""}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartReceipt;