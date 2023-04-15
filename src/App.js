import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTags from "./components/ListTags";
import Bookmarks from "./pages/BookMarks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListTags />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
