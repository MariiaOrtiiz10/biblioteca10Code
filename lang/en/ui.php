<?php
return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
            'floors' => 'Floors',
            'zones' => 'Zones',
            'bookshelves' => 'Bookshelves',
            'books' => 'Books',
            'searchBooks' => 'Search Books',
            'loans' => 'Loans',

        ],
    ],
    'user_menu' => [
        'settings' => 'Settings',
        'logout' => 'Log out',
    ],
    'auth' => [
        'failed' => 'These credentials do not match our records.',
        'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    ],
    'settings' => [
        'title' => 'Settings',
        'description' => 'Manage your profile and account settings',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
        ],
        'profile' => [
            'title' => 'Profile settings',
            'information_title' => 'Profile information',
            'information_description' => 'Update your name and email address',
            'name_label' => 'Name',
            'name_placeholder' => 'Full name',
            'email_label' => 'Email address',
            'email_placeholder' => 'Email address',
            'unverified_email' => 'Your email address is unverified.',
            'resend_verification' => 'Click here to resend the verification email.',
            'verification_sent' => 'A new verification link has been sent to your email address.',
            'save_button' => 'Save',
            'saved_message' => 'Saved',
        ],
        'password' => [
            'title' => 'Password settings',
            'update_title' => 'Update password',
            'update_description' => 'Ensure your account is using a long, random password to stay secure',
            'current_password_label' => 'Current password',
            'current_password_placeholder' => 'Current password',
            'new_password_label' => 'New password',
            'new_password_placeholder' => 'New password',
            'confirm_password_label' => 'Confirm password',
            'confirm_password_placeholder' => 'Confirm password',
            'save_button' => 'Save password',
            'saved_message' => 'Saved',
        ],
        'appearance' => [
            'title' => 'Appearance settings',
            'description' => 'Update your account\'s appearance settings',
            'modes' => [
                'light' => 'Light',
                'dark' => 'Dark',
                'system' => 'System'
            ]
        ],
        'languages' => [
            'title' => 'Language settings',
            'description' => 'Change your preferred language',
        ],
    ],
    'validation' => [
           'required' => 'The :attribute field is required.',
            'email' => 'The :attribute field must be a valid email address.',
            'min' => [
                'numeric' => 'The :attribute field  cannot be a negative number.',
                'string' => 'The :attribute field must be at least :min characters',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters',
            ],
            'capacity' =>[
                'floor' => 'The :attribute field cannot be less than the occupied zones, that is :occupiedZones',
                'zone' => 'The :attribute field cannot be less than the occupied bookshelves, that is :occupiedBookshelves',

            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters'=> [
            'title' => 'Filters',
            'clear' => 'Clear',
        ],
        'delete_dialog' => [
            'success' => 'User deleted successfully',
        ],
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
            'first' => 'First',
            'last' => 'Last',
        ],
        'per_page' => 'Per page',
        'no_results' => 'No results',
    ],
    'createUser' => [
        'pwd' => 'including characters and numbers',
        'Header' => [
            'newUser'=> 'Create New User',
            'h2'=> 'Enter the information to create a new user in the system',
        ],
        'Tab' => [
            'basicInformation' => [
                'title' => 'Basic information',

            ],
            'roles_permission' => [
                'title' => 'Roles and Permissions',
            ],
        ],
        'Rol' =>[
            'create' => 'Main role',
            'select' => [
                'default' => 'Select a role',
                'op1' => 'Admin',
                'op2' =>'Employer',
                'op3' => 'Editor',
                'op4' => 'Reader',
                'msg' => 'The role determines the level of general access of the user',
            ],
            'permission'=>[
                'title' => 'Specific permission',
                'users' =>[
                    'title' => 'Users',
                    '1' => 'View users',
                    '2' => 'Create users',
                    '3' => 'Edit users',
                    '4' => 'Delete users',

                ],
                'products' => [
                    'title' => 'Products',
                    '1' => 'View products',
                    '2' => 'Create products',
                    '3' => 'Edit products',
                    '4' => 'Delete products',
                ],
                'reports'=>[
                    'title' => 'Reports',
                    '1' => 'View reports',
                    '2' => 'Export reports',
                    '3' => 'Print reports',
                ],
                'settings' => [
                    'title'=> 'Settings',
                    '1' => 'Access to settings',
                    '2' => 'Modify settings',
                ],
            ],
        ],
    ],
    'editUser' => [
        'Header' => [
            'editUser'=> 'Edit user',
            'h2'=> 'Enter the information to create a new user in the system',
        ],
    ],

    'users' => [
        'title' => 'Users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'role' => 'Role',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'columns' => [
            'name' => 'Name',
            'email' => 'Email',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'User name',
            'email' => 'User email',
        ],
        'placeholders' => [
            'name' => 'Full username',
            'email' => 'mail@example.com',
            'password' => 'Secure password',
            'search' => 'Search users...',
        ],
        'buttons' => [
            'new' => 'New User',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting user',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading users. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],

    'floors' =>[
        'title' => 'Floors',
        'title2' => 'Floor',
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
        'fields' => [
            'floorNumber' => 'Floor Number',
            'floorName' => 'Floor Name',
            'zonesCapacity' => 'Zones Capacity',
        ],
        'index'=>[
            'floor' => 'Floor',
            'capacity' => 'Capacity',
        ],
        'buttons' => [
        'new' => 'New Floor',
        'edit' => 'Edit',
        'save' => 'Save',
        'update' => 'Update',
        'cancel' => 'Cancel',
        'delete' => 'Delete',
        'deleting' => 'Deleting...',
        'saving' => 'Saving...',
        'retry' => 'Retry',
        ],
        'columns' => [
            'floorNumber' => 'Floor number',
            'floorName' => 'Floor name',
            'zonesCapacity' => 'Zones Capacity',
            'occupiedZones' => 'Occupied Zones',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'search' => 'Search',
            'floorNumber' => 'Floor number',
            'floorName' => 'Floor name',
            'zonesCapacity' => 'Capacity zones',
            'createdAt' => 'Created At',
        ],
        'createFloor' => [
            'subtitle' => 'Enter the information to create a new floor in the system'
        ],
        'editFloor' => [
            'subtitle' => 'Enter the information to edit a floor in the system'
        ],

        'placeholders' => [
            'floorName' => 'Name...',
            'floorNumber' => 'Number...',
            'zonesCapacity' => 'Max zones...',
            'search' => 'Search floors...',
            'select' => 'Select a floor number',
            'createdAt' => 'Date...'
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The floor will be permanently deleted from the system.',
        ],
        'occupied' => 'Occupied',
        'no_results' => 'No results.',
    ],


    'zones' => [
        'title' => 'Zones',
        'create' => 'Create Zone',
        'edit' => 'Edit Zone',
        'occupied' => 'Complete',
        'currentFloor' => 'Current floor',
        'buttons' => [
            'new' => 'New Zone',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save'
        ],
        'columns' => [
            'zoneName' => 'Zone Name',
            'floorNumber' => 'Floor',
            'genre' => 'Genre',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'occupiedBookshelves' => 'Occupied Bookshelves',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'fields' => [
            'zoneName' => 'Zone Name',
            'floorNumber' => 'Floor',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'genre' => 'Genre',
        ],
        'placeholders' =>[
            'zoneName' => 'Name...',
            'floorNumber' => 'Number...',
            'genre' => 'text...',
            'bookshelvesCapacity'=> 'Max bookshelves...',

        ],
        'filters' => [
            'zoneName' => 'Zone',
            'floorNumber' => 'Floor',
            'genre' => 'Genre',
            'bookshelvesCapacity'=> 'Bookshelves Capacity',
        ],
        'createZone' =>[
            'title' => 'Create Zone',
            'subtitle' => 'Enter the information to create a new zone in the system',
            'floor' => 'Floor',
            'floorName' => 'Name',
            'genre' => 'Genre',
            'placeholders' => [
                'selectFloor' => 'Select an existing floor number',
                'zoneName' => 'Enter a zone name',
                'selectGenre' => 'Select an existing genre',
                'bookshelvesCapacity' => 'Enter a number for bookshelves capacity '
            ],
        ],
        'editZone' =>[
                'title' => 'Edit Zone',
                'subtitle' => 'Enter the information to edit a zone in the system',
            ],

        'no_results' => 'No results.',

    ],


    'bookshelves' => [
        'title' => 'Bookshelves',
        'create' => 'Create Bookshelf',
        'edit' => 'Edit Bookshelf',
        'floor' => 'Floor',
        'floorName' => 'Name',
        'occupied' => 'Complete',
        'currentFloor' => 'Current floor',
        'currentZone' => 'Current zone',
        'buttons' => [
            'new' => 'New Bookshelf',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
        ],
        'columns' => [
            'zoneName' => 'Zone Name',
            'floorNumber' => 'Floor',
            'bookshelfNumber' => 'Bookshelf Number',
            'booksCapacity' => 'Books Capacity',
            'occupiedBooks' => 'Occupied Books',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'placeholders' =>[
            'bookshelfNumber' => 'Number...',
            'floorNumber' => 'Number...',
            'zoneName' => 'Name...',
            'booksCapacity'=> 'Max books...',

        ],
        'filters' => [
            'bookshelfNumber' => 'Bookshelf',
            'zoneName' => 'Zone',
            'floorNumber' => 'Floor',
            'booksCapacity'=> 'Books Capacity',

        ],
        'fields' => [
            'bookshelfNumber' => 'Bookshelf Number',
            'floor' => 'Floor',
            'zone' => 'Zone',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'genre' => 'Genre',
        ],
        'createBookshelf' =>[
            'title' => 'Create Bookshelf',
            'subtitle' => 'Enter the information to create a new bookshelf in the system',
            'floor' => 'Floor',
            'genre' => 'Genre',
            'placeholders' => [
                'selectFloor' => 'Select an existing floor',
                'zoneName' => 'Enter a zone name',
                'bookshelfNumber' => 'Enter a bookshelf number',
                'selectZone' => 'Select an existing zone',
                'bookshelvesCapacity' => 'Enter a number for bookshelves capacity '
            ],
        ],
        'editBookshelf' => [
            'title' => 'Edit Bookshelf',
            'subtitle' => 'Enter the information to edit a bookshelf in the system',

        ],
        'no_results' => 'No results.',
    ],

    'books' => [
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'buttons' => [
            'new' => 'New  Book',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save'
        ],
        'columns' => [
            'isbn' => 'ISBN',
            'title' => 'Title',
            'author' => 'Author',
            'editorial' => 'Editorial',
            'genres'=> 'Genres',
            'pages' => 'Pages',
            'floorNumber' => 'Floor',
            'zoneName' => 'Zone',
            'bookshelfNumber' => 'Bookshelf',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'placeholders' =>[
            'isbn' => 'Book identifier...',
            'title' => 'title...',
            'author' => 'author...',
            'editorial' => 'text...',
            'pages' => 'number...',
        ],
        'filters' => [
            'isbn' => 'ISBN',
            'title' => 'Title',
            'author' => 'Author',
            'editorial' => 'Editorial',
            'pages' => 'Pages',

        ],
        'fields' => [

        ],
        'createBook' =>[
            'title' => 'Create Bookshelf',
            'subtitle' => 'Enter the information to create a new bookshelf in the system',
            'floor' => 'Floor',
            'genre' => 'Genre',
            'placeholders' => [
                'selectFloor' => 'Select an existing floor',
                'zoneName' => 'Enter a zone name',
                'bookshelfNumber' => 'Enter a bookshelf number',
                'selectZone' => 'Select an existing zone',
                'bookshelvesCapacity' => 'Enter a number for bookshelves capacity '
            ],
        ],
        'editBook' => [
            'title' => 'Edit Bookshelf',
            'subtitle' => 'Enter the information to edit a bookshelf in the system',

        ],
        'no_results' => 'No results.',
    ],
    'searchBooks' => [
        'title' => 'Search Books',
    ],



    ];
