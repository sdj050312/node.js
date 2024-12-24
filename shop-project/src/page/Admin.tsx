import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoveBar from "../component/MoveBar";
import '../pagescss/Admin.css';
import axios from "axios";

const Admin = () => {
    const [adminList, setAdminList] = useState<boolean>(true);
    const [product, setProduct] = useState<{
        id: number;
        no: string;
        name: string;
        price: string;
        img: File | null;
    }[]>([]);

    const [formData, setFormData] = useState<{
        id: number;
        no: string;
        name: string;
        price: string;
        img: File | null;
    }>({
        id: 0, // Initial ID value
        no: "",
        name: "",
        price: "",
        img: null,
    });

    const navigate = useNavigate();

    const showList = () => {
        setAdminList(false);
    };

    const showForm = () => {
        setAdminList(true);
    };

    const handleDelete = (no: string) => {
        setProduct((prevData) => prevData.filter((product) => product.no !== no));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "img") {
            setFormData((prev) => ({ ...prev, img: files ? files[0] : null }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

   const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { no, name, price, img} = formData;
    const body = {
        no, name, price, img
    };

    try{
        const response = await  axios.post('/api/product', body);
        setProduct((prev) => [...prev, response.data]);
        navigate('/product', {state: {product: response.data}});
    }
    catch(error) {
        console.error(error)

    }

   }

    return (
        <>
            <div className="admin-container">
                <div className="admin-list">
                    <ul>
                        <li className={adminList ? "active-tab" : "inactive-tab"}>
                            <a href="#none" onClick={showList}>Product Register</a>
                        </li>
                        <li className={!adminList ? "active-tab" : "inactive-tab"}>
                            <a href="#none" onClick={showForm}>Product List</a>
                        </li>
                    </ul>
                    <div>
                        {adminList && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product No</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.no}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                {product.img ? (
                                                    <img
                                                        src={URL.createObjectURL(product.img)}
                                                        alt="Product"
                                                        width="100"
                                                    />
                                                ) : (
                                                    "No image"
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="delete"
                                                    onClick={() => handleDelete(product.no)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {!adminList && (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="id">Product ID:</label>
                                <input
                                    type="number"
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    disabled
                                />
                                <label htmlFor="no">Product No:</label>
                                <input
                                    type="text"
                                    id="no"
                                    name="no"
                                    value={formData.no}
                                    onChange={handleChange}
                                />
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                                <label htmlFor="img">Image:</label>
                                <input
                                    type="file"
                                    id="img"
                                    name="img"
                                    onChange={handleChange}
                                />
                                <button type="submit">Register</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <MoveBar />
        </>
    );
};

export default Admin;
