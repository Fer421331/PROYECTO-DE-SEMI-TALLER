// index.ts

import express, { Router } from 'express';

import rolesRoutes from './roles.routes.js';
import bitacoraRoutes from './rutasBitacora.js';
import carritoRoutes from './rutasCarritoDetalle.js';
import carritoDetalleRoutes from './rutasCarrito.js';
import categoriasRoutes from './rutasCategorias.js';
import direccionesUsuarioRoutes from './rutasDireccionesUsuario.js';
import rutasEntregaRoutes from './rutasEntrega.js';
import funcionesRoutes from './rutasFunciones.js';
import funcionesRolesRoutes from './rutasFuncionesRoles.js';
import inventarioRoutes from './rutasInventario.js';
import marcasRoutes from './rutasMarcas.js';
import metodosPagoRoutes from './rutasPagos.js';
import pagosRoutes from './rutasMetodosPago.js';
import productoImagenesRoutes from './rutasProductoImagenes.js';
import productosRoutes from './rutasProductos.js';
import reservasStockRoutes from './rutasReservasStock.js';
import rolesUsuariosRoutes from './rutasUsuarios.js';
import tokenRecuperacionRoutes from './rutasTokenRecuperacion.js';
import usuariosRoutes from './rutasUsuarios.js';
import ventaDetalleRoutes from './rutasVentaDetalle.js';
import ventasRoutes from './rutasVentas.js';

import { login } from '../controllers/auth/auth.controller.js';

const router: Router = Router({ caseSensitive: true, strict: true });

router.post('/auth/login', login);

router.use('/roles', rolesRoutes);
router.use('/bitacora', bitacoraRoutes);
router.use('/carrito', carritoRoutes);
router.use('/carrito-detalle', carritoDetalleRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/direcciones-usuario', direccionesUsuarioRoutes);
router.use('/rutas-entrega', rutasEntregaRoutes);
router.use('/funciones', funcionesRoutes);
router.use('/funciones-roles', funcionesRolesRoutes);
router.use('/inventario', inventarioRoutes);
router.use('/marcas', marcasRoutes);
router.use('/metodos-pago', metodosPagoRoutes);
router.use('/pagos', pagosRoutes);
router.use('/producto-imagenes', productoImagenesRoutes);
router.use('/productos', productosRoutes);
router.use('/reservas-stock', reservasStockRoutes);
router.use('/roles-usuarios', rolesUsuariosRoutes);
router.use('/token-recuperacion', tokenRecuperacionRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/venta-detalle', ventaDetalleRoutes);
router.use('/ventas', ventasRoutes);

export default router;