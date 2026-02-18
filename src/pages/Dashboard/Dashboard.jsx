import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { productService } from '../../services/productService';
import { formatPriceINR } from '../../utils/currency';
import Card from '../../components/ui/Card';
import { Package, ShoppingCart, Clock, TrendingUp, Heart, Star, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <Card className="flex items-center p-6 transition-transform hover:-translate-y-1">
        <div className={`p-4 rounded-full ${color} bg-opacity-10 dark:bg-opacity-20 mr-4`}>
            <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            {trend && <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> {trend}</p>}
        </div>
    </Card>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { totalItems, totalPrice } = useCart();
    const { wishlistCount } = useWishlist();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const topProducts = products.slice(0, 4);
    const salesData = [
        { day: 'Mon', value: 45 },
        { day: 'Tue', value: 72 },
        { day: 'Wed', value: 38 },
        { day: 'Thu', value: 85 },
        { day: 'Fri', value: 54 },
        { day: 'Sat', value: 92 },
        { day: 'Sun', value: 64 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transform rotate-45"></div>
                <div className="relative z-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                    <p className="opacity-90 text-sm sm:text-base">Here's what's happening in your store today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Products"
                    value={loading ? "..." : products.length}
                    icon={Package}
                    color="bg-blue-500"
                    trend="+12% from last month"
                />
                <StatCard
                    title="Cart Items"
                    value={totalItems}
                    icon={ShoppingCart}
                    color="bg-purple-500"
                    trend={`${formatPriceINR(totalPrice)} value`}
                />
                <StatCard
                    title="Wishlist"
                    value={wishlistCount}
                    icon={Heart}
                    color="bg-rose-500"
                    trend="Saved items"
                />
                <StatCard
                    title="Active Session"
                    value="Online"
                    icon={Clock}
                    color="bg-green-500"
                    trend="Expires in 5m"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Overview Chart */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Overview</h3>
                            <p className="text-sm text-gray-500">Weekly performance</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                            +14.5% <ArrowUpRight size={12} className="ml-1" />
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-2 min-h-[200px] px-2">
                        {salesData.map((item) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:scale-105 cursor-pointer relative"
                                    style={{ height: `${item.value}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.value}%
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Popular Products */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Products</h3>
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">View All</button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="flex items-center gap-4 animate-pulse">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            topProducts.map((product) => (
                                <div key={product.id} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 dark:border-gray-700 p-1 flex-shrink-0">
                                        <img src={product.image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex items-center text-yellow-500">
                                                <Star size={10} fill="currentColor" />
                                                <span className="text-[10px] ml-0.5 font-bold">{product.rating.rate}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 italic">{product.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPriceINR(product.price)}</p>
                                        <p className="text-[10px] text-green-500 font-medium">In Stock</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
