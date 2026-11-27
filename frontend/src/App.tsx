import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Importación de todas tus páginas
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import CategorieDetail from "./pages/admin/Categories/CategorieDetail";
import ProductList from "./pages/products/ProductList";
import ProductDetail from "./pages/products/ProductDetail";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import Catalog from "./pages/catalog/Catalog";
import SalesList from "./pages/admin/Sales/SalesList";
import SaleDetail from "./pages/admin/Sales/SaleDetail";
import Address from "./pages/address/Address";
import AddressDetail from "./pages/address/AddressDetail";
import Bitacora from "./pages/admin/Bitacora/Bitacora";
import Functions from "./pages/admin/Functions/Functions";
import FunctionDetail from "./pages/admin/Functions/FunctionDetail";
import RolesList from "./pages/admin/Roles/RolesList";
import RolesDetail from "./pages/admin/Roles/RolesDetail";
import Users from "./pages/admin/Users/Users";
import UserRoles from "./pages/admin/UserRoles/UserRoles";
import FunctionsRoles from "./pages/admin/FunctionsRoles/FunctionsRoles";
import FunctionsRolesDetail from "./pages/admin/FunctionsRoles/FunctionsRolesDetail";
import Panel from "./pages/admin/Panel/Panel";
import DeliveryRoutesList from "./pages/admin/Delivery routes/DeliveryRoutesList";
import DeliveryRoutesDetail from "./pages/admin/Delivery routes/DeliveryRoutesDetail";
import Register from "./pages/auth/Register";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/checkout/Payment";
import PurchaseConfirmation from "./pages/checkout/PurchaseConfirmation";
import Profile from "./pages/profile/Profile";
import History from "./pages/history/History";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyRecoveryCode from "./pages/auth/VerifyRecoveryCode";
import ProductsImages from "./pages/products images/ProductsImages";
import Categories from "./pages/categories/Categories";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Ruta principal (Home) */}
          <Route path="/" element={<Home />} />

          {/* Ruta del Login */}
          <Route path="/login" element={<Login />} />

          <Route path="/catalog" element={<Catalog />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>

          {/*
       
        <Register />

        <ForgotPassword />
        <ResetPassword />
        <VerifyRecoveryCode />

        <Catalog />

        <Panel />

        <AdminDashboard />
        <Bitacora />
        <Categories />
        <CategorieDetail />
        <ProductList />
        <ProductDetail />
        <ProductsImages />
        
        <SalesList />
        <SaleDetail />
        
        <Functions />
        <FunctionDetail />
        <RolesList />
        <RolesDetail />
        <Users />
        <UserRoles />
        <FunctionsRoles />
        <FunctionsRolesDetail />
        <DeliveryRoutesList />
        <DeliveryRoutesDetail />
        
        <Cart />
        <Checkout />
        <Payment />
        <PurchaseConfirmation />

        <Profile />
        <History />
        <Favorites />
        <Address />
        <AddressDetail />
        */}
        </Routes>
        {/* Footer general */}
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
