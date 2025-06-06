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
            'reservations' => 'Reservations',
            'charts' => 'Statistics',
            'graphics' => 'Statistics',
            'description' => [
                'users' => 'Manage the system users',
                'floors' => 'Manage the system floors',
                'zones' => 'Manage the system zones',
                'bookshelves' => 'Manage the system bookshelves',
                'books' => 'Manage the system books',
                'searchBooks' => 'Locate the system books',
                'loans' => 'Manage the system loans',
                'reservations' => 'Manage the system reservations',
                'charts' => 'View the system statistics',
            ],
        ],

    ],

    'permissions' => [
        'users.view' => 'View users',
        'users.create' => 'Create users',
        'users.edit' => 'Edit users',
        'users.delete' => 'Delete users',
        'users.timeline' => 'View users timeline',

        'floors.view' => 'View floors',
        'floors.create' => 'Create floors',
        'floors.edit' => 'Edit floors',
        'floors.delete' => 'Delete floors',

        'zones.view' => 'View zones',
        'zones.create' => 'Create zones',
        'zones.edit' => 'Edit zones',
        'zones.delete' => 'Delete zones',

        'bookshelves.view' => 'View bookshelves',
        'bookshelves.create' => 'Create bookshelves',
        'bookshelves.edit' => 'Edit bookshelves',
        'bookshelves.delete' => 'Delete bookshelves',

        'books.view' => 'View books',
        'books.searchBooks' => 'View search books',
        'books.create' => 'Create books',
        'books.edit' => 'Edit books',
        'books.delete' => 'Delete books',

        'loans.view' => 'View loans',
        'loans.create' => 'Create loans',
        'loans.edit' => 'Edit loans',
        'loans.delete' => 'Delete loans',
        'loans.return' => 'Return loans',

        'reservations.view' => 'View reservations',
        'reservations.create' => 'Create reservations',
        'reservations.record' => 'View reservations record',

        'statistics.view' => 'View statistics',

        'view.users' => 'View user interface',

        'settings.access' => 'Access settings',
        'settings.modify' => 'Modify settings',
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
        'numeric' => 'The :attribute field must contain only numbers.',

        "length" => [
            'isbn' => 'The :attribute field must be exactly 10 or 13 characters long',
        ],
        'capacity' => [
            'floor' => 'The :attribute field cannot be less than the occupied zones, that is :occupiedZones',
            'zone' => 'The :attribute field cannot be less than the occupied bookshelves, that is :occupiedBookshelves',
            'zone' => 'The :attribute field cannot be less than the occupied books, that is :occupiedBooks',

        ],
        'unique' => 'The :attribute has already been taken.',
        'confirmed' => 'The :attribute confirmation does not match.',
        'emailLoan' => 'This email does not exist on our system',
        'isbnLoan' => 'The book isbn does not exist in our system',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters' => [
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
        'results' => 'Total results found: ',
    ],

    'createUser' => [
        'pwd' => 'including characters and numbers',
        'Header' => [
            'newUser' => 'Create New User',
            'h2' => 'Enter the information to create a new user in the system',
        ],
        'Tab' => [
            'basicInformation' => [
                'title' => 'Basic information',

            ],
            'roles_permission' => [
                'title' => 'Roles and Permissions',
            ],
        ],
        'Rol' => [
            'create' => 'Main role',
            'select' => [
                'default' => 'Select a role',
                'op1' => 'Admin',
                'op2' => 'Employer',
                'op3' => 'Editor',
                'op4' => 'Reader',
                'msg' => 'The role determines the level of general access of the user',
            ],
            'permission' => [
                'title' => 'Specific permission',
                'users' => [
                    'title' => 'Users',
                ],
                'floors' => [
                    'title' => 'Floors',
                ],
                'zones' => [
                    'title' => 'Zones',
                ],
                'bookshelves' => [
                    'title' => 'Bookshelves',
                ],
                'books' => [
                    'title' => 'Books',
                ],
                'loans' => [
                    'title' => 'Loans',
                ],
                'reservations' => [
                    'title' => 'Reservations',
                ],
                'statistics' => [
                    'title' => 'Statistics',
                ],
                'view' => [
                    'title' => 'User interface',
                ],
                'settings' => [
                    'title' => 'Settings',
                ],
            ],
        ],
    ],

    'editUser' => [
        'Header' => [
            'editUser' => 'Edit user',
            'h2' => 'Enter the information to edit a user in the system',
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
            'success' => 'User deleted successfully',
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

    'genres' => [
        'genre' => 'Genre'

    ],
    'floors' => [
        'title' => 'Floors',
        'title2' => 'Floor',
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
        'delete_dialog' => [
            'success' => 'Floor deleted successfully',
        ],
        'fields' => [
            'floorNumber' => 'Floor Number',
            'floorName' => 'Floor Name',
            'zonesCapacity' => 'Zones Capacity',
        ],
        'index' => [
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
            'avaibleZones' => 'Occupied / Zones Capacity',
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
            'subtitle' => 'Enter the information to create a new floor in the system',
            'placeholders' => [
                'floorNumber' => 'Enter a floor number',
                'floorName' => 'Enter a floor name',
                'zonesCapacity' => 'Enter the number of zones that fit on the floor',
            ],
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
        'delete_dialog' => [
            'success' => 'Zone deleted successfully',
        ],
        'buttons' => [
            'new' => 'New Zone',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
            'delete' => 'Delete',
            'edit' => 'Edit',

        ],
        'columns' => [
            'zoneName' => 'Zone Name',
            'floorNumber' => 'Floor',
            'genre' => 'Genre',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'occupiedBookshelves' => 'Occupied Bookshelves',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'avaibleBookshelves' => 'Occupied / Bookshelves Capacity',

        ],
        'fields' => [
            'zoneName' => 'Zone Name',
            'floorNumber' => 'Floor',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'genre' => 'Genre',
        ],
        'placeholders' => [
            'zoneName' => 'Name...',
            'floorNumber' => 'Number...',
            'genre' => 'select...',
            'bookshelvesCapacity' => 'Max bookshelves...',
            'createdAt' => 'Date...',

        ],
        'filters' => [
            'zoneName' => 'Zone',
            'floorNumber' => 'Floor',
            'genre' => 'Genre',
            'bookshelvesCapacity' => 'Bookshelves Capacity',
            'createdAt' => 'Created At',
        ],
        'createZone' => [
            'title' => 'Create Zone',
            'subtitle' => 'Enter the information to create a new zone in the system',
            'floor' => 'Floor',
            'floorName' => 'Name',
            'genre' => 'Genre',
            'placeholders' => [
                'selectFloor' => 'Select an existing floor number',
                'zoneName' => 'Enter a zone name',
                'selectGenre' => 'Select an existing genre',
                'searchGenre' => 'Search the genre of the zone',
                'bookshelvesCapacity' => 'Enter the number of bookshelves that fit on the zone'
            ],
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The zone will be permanently deleted from the system.',
        ],
        'editZone' => [
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
        'zone' => 'Zone',
        'genre' => 'Genre',
        'occupied' => 'Complete',
        'currentFloor' => 'Current floor',
        'currentZone' => 'Current zone',
        'delete_dialog' => [
            'success' => 'Bookshelf deleted successfully',
        ],
        'buttons' => [
            'new' => 'New Bookshelf',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
            'delete' => 'Delete',
            'edit' => 'Edit',
            'created_at' => 'Created at',
        ],
        'columns' => [
            'zoneName' => 'Zone',
            'floorNumber' => 'Floor',
            'bookshelfNumber' => 'Bookshelf Number',
            'booksCapacity' => 'Books Capacity',
            'occupiedBooks' => 'Occupied Books',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'avaibleBooks' => 'Occupied / Books Capacity',
        ],
        'placeholders' => [
            'bookshelfNumber' => 'Number...',
            'floorNumber' => 'Number...',
            'zoneName' => 'Name...',
            'booksCapacity' => 'Max books...',
            'createdAt' => 'Date...',

        ],
        'filters' => [
            'bookshelfNumber' => 'Bookshelf',
            'zoneName' => 'Zone',
            'floorNumber' => 'Floor',
            'booksCapacity' => 'Books Capacity',
            'createdAt' => 'Created at',

        ],
        'fields' => [
            'bookshelfNumber' => 'Bookshelf Number',
            'floor' => 'Floor',
            'zone' => 'Zone',
            'bookshelvesCapacity' => 'Books Capacity',
            'genre' => 'Genre',
        ],
        'createBookshelf' => [
            'title' => 'Create Bookshelf',
            'subtitle' => 'Enter the information to create a new bookshelf in the system',
            'floor' => 'Floor',
            'genre' => 'Genre',
            'placeholders' => [
                'selectFloor' => 'Select an existing floor',
                'zoneName' => 'Enter a zone name',
                'bookshelfNumber' => 'Enter a bookshelf number',
                'selectZone' => 'Select an existing zone',
                'bookshelvesCapacity' => 'Enter the number of books that fit on the bookshelf'
            ],
        ],
        'editBookshelf' => [
            'title' => 'Edit Bookshelf',
            'subtitle' => 'Enter the information to edit a bookshelf in the system',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The bookshelf will be permanently deleted from the system.',
        ],
        'no_results' => 'No results.',
    ],

    'books' => [
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'floor' => 'Floor',
        'defaultGenre' => 'Genre Zone',
        'available' => 'Available',
        'notAvailable' => ' Not Available',
        'occupied' => 'Complete',
        'currentFloor' => 'Current floor',
        'currentZone' => 'Current zone',
        'currentBookshelf' => 'Current Bookshelf',
        'changeImage' => 'Change Image',
        'selectImage' => 'Select Image',
        'delete_dialog' => [
            'success' => 'Book deleted successfully',
        ],
        'buttons' => [
            'new' => 'New  Book',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
            'delete' => 'Delete',
            'edit' => 'Edit',
            'noDelete' => 'Book currently loaned and cannot be deleted',
            'loan' => 'Loan Book',
            'reserve' => 'Reserve Book',
        ],
        'columns' => [
            'isbn' => 'ISBN',
            'title' => 'Title',
            'author' => 'Author',
            'editorial' => 'Editorial',
            'genres' => 'Genres',
            'pages' => 'Pages',
            'floorNumber' => 'Floor',
            'zoneName' => 'Zone',
            'available' => 'Availability',
            'bookshelfNumber' => 'Bookshelf',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'availableBookIsbn' => 'Available / Total',
        ],
        'placeholders' => [
            'isbn' => 'Book identifier...',
            'title' => 'title...',
            'author' => 'author...',
            'editorial' => 'text...',
            'pages' => 'number...',
            'available' => 'select availability...',
            'genres' => 'Genres...',
            'floors' => 'select floor...',
            'zones' => 'select zone...',
            'bookshelves' => 'select bookshelf...',
        ],
        'filters' => [
            'isbn' => 'ISBN',
            'title' => 'Title',
            'author' => 'Author',
            'editorial' => 'Editorial',
            'pages' => 'Pages',
            'genres' => 'Genres',
            'available' => 'Availability',
            'floors' => 'Floors',
            'zones' => 'Zones',
            'bookshelves' => 'Bookshelves',


        ],
        'fields' => [
            'isbn' => 'ISBN',
            'title' => 'Title',
            'pages' => 'Pages',
            'author' => 'Author',
            'editorial' => 'Editorial',
            'floor' => 'Fsloor',
            'zone' => 'Zone',
            'bookshelf' => 'Bookshelf',
            'genres' => 'Genres',
            'image' => 'Image',
        ],

        'createBook' => [
            'title' => 'Create Book',
            'subtitle' => 'Enter the information to create a new book in the system',
            'floor' => 'Floor',
            'genre' => 'Genre',
            'basicInformation' => 'Basic Information',
            'location' => 'Location',
            'placeholders' => [
                'isbn' => 'Enter a valid ISBN (10 or 13 digits)',
                'title' => 'Enter a book title',
                'pages' => 'Enter the number of pages in the book',
                'author' => 'Enter the author of the book ',
                'editorial' => 'Enter the book editorial',
                'selectFloor' => 'Select an existing floor',
                'selectZone' => 'Select an existing zone',
                'selectBookshelf' => 'Select an existing bookshelf',
            ],
        ],
        'editBook' => [
            'title' => 'Edit Book',
            'subtitle' => 'Enter the information to edit a book in the system',

        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The book will be permanently deleted from the system.',
        ],
        'no_results' => 'No results.',
    ],

    'searchBooks' => [
        'title' => 'Search Books',
    ],


    'loans' => [
        'title' => 'Loans',
        'create' => 'Create Loan',
        'edit' => 'Edit Loan',
        'active' => 'Active',
        'return' => 'Returned',
        'confirmReturn' => 'Are you sure to return the book?',
        'returnEarly' => 'No Delay',
        'delete_dialog' => [
            'success' => 'Loan deleted successfully',
        ],


        'buttons' => [
            'new' => 'New  Loan',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
            'delete' => 'Delete',
            'edit' => 'Edit',
            'return' => 'Return',
        ],
        'columns' => [
            'email' => 'Email',
            'isbn' => 'ISBN',
            'title' => 'Book Title',
            'actions' => 'Actions',
            'start_date' => 'Loan Start Date',
            'end_date' => 'Due Date',
            'loan_duration' => 'Loan Period',
            'status' => 'Status',
            'delayed_days' => 'Delay Days',
            'returned_at' => 'Returned At',
        ],
        'placeholders' => [
            'loan_duration' => 'Days...',
            'email' => 'mail@example.com',
            'isbn' => 'ISBN...',
            'start_date' => 'Date...',
            'end_date' => 'Date...',
            'title' => 'Book title...',
            'status' => 'Select status...'

        ],
        'filters' => [
            'loan_duration' => 'Loan Period',
            'email' => 'User Email',
            'isbn' => 'Book ISBN',
            'start_date' => 'Start Date',
            'end_date' => 'Due Date',
            'title' => 'Title',
            'status' => 'Status',
        ],
        'fields' => [
            'email' => 'Email',
            'isbn' => 'ISBN',
            'loanDuration' => 'Loan Duration',

        ],
        'createLoan' => [
            'title' => 'Create Loan',
            'subtitle' => 'Enter the information to create a new loan in the system',
            'placeholders' => [
                'email' => 'Enter an existing user email',
                'isbn' => 'Enter an existing isbn book',
                'loanDuration' => 'Enter the loan duration',
                'searchEmail' => 'Search the email of the user',
            ],
        ],
        'editLoan' => [
            'title' => 'Edit Loan',
            'subtitle' => 'Enter the information to edit a loan in the system',

        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
        ],
        'no_results' => 'No results.',
    ],

    'reservations' => [
        'title' => 'Reservations',
        'create' => 'Create Reservation',
        'delete_dialog' => [
            'success' => 'Reservation deleted successfully',
        ],

        'buttons' => [
            'new' => 'New  Reservation',
            'history' => 'Record',
            'cancel' => 'Cancel',
            'update' => 'Update',
            'save' => 'Save',
            'delete' => 'Delete',
            'edit' => 'Edit',
            'back' => 'Return to reservations'
        ],
        'columns' => [
            'email' => 'Email',
            'isbn' => 'ISBN',
            'title' => 'Book Title',
            'actions' => 'Delete',
            'created_at' => 'Reservation Date',
            'deleted_at' => 'Deleted at'
        ],
        'placeholders' => [
            'email' => 'mail@example.com',
            'isbn' => 'Book ISBN...',
            'title' => 'Book title...',
            'created_at' => 'date...',
        ],

        'filters' => [
            'loan_duration' => 'Loan Period',
            'email' => 'User Email',
            'isbn' => 'ISBN',
            'title' => 'Title',
            'created_at' => 'Reservation Date',


        ],
        'fields' => [
            'email' => 'Email',
            'isbn' => 'ISBN',
            'loanDuration' => 'Loan Duration',

        ],
        'createReservation' => [
            'title' => 'Create Reservation',
            'subtitle' => 'Enter the information to create a new reservation in the system',

            'placeholders' => [
                'email' => 'Enter an existing user email',
                'isbn' => 'Enter an existing isbn book',
                'loanDuration' => 'Enter the loan duration',
            ],
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The reservation will be permanently deleted from the system.',
        ],
        'no_results' => 'No results.',
    ],
    'history' => [
        'title' => 'Reservations record',
        'no_results' => 'No results.',
    ],

    'timeline' => [
        'author' => 'Author',
        'start_date' => 'Loan start',
        'end_date' => 'Loan end',
        'returned' => 'Returned on',
        'status' => 'Status',
        'returned2' => 'Returned',
        'ongoing' => 'Ongoing',
        'no_delay' => 'No Delay',
        'delay' => ' days late',
        'start_reservation' => 'Reserved on',
        'deleted' => 'Reservation removed',
        'deleted_at' => 'Reservation removed on',
        'filter' => [
            'all' => 'All',
            'reservation' => 'Reservations',
            'loans' => 'Loans',
        ],
    ],

    'charts' => [
        'title' => 'Live statistics',
        'description' => 'Discover the most outstanding statistics: favorite books, the most active users and the areas with the most movement at a glance.',
        'navigation' => [
            'books' => 'Books',
            'users' => 'Users',
            'zones' => 'Zones',
        ],
        'book' => [
            'title' => 'Favourites Books',
            'total' => 'Total',
            'loans' => 'Loans',
            'reservations' => 'Reservations',
            'isbn' => 'ISBN',
            'topLoans' => 'Top 8 books with the most loans',
            'topReservations' => 'Top 8 books with the most reservations',

        ],
        'user' => [
            'title' => 'Most active users',
            'loans' => 'Loans',
            'reservations' => 'Reservations',
            'total' => 'Total',
            'topLoans' => 'Top 8 users with the most loans',
            'topReservations' => 'Top 8 users with the most reservations'
        ],
        'zone' => [
            'title' => 'Zones with the most activity',
            'loans' => 'Loans',
            'reservations' => 'Reservations',
            'total' => 'Total',
            'topLoans' => 'Top 8 zones with the most loans',
            'topReservations' => 'Top 8 zones with the most reservations'
        ]


    ],
    'us' => [
        'timeline' => [
            'title' => 'Timeline',
            'user' => 'User',
        ]

    ],

    'genres' => [
        'Science Fiction' => 'Science Fiction',
        'Fantasy' => 'Fantasy',
        'Historical' => 'Historical',
        'Mystery' => 'Mystery',
        'Horror' => 'Horror',
        'Crime' => 'Crime',
        'Autobiography' => 'Autobiography',
        'Self-help' => 'Self-help',
        'Romance' => 'Romance',
        'Cooking' => 'Cooking',
        'Childrens literature' => 'Childrens literature',
        'Youth literature' => 'Youth literature',
    ],

    'roles' => [
        'Administrador' => 'Admin',
        'Editor' => 'Editor',
        'Reader' => 'Reader',
        'User' => 'User',
    ]






];
