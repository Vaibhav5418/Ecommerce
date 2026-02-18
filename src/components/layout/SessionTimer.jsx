import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../utils/storage';
import { Clock } from 'lucide-react';

const SessionTimer = () => {
    const { logout } = useAuth();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const checkTime = () => {
            const token = storage.getToken();
            if (!token || !token.expiry) return;

            const remaining = Math.max(0, token.expiry - new Date().getTime());
            setTimeLeft(remaining);

            if (remaining === 0) {
                logout();
            }
        };

        checkTime();
        const interval = setInterval(checkTime, 1000);

        return () => clearInterval(interval);
    }, [logout]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
        <div className="flex items-center space-x-1 sm:space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1.5 rounded-full transition-all">
            <Clock size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span className={`hidden sm:inline ${timeLeft < 60000 ? 'text-red-600 dark:text-red-400' : ''}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default SessionTimer;
