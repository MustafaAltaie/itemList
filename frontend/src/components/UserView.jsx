import { useReadItemQuery } from '../features/itemApi';
import "./App.css";

const UserView = () => {
    const { data, error, isLoading } = useReadItemQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading items.</p>;
    const colors = ['#ff4161', '#40ae5d', '#ff5bde', '#07f', '#bb20ff', '#ff9c00']

    return (
        <>
        <h1 style={{ textAlign: "center", borderBottom: 'solid 1px #aaa', padding: "20px" }}>Item List</h1>
        <div className='userItemContainer'>
            {data.map((item, index) => (
            <div key={item._id} style={{ background: colors[index % colors.length] }}>
                <h3 style={{ color: colors[index % colors.length] }}>{item.title}</h3>
                <p>{item.content}</p>
                <h2>{item.price} kr</h2>
            </div>
            ))}
        </div>
        </>
    )
}

export default UserView;