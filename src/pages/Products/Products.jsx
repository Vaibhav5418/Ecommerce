import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import ProductCard, { ProductCardSkeleton } from '../../components/product/ProductCard';
import { Search, Filter, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';

const ITEMS_PER_PAGE = 8;

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters from URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');

    // Infinite scroll
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
    const [loadingMore, setLoadingMore] = useState(false);
    const observerRef = useRef(null);
    const sentinelRef = useRef(null);
    const isLoadingRef = useRef(false);

    // Mobile filter drawer
    const [showFilters, setShowFilters] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 300);

    // Fetch products once
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [products, cats] = await Promise.all([
                    productService.getAllProducts(),
                    productService.getCategories()
                ]);
                setAllProducts(products);
                setCategories(['all', ...cats]);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Sync filters to URL
    useEffect(() => {
        const params = {};
        if (debouncedSearch) params.q = debouncedSearch;
        if (category !== 'all') params.category = category;
        setSearchParams(params, { replace: true });
    }, [debouncedSearch, category, setSearchParams]);

    // Reset display count when filters change
    useEffect(() => {
        setDisplayCount(ITEMS_PER_PAGE);
    }, [debouncedSearch, category]);

    // Memoized filtered results
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [allProducts, debouncedSearch, category]);

    const visibleProducts = filteredProducts.slice(0, displayCount);
    const hasMore = displayCount < filteredProducts.length;

    // Intersection Observer for infinite scroll
    const loadMore = useCallback(() => {
        if (isLoadingRef.current || !hasMore) return;
        isLoadingRef.current = true;
        setLoadingMore(true);

        // Simulate loading delay for UX
        setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
            setLoadingMore(false);
            isLoadingRef.current = false;
        }, 500);
    }, [hasMore, filteredProducts.length]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { rootMargin: '200px' }
        );

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [hasMore, loadMore]);

    const resetFilters = () => {
        setSearchTerm('');
        setCategory('all');
    };

    const FilterPanel = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="relative">
                    <Filter className="absolute left-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
                    <select
                        className="pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl w-full appearance-none bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer shadow-sm"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setShowFilters(false);
                        }}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {(searchTerm || category !== 'all') && (
                <Button variant="ghost" onClick={resetFilters} className="w-full text-sm border-dashed border-gray-200 dark:border-gray-700">
                    <RotateCcw size={14} className="mr-2" />
                    Reset All Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header, Search & Filter Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex-shrink-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl w-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {/* Filter Toggle (Mobile/Tablet) */}
                    <button
                        onClick={() => setShowFilters(true)}
                        className="flex md:hidden items-center justify-center p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative transition-colors shadow-sm"
                    >
                        <SlidersHorizontal size={20} />
                        {category !== 'all' && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-600 border-2 border-white dark:border-gray-800 rounded-full" />
                        )}
                    </button>

                    {/* Category Dropdown (Desktop only) */}
                    <div className="hidden md:block relative">
                        <Filter className="absolute left-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
                        <select
                            className="pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl w-48 appearance-none bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer shadow-sm text-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {showFilters && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm md:hidden" onClick={() => setShowFilters(false)} />
                    <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-white dark:bg-gray-800 z-[60] md:hidden shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
                            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>
                        <FilterPanel />
                    </div>
                </>
            )}

            {/* Product Grid - Responsive Grid Columns */}
            <div className="flex-1">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : visibleProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {visibleProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Loading more skeletons */}
                        {loadingMore && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
                                {[...Array(4)].map((_, i) => (
                                    <ProductCardSkeleton key={`loading-${i}`} />
                                ))}
                            </div>
                        )}

                        {/* Sentinel for Intersection Observer */}
                        {hasMore && <div ref={sentinelRef} className="h-20 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        </div>}

                        {!hasMore && filteredProducts.length > ITEMS_PER_PAGE && (
                            <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-12 py-6 border-t border-gray-100 dark:border-gray-800">
                                You've reached the end — {filteredProducts.length} products loaded
                            </p>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
