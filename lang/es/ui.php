<?php

return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
            'floors' => 'Pisos',
            'zones' => 'Zonas',
            'bookshelves' => 'Estanterias',
            'books' => 'Libros',
        ],
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo :attribute es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],

    'createUser' => [
        'pwd' => 'incluyendo letras y números',
        'Tab' => [
            'basicInformation' => [
                'title' => 'Información básica',

            ],
            'roles_permission' => [
                'title' => 'Roles y Permisos',
            ],
        ],
        'Header' => [
            'newUser'=> 'Crear Nuevo Usuario',
            'h2'=>'Ingresa la información para crear un nuevo usuario en el sistema',
        ],
        'Rol' =>[
            'create' => 'Rol princicpal',
            'select' => [
                'default' => 'Selecciona un rol',
                'op1' => 'Administrador',
                'op2' => 'Empleado',
                'op3' =>'Editor',
                'op4' => 'Lector',
                'msg' => 'El rol determina el nivel de acceso general del usuario',
            ],
            'permission'=>[
                'title' => 'Permisos específicos',
                'users' =>[
                    'title' => 'Usuarios',
                    '1' => 'Ver usuarios',
                    '2' => 'Crear usuarios',
                    '3' => 'Editar usuarios',
                    '4' => 'Eliminar usuarios',
                ],
                'products' => [
                    'title' => 'Productos',
                    '1' => 'Ver productos',
                    '2' => 'Crear productos',
                    '3' => 'Editar productos',
                    '4' => 'Eliminar productos',
                ],
                'reports'=>[
                    'title' => 'Reportes',
                    '1' => 'Ver reportes',
                    '2' => 'Exportar reportes',
                    '3' => 'Imprimir reportes',
                ],
                'settings' => [
                    'title'=> 'Configuración',
                    '1' => 'Acceso a configuración',
                    '2' => 'Modificar Configuración',
                ],
            ],
        ],

    ],
    'editUser' =>[
        'Header' => [
            'editUser'=> 'Editar usuario',
            'h2'=> 'Enter the information to create a new user in the system',
        ],
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'role' => 'Rol',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'floors' =>[
        'title' => 'Pisos',
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'index'=>[
            'floor' => 'Piso',
            'capacity' => 'Capacidad',
        ],
        'buttons' => [
            'new' => 'Nuevo Piso',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'columns' => [
            'floorNumber' => 'Número del piso',
            'floorName' => 'Nombre del piso',
            'zonesCapacity' => 'Capacidad de Zonas',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'floorNumber' => 'Número del piso',
            'floorName' => 'Nombre del piso',
        ],
        'placeholders' => [
            'floorName' => 'Nombre...',
            'floorNumber' => 'Número...',
            'search' => 'Buscar pisos...',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
        ],
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear Zona',
        'buttons' => [
            'new' => 'Nueva Zona',
        ],
        'columns' => [
            'floorName' => 'Piso',
            'bookshelvesCapacity' => 'Capacidad de Estanterias',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],



    ],
    'bookshelves' => [
        'title' => 'Estanterias',
        'create' => 'Crear Estanteria',
        'buttons' => [
            'new' => 'Nueva Estanteria',
        ],
    ],
    'books' => [
        'title' => 'Libro',
        'create' => 'Crear Libro',
        'buttons' => [
            'new' => 'Nuevo Libro',
        ],
    ],
];
