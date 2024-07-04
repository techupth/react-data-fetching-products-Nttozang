import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"


function App() {

  const [allProfile,setAllProfile] = useState([])
  
  useEffect(() => {
    getAllProfile();
  },[])

  const getAllProfile = async () => {
    const result = await axios.get("http://localhost:4001/products")
    setAllProfile(result.data.data)
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`)
    const updateProfile = allProfile.filter((item) => item.id !== id);
    setAllProfile(updateProfile);
  }
  
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {allProfile.map((product) =>(
        <div className="product" key={product.id}>
          <div className="product-preview">
            <img
              src={product.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {product.name}</h1>
            <h2>Product price: {product.price}</h2>
            <p>Product description: {product.description}</p>
          </div>
          <button className="delete-button" onClick={() => handleDelete(product.id)}>x</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
