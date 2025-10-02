import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nombre || !mensaje) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      const idToken = await currentUser.getIdToken();
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + idToken
        },
        body: JSON.stringify({ nombre, mensaje })
      });

      if (!res.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await res.json();
      setSuccess('¡Mensaje enviado exitosamente!');
      setNombre('');
      setMensaje('');
    } catch (err) {
      setError('Error al enviar mensaje: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Error al cerrar sesión: ' + err.message);
      setLoading(false);
    }
  }

  return (
    <div className="container dashboard-container">
      <div className="welcome-section">
        <h1>🎉 ¡Bienvenido!</h1>
        <p>Has accedido exitosamente a tu panel personalizado</p>
        <p><strong>Usuario:</strong> {currentUser?.email}</p>
      </div>

      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}

      <div className="form-section">
        <h2>📝 Enviar Mensaje</h2>
        <p>Completa el formulario para enviar tu mensaje</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="loading"></span> Enviando...
              </>
            ) : (
              '📤 Enviar Mensaje'
            )}
          </button>
        </form>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={handleLogout} className="btn btn-danger" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span> Cerrando sesión...
            </>
          ) : (
            '🚪 Cerrar Sesión'
          )}
        </button>
      </div>
    </div>
  );
}
