import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </span>
      </div>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItemFromCart(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
