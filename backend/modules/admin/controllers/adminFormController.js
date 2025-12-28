const db = require('../../../config/db');

// Get all forms with user information
exports.getAllForms = async (req, res) => {
  try {
    const [forms] = await db.query(`
      SELECT 
        f.*,
        u.name as user_name,
        u.email as user_email
      FROM forms f
      JOIN users u ON f.user_id = u.id
      ORDER BY f.created_at DESC
    `);

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
    console.error('Get all forms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forms'
    });
  }
};

// Get any form by ID
exports.getFormById = async (req, res) => {
  try {
    const formId = req.params.id;

    const [forms] = await db.query(`
      SELECT 
        f.*,
        u.name as user_name,
        u.email as user_email
      FROM forms f
      JOIN users u ON f.user_id = u.id
      WHERE f.id = ?
    `, [formId]);

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

// Update any form
exports.updateForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const {
      full_name, email, phone, date_of_birth, address, city, state, zip_code,
      high_school, degree, university, graduation_year, cgpa,
      current_company, position, experience_years, salary, skills
    } = req.body;

    console.log('Updating form ID:', formId);

    // Convert skills array to JSON string if it's an array
    const skillsStr = Array.isArray(skills) ? JSON.stringify(skills) : 
                      (typeof skills === 'string' ? skills : JSON.stringify([]));

    // Convert empty strings to null for numeric fields
    const graduationYearValue = graduation_year ? parseInt(graduation_year) : null;
    const cgpaValue = cgpa ? parseFloat(cgpa) : null;
    const experienceYearsValue = experience_years ? parseInt(experience_years) : null;
    const salaryValue = salary ? parseFloat(salary) : null;

    // FIX DATE FORMAT - Convert ISO string to YYYY-MM-DD
    let dateValue = null;
    if (date_of_birth) {
      const dateObj = new Date(date_of_birth);
      // Format as YYYY-MM-DD
      dateValue = dateObj.toISOString().split('T')[0];
    }

    const [result] = await db.query(`
      UPDATE forms SET
        full_name = ?,
        email = ?,
        phone = ?,
        date_of_birth = ?,
        address = ?,
        city = ?,
        state = ?,
        zip_code = ?,
        high_school = ?,
        degree = ?,
        university = ?,
        graduation_year = ?,
        cgpa = ?,
        current_company = ?,
        position = ?,
        experience_years = ?,
        salary = ?,
        skills = ?
      WHERE id = ?
    `, [
      full_name,
      email,
      phone,
      dateValue,  // ← Use the formatted date
      address,
      city,
      state,
      zip_code,
      high_school,
      degree,
      university,
      graduationYearValue,
      cgpaValue,
      current_company,
      position,
      experienceYearsValue,
      salaryValue,
      skillsStr,
      formId
    ]);

    console.log('Update result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    res.json({
      success: true,
      message: 'Form updated successfully'
    });
  } catch (error) {
    console.error('Update form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update form: ' + error.message
    });
  }
};

// Delete any form
exports.deleteForm = async (req, res) => {
  try {
    const formId = req.params.id;

    const [result] = await db.query('DELETE FROM forms WHERE id = ?', [formId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    res.json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    console.error('Delete form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete form'
    });
  }
};