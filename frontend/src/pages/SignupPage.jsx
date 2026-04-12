import React, { useState } from 'react';
import { authService } from '../services/api';

const SignupPage = ({ onNavigate, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.signup({ name, email, password });
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cream">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 w-full max-w-md shadow-xl animate-fade-in-up">
        <div 
          className="font-serif text-xl font-black mb-1 flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className="text-gold">✦</span> ChefAI
        </div>
        <h2 className="font-serif text-3xl font-bold mt-6 mb-2">Create your account</h2>
        <p className="text-muted text-sm mb-8">Start generating recipes for free — no card needed</p>
        
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}

        <button className="w-full bg-white text-dark py-3 border-1.5 border-border rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:border-dark transition-colors cursor-pointer mb-6">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.8 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l6-6C34 7.1 29.3 5 24 5 13 5 4 14 4 25s9 20 20 20c10.5 0 19.3-7.6 20-18l-.4-7z"/><path fill="#FF3D00" d="M6.3 14.7l7 5.1C15 16.1 19.1 13 24 13c2.8 0 5.3 1 7.2 2.7l6-6C34 7.1 29.3 5 24 5c-7.6 0-14.2 4.1-17.7 9.7z"/><path fill="#4CAF50" d="M24 45c5.2 0 9.9-1.9 13.5-5L31 33.8C29.2 35 26.7 36 24 36c-5.2 0-9.7-3.6-11.2-8.5l-7 5.4C9.5 40.8 16.2 45 24 45z"/><path fill="#1565C0" d="M43.6 20H24v8h11.3c-.7 2-2 3.7-3.7 5l6.5 5.1C42.5 35 44 30.3 44 25c0-1.7-.2-3.4-.4-5z"/></svg>
          Sign up with Google
        </button>
        
        <div className="flex items-center gap-4 text-muted text-xs font-medium uppercase tracking-widest mb-6 before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">
          or
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Full name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gordon Ramsay" 
              className="w-full bg-cream border-1.5 border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full bg-cream border-1.5 border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password" 
              className="w-full bg-cream border-1.5 border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors" 
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-dark text-cream py-4 rounded-xl font-bold text-sm mt-8 hover:bg-olive transition-colors cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>
        
        <div className="text-center mt-6 text-sm text-muted">
          Already have an account? <span onClick={() => onNavigate('login')} className="text-dark font-bold underline cursor-pointer">Log in</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
