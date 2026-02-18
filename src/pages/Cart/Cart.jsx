import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { formatPriceINR } from '../../utils/currency';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const [isCheckedOut, setIsCheckedOut] = useState(false);

    const handleCheckout = () => {
        setIsCheckedOut(true);
        clearCart();
        toast.success('Order placed successfully!');
    };

    if (isCheckedOut) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-full mb-6 relative">
                    <CheckCircle size={64} className="text-green-500" />
                    <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Thank you for shopping!</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-center">
                    Your order has been placed successfully. We'll notify you once your package is on its way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products">
                        <Button className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
                            Continue Shopping
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="ghost" className="px-8 border border-gray-200 dark:border-gray-600">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-full mb-6 relative">
                    <ShoppingBag size={48} className="text-indigo-600 dark:text-indigo-400" />
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-center">
                    Looks like you haven't added anything to your cart yet. Browse our products to find something you love.
                </p>
                <Link to="/products">
                    <Button variant="primary" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Start Shopping
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                    <button
                        onClick={() => { clearCart(); toast.success('Cart cleared'); }}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 font-medium hover:underline"
                    >
                        Clear Cart
                    </button>
                </div>

                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <Card className="sticky top-24 lg:ml-4 shadow-lg border-indigo-100 dark:border-indigo-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        Order Summary
                        <span className="ml-auto text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{cart.length} items</span>
                    </h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                            <span>Subtotal</span>
                            <span className="font-medium">{formatPriceINR(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                            <span>Tax (5%)</span>
                            <span className="font-medium">{formatPriceINR(totalPrice * 0.05)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                            <span>Shipping</span>
                            <span className="text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 rounded">Free</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent my-4" />
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {formatPriceINR(totalPrice * 1.05)}
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={handleCheckout}
                        className="w-full py-3 mb-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                    >
                        Checkout Now
                        <CreditCard size={18} className="ml-2" />
                    </Button>

                    <Link to="/products">
                        <Button variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Continue Shopping
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Cart;
