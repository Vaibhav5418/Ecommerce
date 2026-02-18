import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/product/ProductCard';
import Button from '../../components/ui/Button';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="bg-rose-50 dark:bg-rose-900/30 p-6 rounded-full mb-6 relative">
                    <Heart size={48} className="text-rose-500" />
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-center">
                    Save items you love to your wishlist and revisit them anytime.
                </p>
                <Link to="/products">
                    <Button className="px-8 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                        Explore Products
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{wishlist.length} items saved for later</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
