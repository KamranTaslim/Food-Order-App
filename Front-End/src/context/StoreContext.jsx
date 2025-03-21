// StoreContext.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://51.21.245.158/api/";
  const [token, setToken] = useState("");
  //show data from database
  const [food_list, setFood_list] = useState([]);

  //Handle token expire

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //we give access to cart only if user is logged in the add cart
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        {
          itemId,
        },
        {
          headers: { token },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        {
          itemId,
        },
        {
          headers: { token },
        }
      );
    }
  };
  //when we are adding cart and remove after refresh the page the cart should be there
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      {
        headers: { token },
      }
    );
    setCartItems(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        //why for in because cartItems is object
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  //Get the food list from the database
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");

    setFood_list(response.data.data);
  };

  //for handle the refresh logout
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        //load the cart data
        await loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
