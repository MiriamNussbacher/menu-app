# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Members Hierarchy Application

Thanks for reading my React assignment!

This application displays all members from the server. Once a specific member is selected, the full hierarchy is displayed up to the root member.

## Technologies

- **Vite**: The project was created using Vite, a  tool for modern web projects.
- **Material-UI**: Components are build and designed using Material-UI.
- **React Query**: Data fetching and caching are managed with React Query, which caches data for a configured amount of milliseconds.
- **Axios**: HTTP client for making requests to the members API.

## Features

- **Display Members**: Fetches and displays a list of all members from the server.
- **View Hierarchy**: Displays the full hierarchy of a selected member, up to the root member.
- **Caching**: Data is cached using React Query to minimize network requests.

## Components

### App Component
- **Description**: Manages the overall layout, fetches initial data, and maintains the selected member state.
- **Responsibilities**:
  - Fetches the initial list of parent members.
  - Manages the state of the selected member.
  - Renders the overall layout, including the AppBar and containers for the menu and hierarchy.
  - Passes relevant data and handlers to `MenuComponent` and `HierarchyComponent`.

### MenuComponent
- **Description**: Renders a list of parent menu items and highlights the selected item.
- **Responsibilities**:
  - Renders the list of parent menu items, according to the data recieved from app.
  - Highlights the selected menu item.
  - Calls the provided click handler when a menu item is clicked.

### HierarchyComponent
- **Description**: Fetches and renders the hierarchy of the selected member, displaying loading and error messages as needed.
- **Responsibilities**:
  - Fetches the hierarchy of the selected member.
  - Displays an error message if there is an issue fetching the data.
  - Renders the hierarchy as a list of menu items.

### Steps

1. **Clone the repository**:

  - git clone https://github.com/miriamnussbacher/menu-app.git
  - cd Menu-app
  - npm install
  - npm run dev

  - (add env file if needed and change settings)


  





