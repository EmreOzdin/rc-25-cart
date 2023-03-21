import React, { createContext, useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([cartItems])


  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch(err=>console.log(err));
  }, [])
 
  const handleIncrease = (id) => {
    setCart(cart?.map((item) => (item.id === id ? { ...item, amount: item.amount+1 } : item)))};

  const handleDecrease = (id) => {
  
    setCart(cart?.map((item) => (item.id === id ? { ...item, amount: item.amount-1 } : item)).filter(item =>item.amount != 0))};

  const handleRemove = (id) => {
    setCart(cart.filter((item) =>  item.id != id));}

  return (
    <AppContext.Provider
      value={{
        cart,
        handleDecrease,
        handleIncrease,
        handleRemove
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
