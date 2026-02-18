import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = storage.getWishlist();
        setWishlist(storedWishlist);
    }, []);

    useEffect(() => {
        storage.setWishlist(wishlist);
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (!prev.find(item => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
