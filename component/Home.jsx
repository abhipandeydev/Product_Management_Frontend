import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import productService from '../service/product.service';

const Home = () => {
    const [productList, setProductList] = useState([]);
    const [msg, setMsg] = useState("");
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        productService
            .getAllProduct()
            .then((res) => {
                setProductList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteProduct = (id) => {
        productService
            .deleteProduct(id)
            .then((res) => {
                setMsg("Delete Sucessfully");
                init();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header fs-3 text-center bg-primary text-white">
                                All Product List                                
                            </div>

                            <div className="card-body">
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                <table class="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList.map((p, num) => (
                                            <tr>
                                                <td>{num + 1}</td>
                                                <td>{p.productName}</td>
                                                <td>{p.description}</td>
                                                <td>{p.price}</td>
                                                <td>{p.status}</td>
                                                <td>
                                                    <Link to={'editProduct/' + p.id} className="btn btn-sm btn-primary">
                                                        <i class="fas fa-edit"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteProduct(p.id)}
                                                        className="btn btn-sm btn-danger ms-1"
                                                    >
                                                       <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home