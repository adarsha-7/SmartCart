import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './components/Home'
import Login from './components/Login'
import Verify from './components/Verify'
import Loading from './components/Loading'
import NewProductPage from './components/NewProductPage'
import Cart from './components/Cart'
import ProductDetail from './components/ProductDetail'

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/login/verify" element={<Verify />}></Route>
                <Route path="/login/loading-page" element={<Loading />}></Route>
                <Route path="/new-product" element={<NewProductPage />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product/:id" element={<ProductDetail />}></Route>
            </Routes>
        </>
    )
}
