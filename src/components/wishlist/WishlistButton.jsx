import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

const WishlistButton = ({ product, className = '' }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
            toast.success('Removed from wishlist');
        } else {
            addToWishlist(product);
            toast.success('Added to wishlist');
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleWishlist}
            className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow group/heart ${className}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart
                size={20}
                className={`transition-colors duration-300 ${isWishlisted
                    ? "fill-rose-500 text-rose-500"
                    : "text-gray-400 group-hover/heart:text-rose-500"
                    }`}
            />
        </motion.button>
    );
};

export default WishlistButton;
