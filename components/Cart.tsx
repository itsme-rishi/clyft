import React, { useState } from 'react';

// Define the type for CartItem
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  // State to hold the list of items in the cart
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 20, quantity: 2 },
  ]);

  // Function to handle adding an item to the cart
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item already exists, update the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // Otherwise, add the item to the cart
        return [...prevItems, item];
      }
    });
  };

  // Function to handle removing an item from the cart
  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span> - ${item.price}</span>
            <span> x {item.quantity}</span>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total: ${calculateTotal()}</strong>
      </div>
      <div>
        <button onClick={() => addItemToCart({ id: 3, name: 'Item 3', price: 30, quantity: 1 })}>
          Add Item 3
        </button>
      </div>
    </div>
  );
};

export default Cart;
