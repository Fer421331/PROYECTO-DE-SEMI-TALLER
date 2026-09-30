-- ============================================================
-- PROYECTO: SISTEMA DE USUARIOS

-- ============================================================

DROP DATABASE IF EXISTS sistema_usuarios;
CREATE DATABASE sistema_usuarios
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sistema_usuarios;

-- ============================================================
-- TABLA DE USUARIOS
-- ============================================================

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    identidad VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    tipo ENUM('Administrador', 'Empleado', 'Cliente', 'Supervisor') NOT NULL DEFAULT 'Cliente',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- DATOS DE LOS USUARIOS
-- NOTA: Las contraseñas de ejemplo son hashes BCrypt.
-- Para un sistema real deben generarse desde el backend.
-- ============================================================

INSERT INTO usuarios
(identidad, nombre_completo, correo, usuario, contrasena, estado, tipo)
VALUES
('0801200421771',
 'Obed Emanuel Lambur Caceres',
 'obee_lamburc31@unicah.edu',
 'obee_lamburc31',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('080720042194',
 'Fernando Emmanuel Gomez Fu',
 'fernandogofu04@gmail.com',
 'fernandogofu04',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('1316200400192',
 'Adela Victoria Enamorado',
 'adenamorado192@unicah.edu',
 'adenamorado192',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('0708199800153',
 'Dayanna Ivette Espinal',
 'dayannaespinal14@gmail.com',
 'dayannaespinal14',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('0318200502081',
 'Salvador Adrian Romero',
 'sadrianromero9@gmail.com',
 'sadrianromero9',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('0506200401292',
 'Kelyn Leonela Rodriguez',
 'ariasleonela360@gmail.com',
 'ariasleonela360',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente'),

('0801200415036',
 'Javier Edgardo Laguna',
 'javierlaguna1974@gmail.com',
 'javierlaguna1974',
 '$2y$12$ulSaAidlcugVEqUu.CFu4ehDW/UMQo3gqaBo/LWA.UckXzvtI2daK',
 'Activo',
 'Cliente');

-- ============================================================
-- CONSULTAS DE COMPROBACIÓN
-- ============================================================

SELECT
    id_usuario,
    identidad,
    nombre_completo,
    correo,
    usuario,
    estado,
    tipo,
    fecha_creacion
FROM usuarios
ORDER BY id_usuario;

-- Ver estructura:
-- DESCRIBE usuarios;

-- Ver todos los registros:
-- SELECT * FROM usuarios;
