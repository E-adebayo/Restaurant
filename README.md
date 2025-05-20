# RecommandResto

A restaurant recommendation application built with Angular, allowing users to discover, rate, and add restaurants.

## Project Overview

RecommandResto is a web application that helps users find and recommend restaurants. Key features include:

- Browse and search for restaurants
- View detailed restaurant information
- Like/recommend restaurants
- Add new restaurants to the platform
- User authentication (login/signup)
- Restaurant categorization

## Technology Stack

- Frontend: Angular 13.3.3
- Backend: JSON Server (fake REST API)
- Database: mydb.json
- Additional libraries: RxJS, Angular Forms, HttpClient

## Development server

Run `npm start` to start the Angular development server. Navigate to `http://localhost:4200/` to view the application.

To start the JSON server backend, run `npm run json-db` which will serve the REST API on `http://localhost:3000/`.

## Project Structure

- `src/app/admin/` - Contains all main components for the application
- `src/app/class/` - Contains data models (Restaurant, Categorie, Menu, etc.)
- `src/app/services/` - API services for data fetching and manipulation
- `src/assets/` - Images and other static assets

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run json-db` to start the backend server
4. Run `npm start` to start the Angular development server
5. Open your browser and navigate to `http://localhost:4200/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
