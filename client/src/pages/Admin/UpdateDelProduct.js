import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import UpdateForm from "../../components/Forms/UpdateForm";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]); // List of products
  const [name, setName] = useState(""); // New product input name

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data.success) {
        setProducts(data.getProduct);
      }
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle new product creation
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/v1/product/create-product", {
  //       name,
  //     });
  //     if (data.success) {
  //       toast.success(`${data.newProduct.name} created successfully!`);
  //       setName(""); // Clear input field
  //       getAllProducts(); // Refresh product list
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error creating product");
  //   }
  // };

  // Handle product deletion
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pid}`
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
                <h4 className="mt-4">Existing Products</h4>
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

export default UpdateProduct;
