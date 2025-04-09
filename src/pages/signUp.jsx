import AuthForm from '../component/AuthForm.jsx';

export default function Signup() {
    const handleSignup = async ({ email, password }) => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Signup failed');
          }
      
          const data = await res.json();
          alert('Signup successful! Now you can log in.');
          window.location.href = '/login'; // Redirect to login page
        } catch (error) {
          console.error('Signup error:', error);
          alert(error.message);
        }
      };
      

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}
