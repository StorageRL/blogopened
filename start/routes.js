'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', 'HomeController.index');
Route.on('/login').render('auth');
Route.post('/login', 'AuthController.auth');
Route.get('/logout', 'AuthController.logout');
Route.post('/register','RegisterController.register');
Route.on('/submit').render('submit').middleware(['auth_required']);
Route.post('/submit', 'PostSubmissionController.submit').middleware(['auth_required']);
Route.get('/post/:id', 'PostController.page').as('post');
Route.post('/create-comment', 'CommentController.create').middleware(['auth_required']);
Route.get('/get-comments', 'CommentController.get_comments');
Route.get('/admin/categories', 'CategoryController.manage').middleware(['auth_required','admin_only']);
Route.post('/add-category', 'CategoryController.add').middleware(['auth_required','admin_only']);
Route.post('/remove-category', 'CategoryController.remove').middleware(['auth_required','admin_only']);
Route.get( '/category/:id', 'CategoryController.page' ).as( 'category' );
Route.get('/edit-profile', 'ProfileController.edit_page').middleware(['auth_required']).as('edit_profile');
Route.post('edit-profile', 'ProfileController.update').middleware(['auth_required']);

Route.get('/author/:username', "ProfileController.profile").as('profile');
Route.get('/admin/settings', 'SettingController.page').middleware(['auth_required']).middleware(['admin_only']);
Route.post('/admin/settings', 'SettingController.update').middleware(['auth_required']).middleware(['admin_only']);
Route.get('/search', 'SearchController.search');