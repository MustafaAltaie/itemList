import { useState, useEffect } from 'react';
import { useReadItemQuery, useDeleteItemMutation, useCreateItemMutation, useUpdateItemMutation } from '../features/itemApi';
import "./App.css";
import PasswordPopup from "./PasswordPopup";

const ItemList = () => {
  const { data, error, isLoading } = useReadItemQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [addItem, setAddItem] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("authenticated") === "true") {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <PasswordPopup setAuthenticated={setAuthenticated} />;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;

  // Handle item creation (POST)
  const handleCreateItem = async () => {
    if (newTitle && newContent && newPrice) {
      setAddItem(false);
      await createItem({ title: newTitle, content: newContent, price: newPrice });
      setNewTitle('');
      setNewContent('');
      setNewPrice('');
    }
  };

  // Handle item update (PUT)
  const handleUpdateItem = async () => {
    if (newTitle && newContent && newPrice && currentId) {
      const res = await updateItem({ id: currentId, title: newTitle, content: newContent, price: newPrice });
      cancelEditing();
      //alert(res.data.title);
    }
  };

  // Handle edit button click
  const handleEditClick = (item) => {
    setAddItem(true);
    setEditMode(true);
    setCurrentId(item._id);
    setNewTitle(item.title);
    setNewContent(item.content);
    setNewPrice(item.price);
  };

  const cancelEditing = () => {
    setNewTitle('');
    setNewPrice('');
    setNewContent('');
    setEditMode(false);
    setCurrentId(null);
    setAddItem(false);
  }

  return (
    <div>
      {!addItem && <h1 id="addItem" onClick={() => setAddItem(true)}>+</h1>}
      {/* Add or Update Form */}
      {addItem &&
      <div id="itemForm">
        <h2>{editMode ? 'Edit Item' : 'Add Item'}</h2>
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={editMode ? handleUpdateItem : handleCreateItem}>
          {editMode ? 'Update' : 'Add'}
        </button>
        <button onClick={cancelEditing}>Cancel</button>
      </div>}

      <div className='itemContainer'>
        {data.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <h4>{item.price} kr</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;