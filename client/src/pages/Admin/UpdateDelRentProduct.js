import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import UpdateForm from "../../components/Forms/UpdateForm";

const UpdateRentProduct = () => {
  const [products, setProducts] = useState([]); // List of products

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/get-rent-products`
      );
      if (data.success) {
        setProducts(data.rentProducts); // Update to use rentProducts
      }
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/delete-rent-product/${pid}`
      );
      if (data.success) {
        toast.success("Product deleted successfully!");
        getAllProducts(); // Refresh product list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Admin Dashboard | Update Products">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0" }}
        >
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Update Products</h3>
              </div>
              <div className="card-body">
                {/* Existing Products Table */}
                <h4 className="mt-4">Existing Rent Products</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>
                            <UpdateForm
                              productData={product}
                              refreshProducts={getAllProducts}
                            />
                            {/* Delete Button */}
                            <button
                              className="btn btn-secondary ms-2"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateRentProduct;
