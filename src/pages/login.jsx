import AuthForm from '../component/AuthForm.jsx';

export default function Login() {
    const handleLogin = async ({ email, password }) => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
          }
      
          const data = await res.json();
          console.log('Login successful:', data);

          localStorage.setItem('token', data.token);

          alert('Login successful!');
          window.location.href = '/'; //  your main app page
        } catch (error) {
          console.error('Login error:', error);
          alert(error.message);
        }
      };
      

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
