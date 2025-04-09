import { useState } from 'react';

export default function AuthForm({ type = 'login', onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = type === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-violet-100">
      <div className="w-full max-w-md bg-white/70 rounded-2xl shadow-xl backdrop-blur p-8">
        <h2 className="text-3xl font-bold text-violet-600 text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a
            href={isLogin ? '/signup' : '/login'}
            className="text-violet-600 hover:underline font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}
