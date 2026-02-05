import React, { useState } from 'react';
import { Eye, EyeOff, Edit2, Trash2, Copy, Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CredentialList = ({ credentials, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePassword = (id) => {
        setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    const filteredCredentials = credentials.filter(cred => {
        const matchesSearch = cred.platformName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cred.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = filterDept === 'All' || cred.department === filterDept;
        return matchesSearch && matchesDept;
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50">
                <div className="relative flex-1 w-full md:max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search platform or department..."
                        className="pl-10 block w-full rounded-lg bg-slate-800/50 border border-slate-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 p-3 md:p-2.5 text-base md:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full md:w-56 z-20">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between bg-slate-800/50 border border-slate-700 text-gray-200 p-3 md:p-2.5 rounded-lg hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 outline-none text-base md:text-sm font-medium"
                    >
                        <span className="truncate">{filterDept === 'All' ? 'All Departments' : filterDept}</span>
                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute top-full right-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-20"
                                >
                                    {['All', 'General', 'Graphics', 'AI', 'Sales', 'Web', 'Others'].map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => {
                                                setFilterDept(dept);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                                                ${filterDept === dept
                                                    ? 'bg-blue-600/10 text-blue-400 font-medium'
                                                    : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                                                }`}
                                        >
                                            <span>{dept === 'All' ? 'All Departments' : dept}</span>
                                            {filterDept === dept && (
                                                <motion.div layoutId="activeCheck">
                                                    <Check size={14} className="text-blue-400" />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredCredentials.map((cred) => (
                        <motion.div
                            key={cred._id}
                            variants={item}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-lg border border-slate-700/50 overflow-hidden hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-100 tracking-tight group-hover:text-blue-300 transition-colors">{cred.platformName}</h3>
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 shadow-sm
                                            ${cred.department === 'AI' ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50' :
                                                cred.department === 'Web' ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50' :
                                                    cred.department === 'Graphics' ? 'bg-pink-900/30 text-pink-300 border border-pink-700/50' :
                                                        cred.department === 'Sales' ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50' :
                                                            'bg-slate-700/50 text-slate-300 border border-slate-600/50'}`}>
                                            {cred.department}
                                        </span>
                                    </div>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button onClick={() => onEdit(cred)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => onDelete(cred._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="group/field p-2 rounded-lg hover:bg-slate-700/30 transition-colors -mx-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Username</span>
                                            <button onClick={() => copyToClipboard(cred.username)} className="text-slate-500 hover:text-blue-400 opacity-0 group-hover/field:opacity-100 transition-opacity">
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                        <div className="mt-1 font-mono text-slate-200 truncate">{cred.username}</div>
                                    </div>

                                    <div className="group/field p-2 rounded-lg hover:bg-slate-700/30 transition-colors -mx-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Password</span>
                                            <div className="flex space-x-2 opacity-0 group-hover/field:opacity-100 transition-opacity">
                                                <button onClick={() => togglePassword(cred._id)} className="text-slate-500 hover:text-blue-400">
                                                    {visiblePasswords[cred._id] ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                                <button onClick={() => copyToClipboard(cred.password)} className="text-slate-500 hover:text-blue-400">
                                                    <Copy size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-1 font-mono text-emerald-400 font-medium truncate">
                                            {visiblePasswords[cred._id] ? cred.password : '••••••••••••'}
                                        </div>
                                    </div>

                                    {cred.description && (
                                        <div className="pt-3 mt-3 border-t border-slate-700/50">
                                            <p className="text-sm text-slate-400 italic">"{cred.description}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredCredentials.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4 text-slate-600">
                        <Search size={32} />
                    </div>
                    <p className="text-slate-500 text-lg">No credentials found matching your criteria.</p>
                </motion.div>
            )}
        </div>
    );
};

export default CredentialList;
