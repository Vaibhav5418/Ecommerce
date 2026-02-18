import { ShoppingCart, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import WishlistButton from '../wishlist/WishlistButton';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPriceINR } from '../../utils/currency';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isInWishlist, removeFromWishlist } = useWishlist();
    const { id, title, price, image, category, rating } = product;

    const handleAddToCart = () => {
        addToCart(product);
        if (isInWishlist(id)) {
            removeFromWishlist(id);
            toast.success('Moved to cart from wishlist');
        } else {
            toast.success('Added to cart');
        }
    };

    return (
        <Card className="flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden p-0 relative">
            <div className="relative pt-[100%] bg-white dark:bg-gray-700 p-4 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10">
                    <WishlistButton product={product} />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm text-indigo-600 dark:text-indigo-400">
                    {formatPriceINR(price)}
                </div>
            </div>

            <div className="flex-1 p-5 flex flex-col">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">{category}</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center mb-4 text-sm text-yellow-500">
                    <Star size={16} fill="currentColor" stroke="none" className="mr-1" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{rating.rate}</span>
                    <span className="text-gray-400 dark:text-gray-500 ml-1">({rating.count})</span>
                </div>

                <div className="mt-auto">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full justify-center group-hover:bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 transition-all shadow-md hover:shadow-indigo-500/25"
                    >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export const ProductCardSkeleton = () => (
    <Card className="h-full p-0">
        <div className="pt-[100%] relative bg-gray-100 dark:bg-gray-700 animate-pulse">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600" />
        </div>
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-2/3 animate-pulse" />
            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full mt-4 animate-pulse" />
        </div>
    </Card>
);

export default ProductCard;
