import { useAuth, useUser } from '@clerk/react-router';
import { Link, NavLink } from 'react-router-dom';
import { Search, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { ThemeToggle } from '@/components/common';
import Logo from '@/assets/logo.png';
import LogoDark from '@/assets/logo-dark.png';
import { useTheme } from '@/contexts/theme';
import styles from './Header.module.css';

export function Header() {
  const { toggleSidebar, isSidebarOpen, closeSidebar } = useUIStore();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { theme } = useTheme();
  const isSignedIn = !!user;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeSidebar}>
          <img
            src={theme === 'dark' ? LogoDark : Logo}
            alt="The Library of Alexandria"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>The Library of Alexandria</span>
        </Link>

        <div className={styles.navActions}>
          <nav className={`${styles.nav} ${isSidebarOpen ? styles.navOpen : ''}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeSidebar}
            >
              <Search size={18} />
              <span>Catalog</span>
            </NavLink>
            {isSignedIn && (
              <>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </NavLink>
                <NavLink
                  to="/my-loans"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <User size={18} />
                  <span>My Loans</span>
                </NavLink>
              </>
            )}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            {isSignedIn ? (
              <div className={styles.userSection}>
                <span className={styles.userName}>
                  {user?.firstName || 'User'}
                </span>
                <button
                  className={styles.signOutButton}
                  onClick={() => signOut({ redirectUrl: '/' })}
                  aria-label="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <User size={18} />
                <span>Sign In</span>
              </NavLink>
            )}
          </div>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
