const safeParse = (key, fallback = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        localStorage.removeItem(key); // Clear bad data
        return fallback;
    }
};

export const storage = {
    getToken: () => safeParse('token'),
    setToken: (token) => localStorage.setItem('token', JSON.stringify(token)),
    clearToken: () => localStorage.removeItem('token'),

    getUser: () => safeParse('user'),
    setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
    clearUser: () => localStorage.removeItem('user'),

    getUsers: () => safeParse('users', []),
    setUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),

    getCart: () => safeParse('cart', []),
    setCart: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),

    getWishlist: () => safeParse('wishlist', []),
    setWishlist: (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist)),
};
