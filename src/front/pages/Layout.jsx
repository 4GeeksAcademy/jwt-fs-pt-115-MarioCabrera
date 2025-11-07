import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { getPersonajes, getStyles } from "../services/services"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { useLocation } from "react-router-dom";
export const Layout = () => {
    const location = useLocation();

    const { store, dispatch } = useGlobalReducer()
    useEffect(() => {
        getPersonajes(dispatch)
        getStyles(dispatch)
    }, [])
    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}