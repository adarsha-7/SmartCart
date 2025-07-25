import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import Verify from './components/Verify'
import Loading from './components/Loading'
import NewProductPage from './pages/NewProductPage'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import UserProfile from './pages/UserProfile'
import SearchResultPage from './pages/SearchResultPage'
import CheckoutPage from './components/CheckoutPage'

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
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/search" element={<SearchResultPage />}></Route>
                <Route path="/checkout" element={<CheckoutPage/>}></Route>
            </Routes>
        </>
    )
}
