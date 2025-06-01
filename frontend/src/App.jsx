import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import ProtectedRoute from "./route/ProtectedRoute";
import NavBar from "./components/NavBar";


function App() {


  return (
   <>
   <NavBar />
    <Routes>
      <Route path="/" element={<Login />} />
       <Route element={<ProtectedRoute />}>
        <Route path="/posts" element={<PostList />} />
        <Route path="/add" element={<PostForm />} />
       </Route>

    </Routes>
     <ToastContainer position="bottom-right" autoClose={3000} />
   </>
  );
}

export default App;
