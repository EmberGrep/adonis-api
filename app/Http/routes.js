'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/api/users', 'UserController.store');

Route.resource('/api/users', 'UserController')
  .only(['index', 'show', 'update', 'destroy'])
  .middleware('auth');

Route.post('/api/token-auth', 'SessionController.store');
