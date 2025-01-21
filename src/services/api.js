// src/services/api.js

export const api = {

    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return fetch(`${import.meta.env.VITE_API_URL}/uploadImage`, {
            method: 'POST',
            body: formData
        }).then(res => res.json());
    },

    getEmailLayout: () => {
        return fetch(`${import.meta.env.VITE_API_URL}/getEmailLayout`)
            .then(res => res.json());
    },

    updateConfig: (data) => {
        return fetch(`${import.meta.env.VITE_API_URL}/updateConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    renderAndDownloadTemplate: (data) => {
        return fetch(`${import.meta.env.VITE_API_URL}/renderAndDownloadTemplate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = 'emailTemplate.html';

            document.body.appendChild(link);
            link.click()

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
    }


};