# Swagger / OpenAPI - Lácteos Axúme

## Acceso
Con el backend iniciado desde la carpeta `backend`:

- UI interactiva: `http://localhost:3000/api-docs`
- Especificación JSON: `http://localhost:3000/api-docs.json`

## Dependencias agregadas
- `swagger-jsdoc`: genera la especificación OpenAPI.
- `swagger-ui-express`: publica Swagger UI en Express.
- `multer`: recibe archivos enviados mediante `multipart/form-data`.
- Tipos TypeScript: `@types/swagger-jsdoc`, `@types/swagger-ui-express`, `@types/multer`.

Después de extraer el proyecto, ejecutar dentro de `backend`:

```bash
npm install
npm run dev
```

## Autenticación desde Swagger
1. Ejecutar `POST /api/auth/login` con `{ "user": "USUARIO", "password": "CONTRASEÑA" }`.
2. Copiar el valor `token` de la respuesta.
3. Pulsar **Authorize** en Swagger UI y pegar el JWT sin escribir `Bearer ` (Swagger agrega el esquema).
4. Ejecutar los endpoints protegidos.

## Correo de prueba
`POST /api/correos/prueba` requiere JWT y recibe:
```json
{
  "destinatario": "destino@correo.com",
  "asunto": "Prueba desde Swagger",
  "mensaje": "Mensaje de prueba"
}
```
Reutiliza el mismo transporte SMTP de `src/services/correo.service.ts`; no crea otra configuración SMTP.
El envío automático de facturas continúa ejecutándose desde los controladores de pagos al aprobarse/actualizarse un pago aprobado.

## Subida de imágenes
`POST /api/producto-imagenes/upload` requiere JWT y un archivo en el campo `imagen` (`multipart/form-data`).
Admite JPG/JPEG, PNG y WEBP hasta 5 MB. El archivo se guarda en `backend/public/uploads/productos` y se sirve bajo `/uploads/productos/...`.
La respuesta incluye la ruta que puede guardarse en `imagen_ruta` al crear el registro correspondiente con el endpoint existente `/api/producto-imagenes/create`.

## Alcance de la documentación
`src/docs/openapi.yaml` contiene el inventario OpenAPI de los endpoints registrados en `src/routes/index.ts`, además de autenticación, correo de prueba y subida de imágenes. Las rutas y métodos se basan en los archivos actuales del proyecto. En varias operaciones CRUD, los campos específicos deben confirmarse en el validador/controlador correspondiente; la documentación no cambia las reglas de negocio existentes.

## Seguridad
- No se incluye `.env` ni `node_modules` en este paquete.
- Configure localmente las variables existentes (`JWT_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_NAME`, y variables de conexión MySQL).
- Swagger UI se deja disponible en el entorno de desarrollo. Antes de producción, restrinja o deshabilite `/api-docs` según la política del despliegue.
- El endpoint de correo de prueba permite enviar a un destinatario arbitrario y está protegido por JWT; agregue autorización por rol y límites de uso antes de desplegarlo públicamente.
