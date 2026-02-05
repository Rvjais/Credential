import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CredentialList from './components/CredentialList';
import Modal from './components/Modal';
import CredentialForm from './components/CredentialForm';
import api from './services/api';

function App() {
    const [credentials, setCredentials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCredential, setCurrentCredential] = useState(null); // For editing
    const [loading, setLoading] = useState(true);

    const fetchCredentials = async () => {
        try {
            const response = await api.get('/');
            setCredentials(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching credentials:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCredentials();
    }, []);

    const handleAddClick = () => {
        setCurrentCredential(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (cred) => {
        setCurrentCredential(cred);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this credential?')) {
            try {
                await api.delete(`/${id}`);
                setCredentials(credentials.filter(c => c._id !== id));
            } catch (error) {
                console.error('Error deleting credential:', error);
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (currentCredential) {
                // Edit mode
                const response = await api.put(`/${currentCredential._id}`, formData);
                setCredentials(credentials.map(c => c._id === currentCredential._id ? response.data : c));
            } else {
                // Add mode
                const response = await api.post('/', formData);
                setCredentials([response.data, ...credentials]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving credential:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-gray-100 selection:bg-blue-500 selection:text-white">
            <Navbar onAddClick={handleAddClick} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-12">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-3 md:mb-4 tracking-tight">
                        Company Credentials
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Securely manage and share access credentials across your organization with ease and confidence.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 shadow-lg shadow-blue-500/20"></div>
                    </div>
                ) : (
                    <CredentialList
                        credentials={credentials}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                )}
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentCredential ? 'Edit Credential' : 'Add New Credential'}
            >
                <CredentialForm
                    onSubmit={handleFormSubmit}
                    initialData={currentCredential}
                    isEdit={!!currentCredential}
                />
            </Modal>
        </div>
    );
}

export default App;
