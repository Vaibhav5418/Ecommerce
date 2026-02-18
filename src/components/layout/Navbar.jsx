import { Menu, Heart, ShoppingCart, Sun, Moon, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SessionTimer from './SessionTimer';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onMenuClick }) => {
    const { user } = useAuth();
    const { wishlistCount } = useWishlist();
    const { totalItems } = useCart();
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 px-2 sm:px-6 lg:px-8 flex items-center justify-between lg:justify-end">
            <div className="flex items-center flex-shrink-0 lg:hidden">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2 md:mr-4"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center">
                    <ShoppingBag className="w-8 h-8 text-indigo-600 sm:mr-2" />
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                        E-Commerce
                    </span>
                </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="flex items-center pr-1 sm:pr-4 space-x-1 border-r border-gray-200 dark:border-gray-700">
                    <Link
                        to="/wishlist"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative transition-colors group"
                        title="Wishlist"
                    >
                        <Heart className="w-5 h-5 group-hover:text-rose-500 transition-colors" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        to="/cart"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative transition-colors group"
                        title="Cart"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:text-indigo-600 transition-colors" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
                <SessionTimer />
                <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200 dark:border-gray-700 min-w-0">
                    <div className="text-right hidden sm:block min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[120px]">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{user?.email}</p>
                    </div>
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
