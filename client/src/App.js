import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import UpdateDelProduct from "./pages/Admin/UpdateDelProduct";
import ProductDetails from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CreateUserProduct from "./pages/User/CreateUserProduct";
import ManageProducts from "./pages/User/ManageProducts";
import ManageOrders from "./pages/User/ManageOrders";
import RentPage from "./pages/RentPage";
import CreateRentProduct from "./pages/User/CreateRentProduct";
import ManageRentProducts from "./pages/User/ManageRentProducts";
import RentProductPage from "./pages/RentProductPage";
import ServicePage from "./pages/ServicePage";
import UpdateRentProduct from "./pages/Admin/UpdateDelRentProduct";
import CreateServiceProduct from "./pages/User/CreateServiceProduct";
import ManageServiceProduct from "./pages/User/ManageServiceProducts";
import ServiceProductPage from "./pages/ServiceProductPage";
import ManagePurchasedProducts from "./pages/User/ManagePurchasedProduct";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/rent" element={<RentPage />}></Route>
          <Route path="/rent/products" element={<RentProductPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/policy" element={<PolicyPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/*" element={<PageNotFound />}></Route>
          <Route path="/service" element={<ServicePage />}></Route>
          <Route
            path="/service/products"
            element={<ServiceProductPage />}
          ></Route>

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />}></Route>
            <Route
              path="user/create-order"
              element={<CreateUserProduct />}
            ></Route>
            <Route
              path="user/create-rent-order"
              element={<CreateRentProduct />}
            ></Route>
            <Route
              path="user/create-service"
              element={<CreateServiceProduct />}
            ></Route>
            <Route
              path="user/manage-products"
              element={<ManageProducts />}
            ></Route>
            <Route
              path="user/manage-rented-products"
              element={<ManageRentProducts />}
            ></Route>
            <Route
              path="/dashboard/user/manage-services"
              element={<ManageServiceProduct />}
            ></Route>
            <Route path="user/manage-orders" element={<ManageOrders />}></Route>
            <Route
              path="user/manage-purchased-products"
              element={<ManagePurchasedProducts />}
            ></Route>
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />}></Route>
            <Route
              path="admin/create-category"
              element={<CreateCategory />}
            ></Route>

            <Route
              path="admin/update-product"
              element={<UpdateDelProduct />}
            ></Route>
            <Route
              path="admin/update-rent-product"
              element={<UpdateRentProduct />}
            ></Route>
            <Route
              path="admin/manage-order"
              element={<UpdateDelProduct />}
            ></Route>
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
