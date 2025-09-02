import React, { createContext, useContext, useReducer, useEffect } from "react";

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { variantId, quantity, productInfo } = action.payload;

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
        };
      } else {
        // Add new item to cart
        const newItem = {
          variantId,
          quantity,
          ...productInfo,
          addedAt: new Date().toISOString(),
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { variantId } = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.variantId === variantId
      );

      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.variantId !== variantId),
        totalItems: state.totalItems - itemToRemove.quantity,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { variantId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          payload: { variantId },
        });
      }

      const existingItem = state.items.find(
        (item) => item.variantId === variantId
      );
      if (!existingItem) return state;

      const quantityDiff = quantity - existingItem.quantity;

      const updatedItems = state.items.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        totalItems: 0,
      };

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// Initial cart state
const initialCartState = {
  items: [],
  totalItems: 0,
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping_cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: parsedCart,
        });
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("shopping_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Cart actions
  const addToCart = (variantId, quantity, productInfo) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        variantId,
        quantity,
        productInfo,
      },
    });
  };

  const removeFromCart = (variantId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { variantId },
    });
  };

  const updateQuantity = (variantId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { variantId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getCartItem = (variantId) => {
    return cart.items.find((item) => item.variantId === variantId);
  };

  const isInCart = (variantId) => {
    return cart.items.some((item) => item.variantId === variantId);
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart,
    getCartTotal,
    totalItems: cart.totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
