import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Crear Cuenta</h1>
      <p>Regístrate para acceder a tu panel personalizado</p>
      
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
            placeholder="Contraseña (mínimo 6 caracteres)"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span> Creando cuenta...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </form>
      
      <div className="nav">
        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
}
