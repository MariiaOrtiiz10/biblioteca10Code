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
            'bookshelves' => 'Estanterías',
            'books' => 'Libros',
            'searchBooks' => 'Buscar Libros',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'charts' => 'Estadísticas',
            'graphics' => 'Estadísticas',
            'description' => [
                'users' => 'Gestiona a los usuarios del sistema',
                'floors' => 'Gestiona los pisos del sistema',
                'zones' => 'Gestiona las zonas del sistema',
                'bookshelves' => 'Gestiona las estanterias del sistema',
                'books' => 'Gestiona los libros del sistema',
                'searchBooks' => 'Localiza los libros del sistema',
                'loans' => 'Gestiona los préstamos del sistema',
                'reservations' => 'Gestiona las reservas del sistema',
                'charts' => 'Visualiza las estadísticas del sistema',
            ],
        ],
    ],

    'permissions' => [
        'users.view' => 'Ver usuarios',
        'users.create' => 'Crear usuarios',
        'users.edit' => 'Editar usuarios',
        'users.delete' => 'Eliminar usuarios',
        'users.timeline' => 'Ver timeline de usuarios',

        'floors.view' => 'Ver pisos',
        'floors.create' => 'Crear pisos',
        'floors.edit' => 'Editar pisos',
        'floors.delete' => 'Eliminar pisos',

        'zones.view' => 'Ver zonas',
        'zones.create' => 'Crear zonas',
        'zones.edit' => 'Editar zonas',
        'zones.delete' => 'Eliminar zonas',

        'bookshelves.view' => 'Ver estanterías',
        'bookshelves.create' => 'Crear estanterías',
        'bookshelves.edit' => 'Editar estanterías',
        'bookshelves.delete' => 'Eliminar estanterías',

        'books.view' => 'Ver libros',
        'books.searchBooks' => 'Ver buscador de libros',
        'books.create' => 'Crear libros',
        'books.edit' => 'Editar libros',
        'books.delete' => 'Eliminar libros',

        'loans.view' => 'Ver préstamos',
        'loans.create' => 'Crear préstamos',
        'loans.edit' => 'Editar préstamos',
        'loans.delete' => 'Eliminar préstamos',
        'loans.return' => 'Devolver préstamos',

        'reservations.view' => 'Ver reservas',
        'reservations.create' => 'Crear reservas',
        'reservations.record' => 'Ver historial de reservas',

        'statistics.view' => 'Ver estadísticas',

        'view.users' => 'Ver interfaz de usuarios',

        'settings.access' => 'Acceder a configuración',
        'settings.modify' => 'Modificar configuración',
    ],

    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona la configuración de tu perfil y cuenta',
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
            'email_label' => 'Dirección de correo electrónico',
            'email_placeholder' => 'Dirección de correo electrónico',
            'unverified_email' => 'Tu dirección de correo electrónico no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utiliza una contraseña larga y aleatoria para mantenerla segura',
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
        'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
        'min' => [
            'numeric' => 'El campo :attribute no puede ser un número negativo.',
            'string' => 'El campo :attribute debe tener al menos :min caracteres',
        ],
        'max' => [
            'string' => 'El campo :attribute no debe tener más de :max caracteres',
        ],
        'numeric' => 'El campo :attribute solo debe contener números.',
        "length" => [
            'isbn' => 'El campo :attribute debe tener exactamente 10 o 13 caracteres',
        ],
        'capacity' => [
            'floor' => 'El campo :attribute no puede ser menor que las zonas ocupadas, que es :occupiedZones',
            'zone' => 'El campo :attribute no puede ser menor que las estanterías ocupadas, que es :occupiedBookshelves',
            'bookshelf' => 'El campo :attribute no puede ser menor que los libros ocupados, que es :occupiedBooks',
        ],
        'unique' => 'El :attribute ya está en uso.',
        'confirmed' => 'La confirmación de :attribute no coincide.',
        'emailLoan' => 'El correo electrónico no existe en nuestro sistema',
        'isbnLoan' => 'El isbn del libro no existe en nuestro sistema',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters' => [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando del :from al :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primera',
            'last' => 'Última',
        ],
        'per_page' => 'Por página',
        'no_results' => 'Sin resultados',
        'results' => 'Total de resultados encontrados: ',
    ],

    'createUser' => [
        'pwd' => 'incluyendo caracteres y números',
        'Header' => [
            'newUser' => 'Crear Nuevo Usuario',
            'h2' => 'Introduce la información para crear un nuevo usuario en el sistema',
        ],
        'Tab' => [
            'basicInformation' => [
                'title' => 'Información básica',
            ],
            'roles_permission' => [
                'title' => 'Roles y Permisos',
            ],
        ],
        'Rol' => [
            'create' => 'Rol principal',
            'select' => [
                'default' => 'Selecciona un rol',
                'op1' => 'Administrador',
                'op2' => 'Empleado',
                'op3' => 'Editor',
                'op4' => 'Lector',
                'msg' => 'El rol determina el nivel de acceso general del usuario',
            ],
            'permission' => [
                'title' => 'Permisos específicos',
                'users' => [
                    'title' => 'Usuarios',
                ],
                'floors' => [
                    'title' => 'Pisos',
                ],
                'zones' => [
                    'title' => 'Zonas',
                ],
                'bookshelves' => [
                    'title' => 'Estanterías',
                ],
                'books' => [
                    'title' => 'Libros',
                ],
                'loans' => [
                    'title' => 'Prestámos',
                ],
                'reservations' => [
                    'title' => 'Reservas',
                ],
                'statistics' => [
                    'title' => 'Estadísticas',
                ],
                'view' => [
                    'title' => 'Interfaz de usuario',
                ],
                'settings' => [
                    'title' => 'Ajustes',
                ],
            ],
        ],
    ],

    'editUser' => [
        'Header' => [
            'editUser' => 'Editar usuario',
            'h2' => 'Introduce la información para crear un nuevo usuario en el sistema',
        ],
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Correo electrónico',
            'password' => 'Contraseña',
            'role' => 'Rol',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Correo electrónico',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre de usuario',
            'email' => 'Correo electrónico del usuario',
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
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.',
            'success' => 'Usuario eliminado correctamente',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'Sin resultados.',
        'error_loading' => 'Error al cargar usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando del :from al :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'genres' => [
        'genre' => 'Género'
    ],
    'floors' => [
        'title' => 'Pisos',
        'title2' => 'Piso',
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'delete_dialog' => [
            'success' => 'Piso eliminado correctamente',
        ],
        'fields' => [
            'floorNumber' => 'Número de Piso',
            'floorName' => 'Nombre del Piso',
            'zonesCapacity' => 'Capacidad de Zonas',
        ],
        'index' => [
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
            'floorNumber' => 'Número de piso',
            'floorName' => 'Nombre del piso',
            'zonesCapacity' => 'Capacidad de Zonas',
            'occupiedZones' => 'Zonas Ocupadas',
            'avaibleZones' => 'Ocupadas / Capacidad de Zonas',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'floorNumber' => 'Número de piso',
            'floorName' => 'Nombre del piso',
            'zonesCapacity' => 'Capacidad de zonas',
            'createdAt' => 'Creado el',
        ],
        'createFloor' => [
            'subtitle' => 'Introduce la información para crear un nuevo piso en el sistema',
            'placeholders' => [
                'floorNumber' => 'Introduce un número de piso',
                'floorName' => 'Introduce un nombre de piso',
                'zonesCapacity' => 'Introduce el número de zonas que caben en el piso',
            ],
        ],
        'editFloor' => [
            'subtitle' => 'Introduce la información para editar un piso en el sistema'
        ],
        'placeholders' => [
            'floorName' => 'Nombre...',
            'floorNumber' => 'Número...',
            'zonesCapacity' => 'Máx. zonas...',
            'search' => 'Buscar pisos...',
            'select' => 'Selecciona un número de piso',
            'createdAt' => 'Fecha...'
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El piso será eliminado permanentemente del sistema.',
        ],
        'occupied' => 'Ocupado',
        'no_results' => 'Sin resultados.',
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear Zona',
        'edit' => 'Editar Zona',
        'occupied' => 'Completo',
        'currentFloor' => 'Piso actual',
        'delete_dialog' => [
            'success' => 'Zona eliminada correctamente',
        ],
        'buttons' => [
            'new' => 'Nueva Zona',
            'cancel' => 'Cancelar',
            'update' => 'Actualizar',
            'save' => 'Guardar',
            'delete' => 'Eliminar',
            'edit' => 'Editar',
        ],
        'columns' => [
            'zoneName' => 'Nombre de Zona',
            'floorNumber' => 'Piso',
            'genre' => 'Género',
            'bookshelvesCapacity' => 'Capacidad de Estanterías',
            'occupiedBookshelves' => 'Estanterías Ocupadas',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'avaibleBookshelves' => 'Ocupadas / Capacidad de Estanterías',
        ],
        'fields' => [
            'zoneName' => 'Nombre de Zona',
            'floorNumber' => 'Piso',
            'bookshelvesCapacity' => 'Capacidad de Estanterías',
            'genre' => 'Género',
        ],
        'placeholders' => [
            'zoneName' => 'Nombre...',
            'floorNumber' => 'Número...',
            'genre' => 'seleccionar...',
            'bookshelvesCapacity' => 'Máx. estanterías...',
            'createdAt' => 'Fecha...',
        ],
        'filters' => [
            'zoneName' => 'Zona',
            'floorNumber' => 'Piso',
            'genre' => 'Género',
            'bookshelvesCapacity' => 'Capacidad de Estanterías',
            'createdAt' => 'Creado el',
        ],
        'createZone' => [
            'title' => 'Crear Zona',
            'subtitle' => 'Introduce la información para crear una nueva zona en el sistema',
            'floor' => 'Piso',
            'floorName' => 'Nombre',
            'genre' => 'Género',
            'placeholders' => [
                'selectFloor' => 'Selecciona un número de piso existente',
                'zoneName' => 'Introduce un nombre de zona',
                'selectGenre' => 'Selecciona un género existente',
                'searchGenre' => 'Busca el género de la zona',
                'bookshelvesCapacity' => 'Introduce el número de estanterías que caben en la zona'
            ],
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La zona será eliminada permanentemente del sistema.',
        ],
        'editZone' => [
            'title' => 'Editar Zona',
            'subtitle' => 'Introduce la información para editar una zona en el sistema',
        ],
        'no_results' => 'Sin resultados.',
    ],

    'bookshelves' => [
        'title' => 'Estanterías',
        'create' => 'Crear Estantería',
        'edit' => 'Editar Estantería',
        'floor' => 'Piso',
        'floorName' => 'Nombre',
        'zone' => 'Zone',
        'genre' => 'Género',
        'occupied' => 'Completo',
        'currentFloor' => 'Piso actual',
        'currentZone' => 'Zona actual',
        'delete_dialog' => [
            'success' => 'Estantería eliminada correctamente',
        ],
        'buttons' => [
            'new' => 'Nueva Estantería',
            'cancel' => 'Cancelar',
            'update' => 'Actualizar',
            'save' => 'Guardar',
            'delete' => 'Eliminar',
            'edit' => 'Editar',
            'created_at' => 'Creado el',
        ],
        'columns' => [
            'zoneName' => 'Zona',
            'floorNumber' => 'Piso',
            'bookshelfNumber' => 'Número de Estantería',
            'booksCapacity' => 'Capacidad de Libros',
            'occupiedBooks' => 'Libros Ocupados',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'avaibleBooks' => 'Ocupados / Capacidad de Libros',
        ],

        'placeholders' => [
            'bookshelfNumber' => 'Número...',
            'floorNumber' => 'Número...',
            'zoneName' => 'Nombre...',
            'booksCapacity' => 'Máx. libros...',
            'createdAt' => 'Fecha...',
        ],
        'filters' => [
            'bookshelfNumber' => 'Estantería',
            'zoneName' => 'Zona',
            'floorNumber' => 'Piso',
            'booksCapacity' => 'Capacidad de Libros',
            'createdAt' => 'Creado el',
        ],
        'fields' => [
            'bookshelfNumber' => 'Número de Estantería',
            'floor' => 'Piso',
            'zone' => 'Zona',
            'bookshelvesCapacity' => 'Capacidad de Libros',
            'genre' => 'Género',
        ],
        'createBookshelf' => [
            'title' => 'Crear Estantería',
            'subtitle' => 'Introduce la información para crear una nueva estantería en el sistema',
            'floor' => 'Piso',
            'genre' => 'Género',
            'placeholders' => [
                'selectFloor' => 'Selecciona un piso existente',
                'zoneName' => 'Introduce un nombre de zona',
                'bookshelfNumber' => 'Introduce un número de estantería',
                'selectZone' => 'Selecciona una zona existente',
                'bookshelvesCapacity' => 'Introduce el número de libros que caben en la estantería'
            ],
        ],
        'editBookshelf' => [
            'title' => 'Editar Estantería',
            'subtitle' => 'Introduce la información para editar una estantería en el sistema',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La estantería será eliminada permanentemente del sistema.',
        ],
        'no_results' => 'Sin resultados.',
    ],
    'books' => [
        'title' => 'Libros',
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'floor' => 'Piso',
        'defaultGenre' => 'Género de Zona',
        'available' => 'Disponible',
        'notAvailable' => 'No Disponible',
        'occupied' => 'Completo',
        'currentFloor' => 'Piso actual',
        'currentZone' => 'Zona actual',
        'currentBookshelf' => 'Estantería actual',
        'changeImage' => 'Cambiar Imagen',
        'selectImage' => 'Seleccionar Imagen',
        'delete_dialog' => [
            'success' => 'Libro eliminado correctamente',
        ],
        'buttons' => [
            'new' => 'Nuevo Libro',
            'cancel' => 'Cancelar',
            'update' => 'Actualizar',
            'save' => 'Guardar',
            'delete' => 'Eliminar',
            'edit' => 'Editar',
            'noDelete' => 'Libro actualmente prestado y no se puede eliminar',
            'loan' => 'Prestar Libro',
            'reserve' => 'Reservar Libro',
        ],
        'columns' => [
            'isbn' => 'ISBN',
            'title' => 'Título',
            'author' => 'Autor',
            'editorial' => 'Editorial',
            'genres' => 'Géneros',
            'pages' => 'Páginas',
            'floorNumber' => 'Piso',
            'zoneName' => 'Zona',
            'available' => 'Disponibilidad',
            'bookshelfNumber' => 'Estantería',
            'created_at' => 'Creado el',
            'actions' => 'Acciones',
            'availableBookIsbn' => 'Disponible / Total',
        ],
        'placeholders' => [
            'isbn' => 'Identificador del libro...',
            'title' => 'título...',
            'author' => 'autor...',
            'editorial' => 'texto...',
            'pages' => 'número...',
            'available' => 'seleccionar disponibilidad...',
            'genres' => 'Géneros...',
            'floors' => 'seleccionar piso...',
            'zones' => 'seleccionar zona...',
            'bookshelves' => 'seleccionar estantería...',
        ],
        'filters' => [
            'isbn' => 'ISBN',
            'title' => 'Título',
            'author' => 'Autor',
            'editorial' => 'Editorial',
            'pages' => 'Páginas',
            'genres' => 'Géneros',
            'available' => 'Disponibilidad',
            'floors' => 'Pisos',
            'zones' => 'Zonas',
            'bookshelves' => 'Estanterías',
        ],
        'fields' => [
            'isbn' => 'ISBN',
            'title' => 'Título',
            'pages' => 'Páginas',
            'author' => 'Autor',
            'editorial' => 'Editorial',
            'floor' => 'Piso',
            'zone' => 'Zona',
            'bookshelf' => 'Estantería',
            'genres' => 'Géneros',
            'image' => 'Imagen',
        ],
        'createBook' => [
            'title' => 'Crear Libro',
            'subtitle' => 'Introduce la información para crear un nuevo libro en el sistema',
            'floor' => 'Piso',
            'genre' => 'Género',
            'basicInformation' => 'Información Básica',
            'location' => 'Ubicación',
            'placeholders' => [
                'isbn' => 'Introduce un ISBN válido (10 o 13 dígitos)',
                'title' => 'Introduce un título de libro',
                'pages' => 'Introduce el número de páginas del libro',
                'author' => 'Introduce el autor del libro',
                'editorial' => 'Introduce la editorial del libro',
                'selectFloor' => 'Selecciona un piso existente',
                'selectZone' => 'Selecciona una zona existente',
                'selectBookshelf' => 'Selecciona una estantería existente',
            ],
        ],
        'editBook' => [
            'title' => 'Editar Libro',
            'subtitle' => 'Introduce la información para editar un libro en el sistema',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El libro será eliminado permanentemente del sistema.',
        ],
        'no_results' => 'Sin resultados.',
    ],
    'searchBooks' => [
        'title' => 'Buscar Libros',
    ],
    'loans' => [
        'title' => 'Préstamos',
        'create' => 'Crear Préstamo',
        'edit' => 'Editar Préstamo',
        'active' => 'Activo',
        'return' => 'Devuelto',
        'confirmReturn' => '¿Estás seguro de devolver el libro?',
        'returnEarly' => 'Sin Retraso',
        'delete_dialog' => [
            'success' => 'Préstamo eliminado correctamente',
        ],
        'buttons' => [
            'new' => 'Nuevo Préstamo',
            'cancel' => 'Cancelar',
            'update' => 'Actualizar',
            'save' => 'Guardar',
            'delete' => 'Eliminar',
            'edit' => 'Editar',
            'return' => 'Devolver',
        ],
        'columns' => [
            'email' => 'Correo electrónico',
            'isbn' => 'ISBN',
            'title' => 'Título del Libro',
            'actions' => 'Acciones',
            'start_date' => 'Fecha de Inicio del Préstamo',
            'end_date' => 'Fecha de Vencimiento',
            'loan_duration' => 'Período de Préstamo',
            'status' => 'Estado',
            'delayed_days' => 'Días de Retraso',
            'returned_at' => 'Devuelto el',
        ],
        'placeholders' => [
            'loan_duration' => 'Días...',
            'email' => 'correo@ejemplo.com',
            'isbn' => 'ISBN...',
            'start_date' => 'Fecha...',
            'end_date' => 'Fecha...',
            'title' => 'Título del libro...',
            'status' => 'Seleccionar estado...'
        ],
        'filters' => [
            'loan_duration' => 'Período de Préstamo',
            'email' => 'Correo del Usuario',
            'isbn' => 'ISBN del Libro',
            'start_date' => 'Fecha de Inicio',
            'end_date' => 'Fecha de Vencimiento',
            'title' => 'Título',
            'status' => 'Estado',
        ],
        'fields' => [
            'email' => 'Correo electrónico',
            'isbn' => 'ISBN',
            'loanDuration' => 'Duración del Préstamo',
        ],
        'createLoan' => [
            'title' => 'Crear Préstamo',
            'subtitle' => 'Introduce la información para crear un nuevo préstamo en el sistema',
            'placeholders' => [
                'email' => 'Introduce un correo electrónico de usuario existente',
                'isbn' => 'Introduce un ISBN de libro existente',
                'loanDuration' => 'Introduce la duración del préstamo',
                'searchEmail' => 'Busca el correo del usuario'
            ],
        ],
        'editLoan' => [
            'title' => 'Editar Préstamo',
            'subtitle' => 'Introduce la información para editar un préstamo en el sistema',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. El préstamo será eliminado permanentemente del sistema.',
        ],
        'no_results' => 'Sin resultados.',
    ],
    'reservations' => [
        'title' => 'Reservas',
        'create' => 'Crear Reserva',
        'delete_dialog' => [
            'success' => 'Reserva eliminada correctamente',
        ],
        'buttons' => [
            'new' => 'Nueva Reserva',
            'history' => 'Historial',
            'cancel' => 'Cancelar',
            'update' => 'Actualizar',
            'save' => 'Guardar',
            'delete' => 'Eliminar',
            'edit' => 'Editar',
            'back' => 'Volver a reservas',
        ],
        'columns' => [
            'email' => 'Correo electrónico',
            'isbn' => 'ISBN',
            'title' => 'Título del Libro',
            'actions' => 'Eliminar',
            'created_at' => 'Fecha de Reserva',
            'deleted_at' => 'Eliminada el',
        ],
        'placeholders' => [
            'email' => 'correo@ejemplo.com',
            'isbn' => 'ISBN del Libro...',
            'title' => 'Titulo del Libro...',
            'created_at' => 'Fecha ...',
        ],
        'filters' => [
            'loan_duration' => 'Período de Préstamo',
            'email' => 'Correo',
            'isbn' => 'ISBN',
            'title' => 'Titulo',
            'created_at' => 'Fechas de reserva',
        ],
        'fields' => [
            'email' => 'Correo electrónico',
            'isbn' => 'ISBN',
            'loanDuration' => 'Duración del Préstamo',
        ],
        'createReservation' => [
            'title' => 'Crear Reserva',
            'subtitle' => 'Introduce la información para crear una nueva reserva en el sistema',
            'placeholders' => [
                'email' => 'Introduce un correo electrónico de usuario existente',
                'isbn' => 'Introduce un ISBN de libro existente',
                'loanDuration' => 'Introduce la duración del préstamo',
            ],
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. La reserva será eliminada permanentemente del sistema.',
        ],
        'no_results' => 'Sin resultados.',
    ],
    'history' => [
        'title' => 'Historial de reservas',
        'no_results' => 'No results.',
    ],

    'timeline' => [
        'author' => 'Autor',
        'start_date' => 'Inicio préstamo',
        'end_date' => 'Fin de prétamo',
        'returned' => 'Devuelto el',
        'status' => 'Estado',
        'no_delay' => 'Sin Retraso',
        'delay' => ' días de retraso',
        'start_reservation' => 'Reservado el',
        'deleted' => 'Reserva eliminada',
        'deleted_at' => 'Reserva eliminada el',
        'ongoing' => 'En curso',
        'returned2' => 'Devuelto',
        'filter' => [
            'all' => 'Todo',
            'reservation' => 'Reservas',
            'loans' => 'Préstamos',
        ],
    ],

    'charts' => [
        'title' => 'Estadísticas en vivo',
        'description' => 'Descubre las estádisticas mas destacadas: los libros favoritos, los lectores más activos y las zonas con más movimiento en un vistazo.',
        'navigation' => [
            'books' => 'Libros',
            'users' => 'Usuarios',
            'zones' => 'Zonas',
        ],
        'book' => [
            'title' => 'Libros favoritos',
            'total' => 'Total',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'isbn' => 'ISBN',
            'topLoans' => 'Top 8 libros con más préstamos',
            'topReservations' => 'Top 8 libros con más reservas'

        ],
        'user' => [
            'title' => 'Usuarios más activos',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'total' => 'Total',
            'topLoans' => 'Top 8 usuarios con más préstamos',
            'topReservations' => 'Top 8 usuarios con más reservas'
        ],
        'zone' => [
            'title' => 'Zonas con más movimientos',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'total' => 'Total',
            'topLoans' => 'Top 8 zonas con más préstamos',
            'topReservations' => 'Top 8 zonas con más reservas'
        ]

    ],

    'us' => [
        'timeline' => [
            'title' => 'Acciones del usuario',
            'user' => 'Usuario',
        ]

    ],

    'genres' => [
        'Science Fiction' => 'Ciencia ficción',
        'Fantasy' => 'Fantasía',
        'Historical' => 'Histórico',
        'Mystery' => 'Misterio',
        'Horror' => 'Terror',
        'Crime' => 'Policíaco',
        'Autobiography' => 'Autobiografía',
        'Self-help' => 'Autoayuda',
        'Romance' => 'Romance',
        'Cooking' => 'Cocina',
        'Childrens literature' => 'Literatura infantil',
        'Youth literature' => 'Literatura juvenil',
    ],

    'roles' => [
        'Administrador' => 'Administrador',
        'Editor' => 'Editor',
        'Reader' => 'Lector',
        'User' => 'Usuario',
    ]

];
