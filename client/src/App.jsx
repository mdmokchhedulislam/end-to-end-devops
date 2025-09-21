import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./Pages/HomePage"
import ShowBlogPage from "./Pages/ShowBlogPage"
import CreateBlogPage from "./Pages/CreateBlogPage"
 
const App = ()=>{
  return<>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/blog/:id" element={<ShowBlogPage/>} />
          <Route path="/create" element={<CreateBlogPage/>} />
        </Routes>
        </BrowserRouter>
  
  </>
}

export default App