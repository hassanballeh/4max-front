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
  GET_ALL: "GET_ALL",
};

// Helper function to safely access localStorage
const getStoredCart = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedCart = localStorage.getItem("shopping_cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate the structure
        if (
          parsedCart &&
          typeof parsedCart === "object" &&
          Array.isArray(parsedCart.items)
        ) {
          return {
            items: parsedCart.items || [],
            totalItems: parsedCart.totalItems || 0,
          };
        }
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return null;
};

// Helper function to safely save to localStorage
const saveCartToStorage = (cart) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("shopping_cart", JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
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

    case CART_ACTIONS.GET_ALL: {
      // GET_ALL should not modify state, just return current state
      // This action is mainly for triggering re-renders if needed
      return state;
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

// Initial cart state - try to load from localStorage first
const getInitialCartState = () => {
  const storedCart = getStoredCart();
  return (
    storedCart || {
      items: [],
      totalItems: 0,
    }
  );
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getInitialCartState());
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load cart from localStorage on mount (fallback for SSR)
  useEffect(() => {
    const storedCart = getStoredCart();
    if (storedCart && !isLoaded) {
      dispatch({
        type: CART_ACTIONS.LOAD_CART,
        payload: storedCart,
      });
    }
    setIsLoaded(true);
  }, [isLoaded]);

  // Save cart to localStorage whenever cart changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoaded]);

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

  const getAllItems = () => {
    // Optional: dispatch action for consistency
    dispatch({ type: CART_ACTIONS.GET_ALL });

    // Return all cart data needed for cart orders/display
    return {
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      itemCount: cart.items.length,
      isEmpty: cart.items.length === 0,
    };
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
    getAllItems,
    totalItems: cart.totalItems,
    isLoaded,
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
