import nodemailer from "nodemailer";

interface ProductoFactura {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
}

interface CorreoFactura {
  destinatario: string;
  nombreCliente: string;
  numeroVenta: number;
  fecha: string;
  productos: ProductoFactura[];
  subtotal: number;
  impuesto: number;
  descuento: number;
  total: number;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS?.replace(/\s/g, ""),
  },
});

const dinero = (cantidad: number): string =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(cantidad);

const escaparHTML = (valor: string): string =>
  valor.replace(/[&<>"']/g, (caracter) => {
    const entidades: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entidades[caracter];
  });

export async function enviarFacturaPorCorreo(
  factura: CorreoFactura,
): Promise<void> {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("La configuración SMTP está incompleta.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(factura.destinatario)) {
    throw new Error("El correo destinatario no es válido.");
  }

  if (!factura.productos.length) {
    throw new Error("La factura no contiene productos.");
  }

  const filas = factura.productos
    .map(
      (producto) => `
    <tr>
      <td>${escaparHTML(producto.nombre)}</td>
      <td style="text-align:center">${producto.cantidad}</td>
      <td style="text-align:right">${dinero(producto.precioUnitario)}</td>
      <td style="text-align:right">${dinero(producto.descuento)}</td>
      <td style="text-align:right">${dinero(producto.subtotal)}</td>
    </tr>
  `,
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#1f2937">
      <div style="max-width:700px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden">
        <header style="background:#176b45;color:white;padding:28px;text-align:center">
          <h1>Lácteos Axúme</h1>
          <p>Comprobante de compra</p>
        </header>

        <main style="padding:28px">
          <h2>¡Gracias por tu compra!</h2>
          <p>Hola, ${escaparHTML(factura.nombreCliente)}.</p>
          <p>Te compartimos el detalle de tu compra.</p>

          <p><strong>Número de venta:</strong> ${factura.numeroVenta}</p>
          <p><strong>Fecha:</strong> ${escaparHTML(factura.fecha)}</p>

          <h3>Detalle de productos</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="background:#e8f3ed">
                <th style="padding:10px;text-align:left">Producto</th>
                <th style="padding:10px">Cant.</th>
                <th style="padding:10px;text-align:right">Precio</th>
                <th style="padding:10px;text-align:right">Descuento</th>
                <th style="padding:10px;text-align:right">Subtotal</th>
              </tr>
            </thead>
            <tbody>${filas}</tbody>
          </table>

          <div style="margin-top:24px;text-align:right">
            <p>Subtotal: <strong>${dinero(factura.subtotal)}</strong></p>
            <p>Descuento general: <strong>${dinero(factura.descuento)}</strong></p>
            <p>Impuestos: <strong>${dinero(factura.impuesto)}</strong></p>
            <p style="font-size:22px;color:#176b45">
              Total: <strong>${dinero(factura.total)}</strong>
            </p>
          </div>

          <hr>
          <p style="font-size:13px;color:#6b7280">
            Conserva este mensaje como referencia de tu compra en Lácteos Axúme.
          </p>
        </main>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: {
      name: process.env.SMTP_FROM_NAME || "Lácteos Axúme",
      address: process.env.SMTP_USER,
    },
    to: factura.destinatario,
    subject: `Detalle de tu compra - Venta #${factura.numeroVenta}`,
    text: [
      `Hola, ${factura.nombreCliente}.`,
      `Venta: ${factura.numeroVenta}`,
      `Fecha: ${factura.fecha}`,
      `Subtotal: ${dinero(factura.subtotal)}`,
      `Descuento: ${dinero(factura.descuento)}`,
      `Impuestos: ${dinero(factura.impuesto)}`,
      `Total: ${dinero(factura.total)}`,
    ].join("\n"),
    html,
  });
}

/**
 * Envía un correo de prueba desde la cuenta SMTP configurada.
 * Esta función se expone únicamente mediante una ruta protegida por JWT.
 */
export async function enviarCorreoDePrueba(
  destinatario: string,
  asunto: string,
  mensaje: string,
): Promise<void> {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("La configuración SMTP está incompleta.");
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(destinatario)) {
    throw new Error("El correo destinatario no es válido.");
  }
  if (!asunto.trim() || !mensaje.trim()) {
    throw new Error("El asunto y el mensaje son obligatorios.");
  }

  await transporter.sendMail({
    from: {
      name: process.env.SMTP_FROM_NAME || "Lácteos Axúme",
      address: process.env.SMTP_USER,
    },
    to: destinatario,
    subject: asunto,
    text: mensaje,
  });
}
export async function enviarCodigoCambioPassword(
  destinatario: string,
  nombre: string,
  codigo: string,
  minutosExpiracion: number,
): Promise<void> {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("La configuración SMTP está incompleta.");
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#1f2937">
      <div style="max-width:500px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden">
        <header style="background:#176b45;color:white;padding:24px;text-align:center">
          <h1 style="margin:0">Lácteos Axúme</h1>
          <p style="margin:6px 0 0">Cambio de contraseña</p>
        </header>
        <main style="padding:28px;text-align:center">
          <p>Hola, ${escaparHTML(nombre)}.</p>
          <p>Usa este código para confirmar el cambio de tu contraseña:</p>
          <p style="font-size:34px;letter-spacing:8px;font-weight:bold;color:#176b45;margin:24px 0">
            ${escaparHTML(codigo)}
          </p>
          <p style="font-size:13px;color:#6b7280">
            El código vence en ${minutosExpiracion} minutos.
            Si no solicitaste este cambio, ignora este mensaje.
          </p>
        </main>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: {
      name: process.env.SMTP_FROM_NAME || "Lácteos Axúme",
      address: process.env.SMTP_USER,
    },
    to: destinatario,
    subject: "Código para cambiar tu contraseña",
    text: `Hola, ${nombre}. Tu código de verificación es ${codigo}. Vence en ${minutosExpiracion} minutos.`,
    html,
  });
}
