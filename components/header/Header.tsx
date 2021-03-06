import Link from 'next/link'
import {useRouter} from "next/router";
import {animate, motion, useMotionValue, useViewportScroll} from "framer-motion";
import React from "react";
import {NormalTitle} from "./NormalTitle";
import {TopTitle} from "./TopTitle";
import styles from "../../styles/common/Header.module.scss";

const Header: React.FC = ({children}) => {

    const headerY = useMotionValue(0)

    const handleScroll = (y: number) => {
        const v = scrollY.getVelocity()
        const shouldShowHeader = v < -1000 || y < 500;
        const shouldHideHeader = !shouldShowHeader && v > 1000;

        if (shouldShowHeader) {
            animate(headerY, 0, {duration: 0.05, ease: 'linear'})
        } else if (shouldHideHeader) {
            animate(headerY, -100, {duration: 0.1, ease: 'linear'})
        }
    }

    const router = useRouter();

    const {scrollY} = useViewportScroll()
    scrollY.onChange(handleScroll)

    return (
        <motion.header
            id={styles.header}
            style={{y: headerY}}
        >
            <div id={styles.inside}>
                {router.pathname == '/' ? <TopTitle />  : <NormalTitle />}
                <nav id={styles.navigation}>
                    <ul>
                        {['home', 'works', 'blog'].map(e => (
                            <li key={e}>
                                <Link href={e == 'home' ? '/' : '/' + e}>
                                    <a className="headerButton">{e}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {children}
            </div>
        </motion.header>
    );
}

export default Header;