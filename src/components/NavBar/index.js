import { Link } from 'react-router-dom';

import styles from 'components/NavBar/index.module.scss';
import { Logo } from 'ui/svg/logo';
import { Home, User, Wallet, Settings } from 'ui/svg/icon/'

const NavBar = ({ tab }) => {

    return (
        <div className={styles.sideNavWrapper}>
            <div className={styles.logo}>
                <Link to='/'>
                    <Logo width={32} height={32}/>
                </Link>
            </div>
            <div className={styles.sideNav}>
                <Link to='/'>
                    <div className={`nav-btn ${tab =='home' ? `active`:``}`}>
                        <Home width={24} height={24} />
                    </div>
                </Link>
                <Link to='/subscription'>
                    <div className={`nav-btn ${tab =='subscription' ? `active`:``}`}>
                        <User width={24} height={24} />
                    </div>
                </Link>
                <Link to='/income'>
                    <div className={`nav-btn ${tab =='income' ? `active`:``}`}>
                        <Wallet width={24} height={24} />
                    </div>
                </Link>
                <Link to='/setting/profile'>
                    <div className={`nav-btn ${tab =='settings' ? `active`:``}`}>
                        <Settings width={24} height={24} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;