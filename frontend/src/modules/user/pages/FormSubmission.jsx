import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../services/userFormServices.js';

const FormSubmission = () => {
  const navigate = useNavigate();
  
  // Single useState for all form data
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Education Details
    highSchool: '',
    degree: '',
    university: '',
    graduationYear: '',
    cgpa: '',
    // Work Details
    currentCompany: '',
    position: '',
    experienceYears: '',
    salary: '',
    skills: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Generic handler for all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const submissionData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dob,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      high_school: formData.highSchool,
      degree: formData.degree,
      university: formData.university,
      graduation_year: formData.graduationYear ? parseInt(formData.graduationYear) : null,
      cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
      current_company: formData.currentCompany,
      position: formData.position,
      experience_years: formData.experienceYears ? parseInt(formData.experienceYears) : null,
      salary: formData.salary ? parseFloat(formData.salary) : null,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
    };

    const result = await createForm(submissionData);

    if (result.success) {
      setSuccess('Form submitted successfully!');
      setTimeout(() => {
        navigate('/user/my-forms');
      }, 1500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const sectionStyle = {
    background: 'linear-gradient(135deg, #fff 0%, #fce4ec 50%, #fff 100%)',
    padding: '32px',
    borderRadius: '20px',
    marginBottom: '28px',
    boxShadow: '0 10px 25px rgba(233, 30, 99, 0.15)',
    border: '2px solid #f8bbd0',
    transition: 'all 0.3s ease'
  };

  const headingStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#c2185b',
    borderBottom: '3px solid #e91e63',
    paddingBottom: '12px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 16px' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="gradient-text" style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          ✨ Submit Personal Details Form
        </h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div style={sectionStyle} className="form-section">
            <h2 style={headingStyle}>
              <span style={{ fontSize: '28px' }} className="animate-pulse">👤</span>
              Personal Details
            </h2>
            <div style={gridStyle}>
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label className="label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
                rows="3"
              />
            </div>
            <div style={gridStyle}>
              <div>
                <label className="label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Education Details Section */}
          <div style={sectionStyle} className="form-section">
            <h2 style={headingStyle}>
              <span style={{ fontSize: '28px' }} className="animate-pulse">🎓</span>
              Education Details
            </h2>
            <div style={gridStyle}>
              <div>
                <label className="label">High School</label>
                <input
                  type="text"
                  name="highSchool"
                  value={formData.highSchool}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">University</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="input"
                  min="1950"
                  max="2030"
                />
              </div>
              <div>
                <label className="label">CGPA</label>
                <input
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  className="input"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          {/* Work Details Section */}
          <div style={sectionStyle} className="form-section">
            <h2 style={headingStyle}>
              <span style={{ fontSize: '28px' }} className="animate-pulse">💼</span>
              Work Details
            </h2>
            <div style={gridStyle}>
              <div>
                <label className="label">Current Company</label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Experience (Years)</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="input"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="label">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="input"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/user/dashboard')}
              className="btn"
              style={{ backgroundColor: '#6b7280', color: 'white' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? '🔄 Submitting...' : '🚀 Submit Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSubmission;