import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
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
import Categories from "./pages/admin/Categories/Categories";
import CategorieDetail from "./pages/admin/Categories/CategorieDetail";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-recovery-code" element={<VerifyRecoveryCode />} />

          {/* Catálogo */}
          <Route path="/catalog" element={<Catalog />} />

          {/* Productos */}
          <Route path="/admin/productos" element={<ProductList />} />
          <Route path="/admin/productos/detalle" element={<ProductDetail />} />

          {/* Categorías */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/categories" element={<Categories />} />
            <Route
              path="/admin/categories/detail"
              element={<CategorieDetail />}
            />
          </Route>

          {/* Administración */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/panel" element={<Panel />} />

          {/* Ventas */}
          <Route
            path="/admin/sales"
            element={<SalesList />}
          />

          <Route
            path="/admin/sales/:venta_id"
            element={<SaleDetail />}
          />

          <Route path="/admin/bitacora" element={<Bitacora />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin/functions"
              element={<Functions />}
            />

            <Route
              path="/admin/functions/detail"
              element={<FunctionDetail />}
            />
          </Route>

          {/* Roles */}
          <Route path="/admin/roles" element={<RolesList />} />

          <Route
            path="/admin/roles/detail"
            element={<RolesDetail />}
          />

          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/user-roles" element={<UserRoles />} />

          <Route path="/admin/functions-roles" element={<FunctionsRoles />} />
          <Route path="/admin/functions-roles/detail" element={<FunctionsRolesDetail />} />

          {/* Rutas de entrega */}
          <Route path="/admin/delivery-routes" element={<DeliveryRoutesList />} />

          <Route
            path="/admin/delivery-routes/new"
            element={<DeliveryRoutesDetail />}
          />

          <Route
            path="/admin/delivery-routes/:id"
            element={<DeliveryRoutesDetail />}
          />

          {/* Imágenes de productos */}
          <Route path="/admin/product-images" element={<ProductsImages />} />

          {/* Compras */}
          <Route element={<ProtectedRoute />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/purchase-confirmation" element={<PurchaseConfirmation />} />

          {/* Perfil */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Direcciones */}
          <Route path="/address" element={<Address />} />
          <Route path="/address/detail" element={<AddressDetail />} />

        </Routes>

        <Footer />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
