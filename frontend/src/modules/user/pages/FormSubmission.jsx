import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../services/userFormServices.js';

const FormSubmission = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Personal Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Education Details
  const [highSchool, setHighSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [cgpa, setCgpa] = useState('');

  // Work Details
  const [currentCompany, setCurrentCompany] = useState('');
  const [position, setPosition] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = {
      full_name: fullName,
      email,
      phone,
      date_of_birth: dob,
      address,
      city,
      state,
      zip_code: zipCode,
      high_school: highSchool,
      degree,
      university,
      graduation_year: graduationYear ? parseInt(graduationYear) : null,
      cgpa: cgpa ? parseFloat(cgpa) : null,
      current_company: currentCompany,
      position,
      experience_years: experienceYears ? parseInt(experienceYears) : null,
      salary: salary ? parseFloat(salary) : null,
      skills: skills.split(',').map(s => s.trim()).filter(s => s)
    };

    const result = await createForm(formData);

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
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1f2937',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '8px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 16px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
          Submit Personal Details Form
        </h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Personal Details</h2>
            <div style={gridStyle}>
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label className="label">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input"
                rows="3"
              />
            </div>
            <div style={gridStyle}>
              <div>
                <label className="label">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Education Details Section */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Education Details</h2>
            <div style={gridStyle}>
              <div>
                <label className="label">High School</label>
                <input
                  type="text"
                  value={highSchool}
                  onChange={(e) => setHighSchool(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">University</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Graduation Year</label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="input"
                  min="1950"
                  max="2030"
                />
              </div>
              <div>
                <label className="label">CGPA</label>
                <input
                  type="number"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="input"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          {/* Work Details Section */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>Work Details</h2>
            <div style={gridStyle}>
              <div>
                <label className="label">Current Company</label>
                <input
                  type="text"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Position</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Experience (Years)</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="label">Salary</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="input"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="label">Skills (comma-separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
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
              {loading ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSubmission;