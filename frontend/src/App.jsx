import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="!z-[99999]"
        toastClassName={() =>
          "relative flex bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-xl shadow-lg p-4 mb-3"
        }
        bodyClassName={() => "text-sm font-medium text-white"}
        progressClassName="!bg-emerald-400"
      />
    </BrowserRouter>
  );
}

export default App;
