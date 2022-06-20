# Shopping List

Frontend app for creating and saving shopping lists created with Angular version 12.1.4.

## General Info

This app is part of my fullstack project for Web Developer Study Module at JAMK University of Applied Sciences. The backend app can be found in
this repository: https://github.com/mariberg/shopping-list-backend.git.

The idea of the app is that a registered user is able to create two separate shopping lists - one for his main supermarket and the other for other shops. The list for main supermarket can be organized in the order that the user usually does their shopping. That means each product has a product group linked to it (for example dairy, fruit and veg etc.) The user is able to choose the order for their product groups and the items
on the shopping list will be displayed according to this order.

## Tutorials and libraries

- Tour of Heroes Angular Tutorial (https://angular.io/tutorial) was used in Main Supermarket component for the reactive search and search results shown in Item Details component.
- Bootstrap template https://startbootstrap.com/template/full-width-pics used in frontpage component.
- Material Design Sidenav component used in navigation component.
- Material Design Expansion Panel used in Main Supermarket and Other Shops commponents.
- Material Design Card used in Main Supermarket, Other Shops and Settings components.
- Material Design Grid List used in Main Supermarket and Other Shops components.
- Angular Material Drag & Drop Sorting used in Settings component.
- @auth0/angular-jwt in Auth Service.

## Next steps

User experience could be improved in several parts of the project and those are marked with 'TO DO' comments in the code.

This sort of application would be most suitable for mobile use and a PWA could be created from this project.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
