import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const VerificationPending = () => {
    const [status, setStatus] = useState('initial');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const { verifyEmail } = useAuth();

    const handleVerification = useCallback(async () => {
        if (!token) return;
        
        try {
            setStatus('pending');
            const result = await verifyEmail(token);
            
            if (result) {
                setStatus('success');
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 1500);
            }
        } catch (err) {
            console.error('Verification error:', err);
            setStatus('error');
            setError(err.message || 'Verification failed. Please try again.');
        }
    }, [token, verifyEmail, navigate]);

    useEffect(() => {
        if (token && status === 'initial') {
            handleVerification();
        }
    }, [status, handleVerification, token]);

    // Initial welcome screen when no token is provided
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 text-blue-500 mb-4">
                            <Mail className="h-12 w-12" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
                        <div className="mt-4 space-y-4">
                            <p className="text-gray-600">
                                We've sent you a verification link to your email address.
                                Please check your inbox and click the link to verify your account.
                            </p>
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <ArrowRight className="h-4 w-4" />
                                <span>Don't forget to check your spam folder</span>
                            </div>
                            <div className="pt-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Return to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
                        <p className="mt-4 text-gray-600">{error}</p>
                        <div className="mt-6 space-y-4">
                            <button
                                onClick={() => setStatus('initial')}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </button>
                            <div>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Return to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Verification in progress or success
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div className="text-center">
                    {status === 'pending' && (
                        <div className="flex flex-col items-center">
                            <Loader className="h-8 w-8 animate-spin text-blue-500" />
                            <p className="mt-4 text-gray-600">Verifying your email...</p>
                        </div>
                    )}
                    {status === 'success' && (
                        <div>
                            <h2 className="text-2xl font-bold text-green-600">Email Verified Successfully!</h2>
                            <p className="mt-4 text-gray-600">Redirecting to login page...</p>
                            <button
                                onClick={() => navigate('/login', { replace: true })}
                                className="mt-4 text-blue-600 hover:text-blue-800 underline"
                            >
                                Click here if not redirected automatically
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationPending;