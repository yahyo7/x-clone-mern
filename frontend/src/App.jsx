import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

function App() {
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {/* Common components */}
        <Sidebar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
        <RightPanel/>
      </div>
    </>
  );
}

export default App;
