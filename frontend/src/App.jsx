import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    )
}
