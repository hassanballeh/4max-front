import { useState } from 'react';

const FavouriteList = () => {

  const [favouritelistItems, setFavouriteListItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 20,
      size: "M",
      color: "red"
    },
    {
      id: 2,
      name: "Product 2",
      price: 300,
      size: "S",
      color: "Blue"
    },
    {
      id: 3,
      name: "Product 3",
      price: 100,
      size: "L",
      color: "Red"
    }
  ]);

  const removeItem = (id) => {
    setFavouriteListItems(favouritelistItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favourite List</h1>
      
      <div className="space-y-6 mb-8">
        {favouritelistItems.map((item) => (
          <div key={item.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <div className="flex flex-col space-y-1 text-gray-600">
              <p><span className="font-medium">Size:</span> {item.size}</p>
              <p><span className="font-medium">Color:</span> {item.color}</p>
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              className="mt-2 text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteList;