import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/select-doctor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await login('test@example.com', 'password123');
      navigate('/select-doctor');
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center p-6">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <div className="flex justify-center mb-3">
            <Activity className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">POPDOC</h1>
          <p className="text-blue-100">Your Pop Culture Medical Companion</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
                  Password
                </label>
                {!isRegistering && (
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot Password?
                  </a>
                )}
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mb-4"
              disabled={isLoading}
            >
              {isLoading 
                ? (isRegistering ? 'Creating Account...' : 'Signing in...') 
                : (isRegistering ? 'Create Account' : 'Sign In')}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Try Demo Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            {isRegistering ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;