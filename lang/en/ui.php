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
            'books' => 'Books',
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
                'string' => 'The :attribute field must be at least :min characters',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters',
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
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
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
    ],
    'zones' => [
        'title' => 'Zones',
        'create' => 'Create Zone',
        'buttons' => [
            'new' => 'New Zone',
        ],
    ],
    'bookshelves' => [
        'title' => 'Bookshelf',
        'create' => 'Create Bookshelf',
        'buttons' => [
            'new' => 'New Bookshelf',
        ],
    ],
    'books' => [
        'title' => 'Book',
        'create' => 'Create Book',
        'buttons' => [
            'new' => 'New Book',
        ],
    ],
    



];
