import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-items">
        {cartItems.map((item) => {
          const { name, imageUrl, price, quantity } = item;
          return (
            <div className="checkout-item-container">
              <img src={imageUrl} alt={name} />
              <span className="name">{name}</span>

              <span className="quantity">{quantity}</span>
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
