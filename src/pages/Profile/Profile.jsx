import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { User, Mail, Lock, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const result = updateUser(formData);
        if (result.success) {
            toast.success('Profile updated successfully!');
        } else {
            toast.error('Failed to update profile.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative group">
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white shadow-xl ring-4 ring-white dark:ring-gray-700">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors border-2 border-white dark:border-gray-700">
                        <Camera size={16} />
                    </button>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.email}</p>
                    <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-100 dark:border-indigo-800">Verified Customer</span>
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-100 dark:border-green-800">Active Session</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Account Details Form */}
                <Card className="lg:col-span-2 p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                            <User className="mr-2 text-indigo-500" size={20} />
                            Account Details
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <User className="absolute left-3 top-9 text-gray-400 w-5 h-5 pointer-events-none" />
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-9 text-gray-400 w-5 h-5 pointer-events-none" />
                                <Input
                                    label="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 h-11 rounded-xl"
                                    type="email"
                                    disabled
                                />
                            </div>

                            <div className="relative sm:col-span-2">
                                <Lock className="absolute left-3 top-9 text-gray-400 w-5 h-5 pointer-events-none" />
                                <Input
                                    label="Change Password"
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-10 h-11 rounded-xl"
                                    type="password"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Button type="submit" isLoading={loading} className="flex-1 sm:flex-none px-10 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                                <Save size={18} className="mr-2" />
                                Save Profile
                            </Button>
                            <Button type="button" variant="ghost" className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-700 h-11">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Account Settings / Meta */}
                <Card className="p-6 sm:p-8 h-fit">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6">Security Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="text-sm">
                                <p className="font-bold text-gray-900 dark:text-white">2FA</p>
                                <p className="text-xs text-gray-500">Not enabled</p>
                            </div>
                            <button className="text-indigo-600 text-xs font-bold hover:underline">Setup</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="text-sm">
                                <p className="font-bold text-gray-900 dark:text-white">Sessions</p>
                                <p className="text-xs text-gray-500">1 active device</p>
                            </div>
                            <button className="text-indigo-600 text-xs font-bold hover:underline">Manage</button>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mb-2">Danger Zone</p>
                        <button className="w-full py-3 text-red-500 dark:text-red-400 text-sm font-bold border-2 border-red-50 dark:border-red-900/20 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
