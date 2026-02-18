import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPriceINR } from '../../utils/currency';
import Card from '../ui/Card';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { id, title, price, image, category, quantity } = item;

    const isWishlisted = isInWishlist(id);

    const handleMoveToWishlist = () => {
        addToWishlist(item);
        removeFromCart(id);
        toast.success('Moved to wishlist');
    };

    const handleRemove = () => {
        removeFromCart(id);
        toast.success('Removed from cart');
    };

    return (
        <Card className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 bg-white dark:bg-gray-700 p-2 rounded-xl border border-gray-100 dark:border-gray-600 group-hover:border-indigo-100 dark:group-hover:border-indigo-800 transition-colors">
                <img src={image} alt={title} className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">{category}</p>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatPriceINR(price)}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                        onClick={() => updateQuantity(id, -1)}
                        disabled={quantity <= 1}
                        className="p-2 sm:p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-30 transition-all shadow-sm"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="px-4 font-bold text-gray-900 dark:text-white">{quantity}</span>
                    <button
                        onClick={() => updateQuantity(id, 1)}
                        className="p-2 sm:p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all shadow-sm"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                    <button
                        onClick={handleMoveToWishlist}
                        className={`flex-1 sm:flex-initial p-2.5 rounded-xl transition-all ${isWishlisted
                            ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 shadow-sm"
                            : "text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-500"
                            }`}
                    >
                        <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                    </button>

                    <button
                        onClick={handleRemove}
                        className="flex-1 sm:flex-initial p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default CartItem;
