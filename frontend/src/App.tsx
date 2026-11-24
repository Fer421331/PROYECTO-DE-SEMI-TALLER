import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard';
import Categories from './pages/admin/Categories/Categories';
import CategorieDetail from './pages/admin/Categories/CategorieDetail';
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import Cart from './pages/cart/Cart';
import Favorites from './pages/favorites/Favorites';
import Catalog from './pages/catalog/Catalog';
import SalesList from './pages/admin/Sales/SalesList';
import SaleDetail from './pages/admin/Sales/SaleDetail';
import Address from './pages/address/Address';
import AddressDetail from './pages/address/AddressDetail';
import Bitacora from './pages/admin/Bitacora/Bitacora';
import Functions from './pages/admin/Functions/Functions';
import FunctionDetail from './pages/admin/Functions/FunctionDetail';
import RolesList from './pages/admin/Roles/RolesList';
import RolesDetail from './pages/admin/Roles/RolesDetail';
import Users from './pages/admin/Users/Users';
import UserRoles from './pages/admin/UserRoles/UserRoles';
import FunctionsRoles from './pages/admin/FunctionsRoles/FunctionsRoles';
import FunctionsRolesDetail from './pages/admin/FunctionsRoles/FunctionsRolesDetail';
import Panel from './pages/admin/Panel/Panel';
import DeliveryRoutesList from './pages/admin/Delivery routes/DeliveryRoutesList';
import DeliveryRoutesDetail from './pages/admin/Delivery routes/DeliveryRoutesDetail';
import Home from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
