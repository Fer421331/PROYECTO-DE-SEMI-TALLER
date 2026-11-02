
import 'dotenv/config';
import { enviarFacturaPorCorreo } from './correo.service.js';

async function probarCorreo() {
  try {
    await enviarFacturaPorCorreo({
      destinatario: process.env.SMTP_USER!,
      nombreCliente: 'Cliente de prueba',
      numeroVenta: 1001,
      fecha: new Date().toLocaleDateString('es-HN'),
      productos: [
        {
          nombre: 'Leche entera 1 L',
          cantidad: 2,
          precioUnitario: 30,
          descuento: 0,
          subtotal: 60,
        },
        {
          nombre: 'Queso fresco',
          cantidad: 1,
          precioUnitario: 80,
          descuento: 0,
          subtotal: 80,
        },
      ],
      subtotal: 140,
      impuesto: 0,
      descuento: 0,
      total: 140,
    });

    console.log('Correo de prueba enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

probarCorreo();
