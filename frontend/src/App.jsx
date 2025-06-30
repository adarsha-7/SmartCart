import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Verify from './components/Verify'
import Loading from './components/Loading'
import ProductDetail from './components/ProductDetail'

export default function App() {
    return (
        <>  
        
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/login/verify" element={<Verify />}></Route>
                <Route path="/login/loading-page" element={<Loading />}></Route>
                <Route path="/product/:id" element={<ProductDetail />}></Route>
            </Routes>

        </>
    )
}
