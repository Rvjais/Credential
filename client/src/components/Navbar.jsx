import React from 'react';
import { Shield, Plus } from 'lucide-react';

const Navbar = ({ onAddClick }) => {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex items-center space-x-2 md:space-x-3 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <Shield className="h-8 w-8 md:h-9 md:w-9 text-blue-400 relative" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">CredManager</span>
                    </div>
                    <div>
                        <button
                            onClick={onAddClick}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 font-medium text-sm md:text-base"
                        >
                            <Plus size={18} className="md:w-5 md:h-5" />
                            <span>Add<span className="hidden md:inline"> Credential</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
