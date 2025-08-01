import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UsersProvider } from "./context/UsersContext";
import Navigation from "./components/Navigation";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <UsersProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/add" element={<AddUser />} />
          </Routes>
        </div>
      </Router>
    </UsersProvider>
  );
}

export default App;
