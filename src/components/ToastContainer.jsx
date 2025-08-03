import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastContainer() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#2b361c',
                    color: '#fefae3',
                    fontSize: '0.9rem',
                    borderRadius: '0.5rem',
                },
                iconTheme: {
                    primary: '#34d399',  // verde esmeralda
                    secondary: '#fefae3',
                },
            }}
        />
    );
}
