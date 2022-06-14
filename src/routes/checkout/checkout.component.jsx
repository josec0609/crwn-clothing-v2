import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-items">
        {cartItems.map((item) => {
          const { id, name, imageUrl, price, quantity } = item;
          // <CheckoutItem key={item.id} />
          return (
            <div key={id} className="checkout-item-container">
              <img src={imageUrl} alt={name} />
              <span className="name">{name}</span>
              <span onClick={() => removeItemFromCart(item)}>decrement</span>
              <span className="quantity">{quantity}</span>
              <span onClick={() => addItemToCart(item)}>increment</span>
              <span className="price">{price}</span>
              {/* <RemoveIcon /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
