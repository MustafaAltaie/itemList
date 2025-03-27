import { useState } from 'react';
import { useReadItemQuery, useDeleteItemMutation, useCreateItemMutation, useUpdateItemMutation } from '../features/itemApi';
import "./App.css";

const ItemList = () => {
  const { data, error, isLoading } = useReadItemQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;

  // Handle item creation (POST)
  const handleCreateItem = async () => {
    if (newTitle && newContent && newPrice) {
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
      alert(res.data.title);
    }
  };

  // Handle edit button click
  const handleEditClick = (item) => {
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
  }

  return (
    <div>
      <h2>{editMode ? 'Edit Item' : 'Add Item'}</h2>

      {/* Add or Update Form */}
      <div id="itemForm">
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
          style = {{ paddingTop: '7px', textAlign: 'center', width: "300px", resize: "none" }}
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={editMode ? handleUpdateItem : handleCreateItem}>
          {editMode ? 'Update' : 'Add'}
        </button>
        {editMode && <button onClick={cancelEditing}>Cancel</button>}
      </div>

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