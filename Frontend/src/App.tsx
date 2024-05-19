import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState<number>();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home userId={userId} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile userId={userId} />}></Route>
          <Route
            path="/login"
            element={<Login setUserId={setUserId} />}
          ></Route>
          <Route
            path="/register"
            element={<Registration setUserId={setUserId} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
