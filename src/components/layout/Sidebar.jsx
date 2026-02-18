import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, User, LogOut, Package, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { clsx } from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();

    const links = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Products', path: '/products', icon: Package },
        { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
        { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: totalItems },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:transform-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
                        <ShoppingBag className="w-8 h-8 text-indigo-600 mr-2" />
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            E-Commerce
                        </span>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={clsx(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                                    isActive(link.path)
                                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-800"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <link.icon className={clsx("w-5 h-5 mr-3 transition-colors", isActive(link.path) ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500 group-hover:text-indigo-500")} />
                                {link.name}
                                {link.badge > 0 && (
                                    <span className={clsx(
                                        "ml-auto text-xs font-bold px-2 py-0.5 rounded-full",
                                        isActive(link.path) ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                                    )}>
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
