import { useReadItemQuery } from '../features/itemApi';
import "./App.css";

const UserView = () => {
    const { data, error, isLoading } = useReadItemQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading items.</p>;

    return (
        <>
        <h1 style={{ textAlign: "center", background: "#eee", padding: "30px" }}>Item List</h1>
        <div className='itemContainer'>
            {data.map((item) => (
            <div key={item._id}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <h4>{item.price} kr</h4>
            </div>
            ))}
        </div>
        </>
    )
}

export default UserView;