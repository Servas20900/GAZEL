import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const order = (location.state as any)?.order;

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="success-container">
          <h2>No se encontró información de la orden</h2>
          <Link to="/" className="btn btn-primary">
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">¡Compra Exitosa!</h1>
        <p className="success-message">
          Tu pedido ha sido recibido y está siendo procesado.
        </p>

        <div className="order-details">
          <h2>Detalles del Pedido</h2>
          
          <div className="order-info">
            <div className="info-row">
              <span className="info-label">Número de Orden:</span>
              <span className="info-value">#{order.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Total:</span>
              <span className="info-value">{formatPrice(order.total)}</span>
            </div>
          </div>

          <h3>Información de Entrega</h3>
          <div className="shipping-info">
            <p><strong>Nombre:</strong> {order.shippingInfo.name}</p>
            <p><strong>Email:</strong> {order.shippingInfo.email}</p>
            <p><strong>Teléfono:</strong> {order.shippingInfo.phone}</p>
            <p><strong>Dirección:</strong> {order.shippingInfo.address}</p>
          </div>

          <div className="next-steps">
            <h3>¿Qué sigue?</h3>
            <ul>
              <li>Recibirás un email de confirmación a {order.shippingInfo.email}</li>
              <li>Te notificaremos cuando tu pedido sea enviado</li>
              <li>El tiempo estimado de entrega es de 3-5 días hábiles</li>
            </ul>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/" className="btn btn-primary">
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
