import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Unable to fetch food list");
    }
  };

  const removeFood = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h3>Food List</h3>
      <div className="list-table-format title">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>
      {list.map((item) => (
        <div key={item._id} className="list-table-format">
          <img src={`${url}/images/${item.image}`} alt={item.name} />
          <span>{item.name}</span>
          <span>{item.category}</span>
          <span>${item.price}</span>
          <button className="cursor" onClick={() => removeFood(item._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
