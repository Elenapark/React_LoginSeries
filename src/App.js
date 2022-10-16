import Login from "./components/Login";
import Register from "./components/Register";
import LinkPage from "./components/LinkPage";
import Unathorized from "./components/Unathorized";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 퍼블릭 */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unathorized />} />

        {/* 프라이빗 */}
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor />} />
        <Route path="admin" element={<Admin />} />
        <Route path="lounge" element={<Lounge />} />

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
