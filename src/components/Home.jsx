import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container landing-container">
      <h1 className="hero-title">¡Bienvenido!</h1>
      <p className="hero-subtitle">
        Descubre una experiencia de usuario moderna y segura con autenticación Firebase. 
        Accede a tu panel personalizado y gestiona tu información de manera eficiente.
      </p>
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Autenticación Segura</h3>
          <p>Protegido con Firebase Authentication para máxima seguridad</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Panel Personalizado</h3>
          <p>Accede a tu dashboard personal con todas tus herramientas</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Rápido y Moderno</h3>
          <p>Interfaz moderna y responsiva para la mejor experiencia</p>
        </div>
      </div>
      
      <Link to="/login" className="btn btn-primary">
        Comenzar Ahora
      </Link>
    </div>
  );
}
