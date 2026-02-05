import React, { useState, useEffect } from 'react';

const CredentialForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    const [formData, setFormData] = useState({
        platformName: '',
        username: '',
        password: '',
        department: 'General',
        description: ''
    });

    useEffect(() => {
        if (initialData && isEdit) {
            setFormData({
                platformName: initialData.platformName || '',
                username: initialData.username || '',
                password: initialData.password || '',
                department: initialData.department || 'General',
                description: initialData.description || ''
            });
        }
    }, [initialData, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Platform Name</label>
                <input
                    type="text"
                    name="platformName"
                    value={formData.platformName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-slate-900/50 border border-slate-600 text-gray-100 p-3 text-base md:text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500"
                    placeholder="e.g. AWS Console"
                />
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-slate-900/50 border border-slate-600 text-gray-100 p-3 text-base md:text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-slate-900/50 border border-slate-600 text-gray-100 p-3 text-base md:text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-900/50 border border-slate-600 text-gray-100 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                >
                    <option value="General" className="bg-slate-800 text-gray-200">General</option>
                    <option value="Graphics" className="bg-slate-800 text-gray-200">Graphics</option>
                    <option value="AI" className="bg-slate-800 text-gray-200">AI</option>
                    <option value="Sales" className="bg-slate-800 text-gray-200">Sales</option>
                    <option value="Web" className="bg-slate-800 text-gray-200">Web</option>
                    <option value="Others" className="bg-slate-800 text-gray-200">Others</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-xl bg-slate-900/50 border border-slate-600 text-gray-100 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-500 resize-none"
                    placeholder="Optional details..."
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-200"
            >
                {isEdit ? 'Update Credential' : 'Add Credential'}
            </button>
        </form>
    );
};

export default CredentialForm;
