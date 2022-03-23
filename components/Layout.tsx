import React, {useEffect, useState} from "react";

import Header from './header/Header'
import Footer from "./Footer";
import Navigation, {NAVIGATION_LINKS} from "./Navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

import {motion} from "framer-motion";

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

type Props = {
    style?: any;
}

const Layout: React.FunctionComponent<Props> = ({
    children, style
}) => {

    const router = useRouter();

    const storePathValues = () => {
        const storage = globalThis?.sessionStorage;
        if (!storage) return;
        const prevPath = storage.getItem("currentPath");
        const curPath = globalThis.location.pathname;

        storage.setItem('prevPath', prevPath ? prevPath : '');
        storage.setItem('currentPath', curPath);
    }
    useEffect(() => storePathValues, [router.asPath]);

    let motionDirection = 0;
    if (typeof window !== 'undefined') {
        const item = globalThis?.sessionStorage?.getItem('prevPath');

        if(item) {
            const getPageIndexOnNavbar = (url: string) => {
                const subPagePath = url.split('/').slice(0, 2).join('/')
                return NAVIGATION_LINKS.findIndex((value => (value.link === subPagePath)))
            }
            const prevIndex = getPageIndexOnNavbar(item)
            const curIndex  = getPageIndexOnNavbar(router.pathname)

            // Determine moving direction
            if(prevIndex !== -1 && curIndex !== -1 && prevIndex !== curIndex) {
                motionDirection = prevIndex - curIndex < 0 ? -1 : 1;
            }
        }
    }

    const isMobile = (typeof window !== 'undefined') && window.innerWidth < 800;

    const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

    return (
        <>
            <div id={'inner-body'}>
                <Header isOpened={isMobileMenuOpened} setHamburgerState={setMobileMenuOpened}/>
                <Navigation isOpened={isMobileMenuOpened} setHamburgerState={setMobileMenuOpened}/>
                <main>
                    <div id="main_wrapper" style={style}>
                        {children}
                    </div>
                </main>
                <div id="page_top" onClick={backToTop}>
                    <span id={'back-to-top-icon'}>
                        <FontAwesomeIcon icon={faAngleDoubleUp} />
                    </span>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default Layout;