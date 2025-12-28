import api from '../../../shared/utils/api';

export const getAllForms = async () => {
  try {
    const response = await api.get('/admin/forms');
    return { success: true, forms: response.data.forms };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch forms'
    };
  }
};

export const getFormById = async (id) => {
  try {
    const response = await api.get(`/admin/forms/${id}`);
    return { success: true, form: response.data.form };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch form'
    };
  }
};

export const updateForm = async (id, formData) => {
  try {
    const response = await api.put(`/admin/forms/${id}`, formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update form'
    };
  }
};

export const deleteForm = async (id) => {
  try {
    const response = await api.delete(`/admin/forms/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete form'
    };
  }
};