import React, { useState } from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'

const CartContainer = () => {

  const { cart, total2 } = useGlobalContext();
  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{total2.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => console.log("clear cart")}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
}

export default CartContainer
