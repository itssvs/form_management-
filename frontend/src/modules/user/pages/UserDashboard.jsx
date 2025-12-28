import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'center'
  };

  const cards = [
    {
      title: 'Submit New Form',
      description: 'Fill out your personal details form',
      icon: '📝',
      action: () => navigate('/user/submit-form'),
      color: '#3b82f6'
    },
    {
      title: 'My Forms',
      description: 'View all your submitted forms',
      icon: '📋',
      action: () => navigate('/user/my-forms'),
      color: '#10b981'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 16px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Welcome, {user?.name}!
          </h1>
          <p style={{ color: '#6b7280' }}>Manage your personal details forms</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={cardStyle}
              onClick={card.action}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: card.color }}>
                {card.title}
              </h3>
              <p style={{ color: '#6b7280' }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;