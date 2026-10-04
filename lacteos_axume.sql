USE `lacteos_axume`;

SELECT 
    ru.usercod AS `Código Usuario`,
    u.username AS `Usuario`,
    ru.rolescod AS `Código Rol`,
    r.rolesdsc AS `Descripción Rol`,
    ru.roleuserfch AS `Fecha Asignación`
FROM `roles_usuarios` ru
JOIN `usuario` u ON ru.usercod = u.usercod
JOIN `roles` r ON ru.rolescod = r.rolescod
ORDER BY ru.usercod ASC;