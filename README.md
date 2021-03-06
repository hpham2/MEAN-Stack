# HaiMeanStack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Do it for easy setup
1. Clone to your desktop
2. run "npm install"
3. run "npm install -g @angular/cli"
4. run "ng serve" for first terminal
5. run "npm run start:server" for second terminal
6. Open browser "localhost:4200" to see result

## Plan to do:
 1. Hash password.
 2. Set up token, with library JWT, after authentication.
 3. Allow create, edit, delete, only if the header contains validated token.
 4. Appropriate error handling.
 5. Adding guard for route, e.g. user cannot go to create post by entering URL, without authentication.
 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
