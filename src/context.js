import React, { createContext, useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
// import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = createContext();


function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "increase":
      return {
        ...state,
        cart: state.cart?.map((item) =>
          item.id === action.value ? { ...item, amount: item.amount + 1 } : item
        ),
      };
    case "decrease":
      return {
        ...state,
        cart: state.cart
          ?.map((item) =>
            item.id === action.payload
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter((item) => item.amount != 0),
      };
    case "remove":
      return {
        ...state,
        cart: state.cart?.filter((item) => item.id != action.payload),
      };
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: cartItems,
  });
  const cart = state.cart;
  // const [cart, setCart] = useState("");
  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setCart(data))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleIncrease = (id) => {
    dispatch({
      type: "increase",
      value: id,
    });
  };

  const handleDecrease = (id) => {
    dispatch({
      type: "decrease",
      payload: id,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: "remove",
      payload: id,
    });
  };

  let total = 0;
  let total2 = 0;
  state.cart.map((item) => {
    total += item.amount;
    total2 += item.price * item.amount;
  });

  return (
    <AppContext.Provider
      value={{
        cart,
        handleDecrease,
        handleIncrease,
        handleRemove,
        total,
        total2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
