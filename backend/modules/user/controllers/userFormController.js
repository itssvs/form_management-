const db = require('../../../config/db');

// Create new form (User only)
exports.createForm = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated user
    const {
      // Personal Details
      full_name, email, phone, date_of_birth, address, city, state, zip_code,
      // Education Details
      high_school, degree, university, graduation_year, cgpa,
      // Work Details
      current_company, position, experience_years, salary, skills
    } = req.body;

    // Validation
    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Full name and email are required'
      });
    }

    // Convert skills array to JSON string if it's an array
    const skillsStr = Array.isArray(skills) ? JSON.stringify(skills) : skills;

    const [result] = await db.query(
      `INSERT INTO forms (
        user_id, full_name, email, phone, date_of_birth, address, city, state, zip_code,
        high_school, degree, university, graduation_year, cgpa,
        current_company, position, experience_years, salary, skills, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, full_name, email, phone, date_of_birth, address, city, state, zip_code,
        high_school, degree, university, graduation_year, cgpa,
        current_company, position, experience_years, salary, skillsStr, 'submitted'
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      formId: result.insertId
    });
  } catch (error) {
    console.error('Create form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form'
    });
  }
};

// Get user's own forms
exports.getMyForms = async (req, res) => {
  try {
    const userId = req.user.id;

    const [forms] = await db.query(
      'SELECT * FROM forms WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Parse skills JSON for each form
    const formsWithParsedSkills = forms.map(form => ({
      ...form,
      skills: form.skills ? JSON.parse(form.skills) : []
    }));

    res.json({
      success: true,
      forms: formsWithParsedSkills
    });
  } catch (error) {
    console.error('Get my forms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forms'
    });
  }
};

// Get single form (user's own only)
exports.getFormById = async (req, res) => {
  try {
    const userId = req.user.id;
    const formId = req.params.id;

    const [forms] = await db.query(
      'SELECT * FROM forms WHERE id = ? AND user_id = ?',
      [formId, userId]
    );

    if (forms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    const form = forms[0];
    form.skills = form.skills ? JSON.parse(form.skills) : [];

    res.json({
      success: true,
      form
    });
  } catch (error) {
    console.error('Get form by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch form'
    });
  }
};