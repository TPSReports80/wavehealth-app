# WaveHealth React App

A simple React-based user list application built with Vite, TailwindCSS, MUI, and React Router. The app displays a list of users in a responsive, modern UI using MUI's DataGrid

## 🚀 Features

- ⚛️ Built with React 19 and Vite for fast development and hot module replacement
- 🎨 Styled using TailwindCSS and MUI (Material UI)
- 📋 Display users in a feature-rich data grid using `@mui/x-data-grid`
- 🔄 Centralized state management with `UsersContext`
- 🔀 Routing support with `react-router-dom`
- 🧪 Unit testing with Jest and Testing Library
- 🧹 Linting via ESLint and React hooks plugin

## 📦 Tech Stack

- **Frontend:** React, React Router, React Hook Form
- **State Management:** React Context API
- **Styling:** TailwindCSS, Emotion, MUI
- **UI Components:** MUI DataGrid, Lucide Icons
- **Tooling:** Vite, ESLint, Jest, Babel, Testing Library

## 🧠 Users Context

User data is managed globally using the React Context API. The `UsersContext` handles:

- Fetching user data from [`jsonplaceholder.typicode.com`](https://jsonplaceholder.typicode.com/users)
- Managing loading and error states
- Adding new users with a simulated POST request

wavehealth-react-app/
├── public/
├── src/
│ ├── components/ # Reusable components
│ ├── context/ # UsersContext.js
│ ├── pages/ # App pages and views
│ ├── routes/ # Route definitions
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .eslintrc.cjs
├── tailwind.config.js
├── vite.config.js
└── package.json
