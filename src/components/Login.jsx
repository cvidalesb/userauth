import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <p>Accede a tu cuenta para continuar</p>
      
      {error && <div className="message message-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span> Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>
      
      <div className="nav">
        <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}
