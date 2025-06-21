import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Verify from './components/Verify'
import Loading from './components/Loading'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/login/verify" element={<Verify />}></Route>
                <Route path="/login/loading-page" element={<Loading />}></Route>
            </Routes>
        </>
    )
}
