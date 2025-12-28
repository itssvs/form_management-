import { useState, useEffect } from 'react';
import { getAllForms, deleteForm, updateForm } from '../services/adminFormServices.js';

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchAllForms();
  }, []);

  const fetchAllForms = async () => {
    setLoading(true);
    const result = await getAllForms();
    if (result.success) {
      setForms(result.forms);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const result = await deleteForm(id);
    if (result.success) {
      setSuccess('Form deleted successfully');
      setDeleteConfirm(null);
      fetchAllForms();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await updateForm(editFormData.id, editFormData);
    if (result.success) {
      setSuccess('Form updated successfully');
      setIsEditing(false);
      setSelectedForm(null);
      fetchAllForms();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const startEdit = (form) => {
    setEditFormData({ ...form });
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
    maxWidth: '900px',
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
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
          Admin Dashboard - All Forms
        </h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {forms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'white', borderRadius: '8px' }}>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>No forms available</p>
          </div>
        ) : (
          <div style={tableStyle}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Submitted By</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{form.id}</td>
                    <td style={{ padding: '12px' }}>{form.full_name}</td>
                    <td style={{ padding: '12px' }}>{form.email}</td>
                    <td style={{ padding: '12px' }}>{form.user_name}</td>
                    <td style={{ padding: '12px' }}>{formatDate(form.created_at)}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => setSelectedForm(form)}
                        style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px',
                          fontSize: '14px'
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => startEdit(form)}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px',
                          fontSize: '14px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(form)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Form Modal */}
        {selectedForm && !isEditing && (
          <div style={modalStyle} onClick={() => setSelectedForm(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Form Details</h2>
                <button
                  onClick={() => setSelectedForm(null)}
                  style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
                <p><strong>Submitted by:</strong> {selectedForm.user_name} ({selectedForm.user_email})</p>
                <p><strong>Submitted on:</strong> {formatDate(selectedForm.created_at)}</p>
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
                    <p style={{ fontWeight: '500' }}>{selectedForm.salary ? `$${selectedForm.salary}` : 'N/A'}</p>
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

        {/* Edit Form Modal */}
        {isEditing && editFormData && (
          <div style={modalStyle} onClick={() => setIsEditing(false)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Edit Form</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleEditSubmit}>
                {/* Personal Details */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
                    Personal Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <label className="label">Full Name</label>
                      <input
                        type="text"
                        value={editFormData.full_name || ''}
                        onChange={(e) => setEditFormData({...editFormData, full_name: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={editFormData.email || ''}
                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Phone</label>
                      <input
                        type="tel"
                        value={editFormData.phone || ''}
                        onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Date of Birth</label>
                      <input
                        type="date"
                        value={editFormData.date_of_birth ? editFormData.date_of_birth.split('T')[0] : ''}
                        onChange={(e) => setEditFormData({...editFormData, date_of_birth: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="label">Address</label>
                      <textarea
                        value={editFormData.address || ''}
                        onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                        className="input"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="label">City</label>
                      <input
                        type="text"
                        value={editFormData.city || ''}
                        onChange={(e) => setEditFormData({...editFormData, city: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">State</label>
                      <input
                        type="text"
                        value={editFormData.state || ''}
                        onChange={(e) => setEditFormData({...editFormData, state: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Zip Code</label>
                      <input
                        type="text"
                        value={editFormData.zip_code || ''}
                        onChange={(e) => setEditFormData({...editFormData, zip_code: e.target.value})}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Details */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
                    Education Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <label className="label">High School</label>
                      <input
                        type="text"
                        value={editFormData.high_school || ''}
                        onChange={(e) => setEditFormData({...editFormData, high_school: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Degree</label>
                      <input
                        type="text"
                        value={editFormData.degree || ''}
                        onChange={(e) => setEditFormData({...editFormData, degree: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">University</label>
                      <input
                        type="text"
                        value={editFormData.university || ''}
                        onChange={(e) => setEditFormData({...editFormData, university: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Graduation Year</label>
                      <input
                        type="number"
                        value={editFormData.graduation_year || ''}
                        onChange={(e) => setEditFormData({...editFormData, graduation_year: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editFormData.cgpa || ''}
                        onChange={(e) => setEditFormData({...editFormData, cgpa: e.target.value})}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Details */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>
                    Work Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <label className="label">Current Company</label>
                      <input
                        type="text"
                        value={editFormData.current_company || ''}
                        onChange={(e) => setEditFormData({...editFormData, current_company: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Position</label>
                      <input
                        type="text"
                        value={editFormData.position || ''}
                        onChange={(e) => setEditFormData({...editFormData, position: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Experience (Years)</label>
                      <input
                        type="number"
                        value={editFormData.experience_years || ''}
                        onChange={(e) => setEditFormData({...editFormData, experience_years: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Salary</label>
                      <input
                        type="number"
                        value={editFormData.salary || ''}
                        onChange={(e) => setEditFormData({...editFormData, salary: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="label">Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editFormData.skills) ? editFormData.skills.join(', ') : editFormData.skills || ''}
                        onChange={(e) => setEditFormData({
                          ...editFormData, 
                          skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                        })}
                        className="input"
                        placeholder="JavaScript, React, Node.js"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn"
                    style={{ backgroundColor: '#6b7280', color: 'white' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div style={modalStyle} onClick={() => setDeleteConfirm(null)}>
            <div 
              style={{ ...modalContentStyle, maxWidth: '400px' }} 
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Confirm Delete
              </h2>
              <p style={{ marginBottom: '24px', color: '#6b7280' }}>
                Are you sure you want to delete the form for <strong>{deleteConfirm.full_name}</strong>? 
                This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn"
                  style={{ backgroundColor: '#6b7280', color: 'white' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;