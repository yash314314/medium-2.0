
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin} from "./pages/Signin"
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { My } from './pages/My'
import Homepage from './pages/Homepage'
import Loginprompt from './components/loginprompt'
import TestParticles from './pages/B'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish"element={<Publish  />} />
          <Route path="/blog/my"element={<My/>} />
          <Route path='/' element = {<Homepage/>}></Route>
          <Route path='/prompt' element = {<Loginprompt/>}></Route>
          <Route path='/test' element = {<TestParticles/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
