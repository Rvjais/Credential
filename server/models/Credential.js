const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
    platformName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: 'General'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Credential', CredentialSchema);
