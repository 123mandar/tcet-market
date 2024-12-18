import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Modal, Button, Input } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.getCategory);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category creation
  const createCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", categoryName);

      const { data } = await axios.post(
        "/api/v1/category/create-category",
        formData
      );

      if (data.success) {
        toast.success(`${categoryName} created successfully`);
        setCategoryName(""); // Clear input after successful creation
        fetchCategories(); // Refresh categories list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  // Handle category update
  const updateCategory = async () => {
    if (!updatedName.trim()) {
      toast.error("Updated name is required.");
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selectedCategory._id}`,
        {
          name: updatedName,
        }
      );

      if (data.success) {
        toast.success(`${updatedName} updated successfully`);
        setVisible(false);
        setSelectedCategory(null);
        setUpdatedName(""); // Reset input
        fetchCategories(); // Refresh categories list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  // Handle category deletion
  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`${data.delCategory.name} deleted successfully`);
        fetchCategories(); // Refresh categories list after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <Layout title="Admin Dashboard | Category Details">
      <div className="container py-4">
        <div className="row" style={{ alignItems: "flex-start" }}>
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Create Product Category</h3>
              </div>
              <div className="card-body">
                <form onSubmit={createCategory}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary w-30">
                    Create Category
                  </button>
                </form>

                <h4 className="mt-4">Existing Categories</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <tr key={cat._id}>
                          <td>{cat.name}</td>
                          <td>
                            <button
                              className="btn btn-secondary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(cat.name);
                                setSelectedCategory(cat);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => deleteCategory(cat._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for updating category */}
      <Modal
        title="Edit Category"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={updateCategory}>
            Update
          </Button>,
        ]}
      >
        <Input
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="Updated category name"
        />
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
