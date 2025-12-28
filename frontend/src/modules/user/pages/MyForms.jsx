import { useState, useEffect } from 'react';
import { getMyForms } from '../services/userFormServices.js';

const MyForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    const result = await getMyForms();
    if (result.success) {
      setForms(result.forms);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px'
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '24px'
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 16px' }}>
        <div className="container">
          <p>Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 16px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
          My Forms
        </h1>

        {error && <div className="alert alert-error">{error}</div>}

        {forms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'white', borderRadius: '8px' }}>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>No forms submitted yet</p>
          </div>
        ) : (
          <div>
            {forms.map((form) => (
              <div
                key={form.id}
                style={cardStyle}
                onClick={() => setSelectedForm(form)}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                      {form.full_name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      Email: {form.email} | Phone: {form.phone || 'N/A'}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                      Submitted: {formatDate(form.created_at)}
                    </p>
                  </div>
                  <span style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {form.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Form Modal */}
        {selectedForm && (
          <div style={modalStyle} onClick={() => setSelectedForm(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Form Details</h2>
                <button
                  onClick={() => setSelectedForm(null)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '24px', 
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Personal Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6' }}>
                  Personal Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Full Name</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.full_name}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Email</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.email}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Phone</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Date of Birth</label>
                    <p style={{ fontWeight: '500' }}>{formatDate(selectedForm.date_of_birth)}</p>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Address</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.address || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>City</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.city || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>State</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.state || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6' }}>
                  Education Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>High School</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.high_school || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Degree</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.degree || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>University</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.university || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Graduation Year</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.graduation_year || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>CGPA</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.cgpa || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Work Details */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6' }}>
                  Work Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Current Company</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.current_company || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Position</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.position || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Experience (Years)</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.experience_years || 'N/A'}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Salary</label>
                    <p style={{ fontWeight: '500' }}>{selectedForm.salary ? `${selectedForm.salary}` : 'N/A'}</p>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', color: '#6b7280' }}>Skills</label>
                    <p style={{ fontWeight: '500' }}>
                      {selectedForm.skills && selectedForm.skills.length > 0 
                        ? selectedForm.skills.join(', ') 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyForms;