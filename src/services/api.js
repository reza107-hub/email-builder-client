// src/services/api.js

export const api = {

    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return fetch(`${import.meta.env.VITE_API_URL}/upload-image`, {
            method: 'POST',
            body: formData
        }).then(res => res.json());
    },


};