import api from '../../../shared/utils/api';

export const createForm = async (formData) => {
  try {
    const response = await api.post('/user/forms', formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit form'
    };
  }
};

export const getMyForms = async () => {
  try {
    const response = await api.get('/user/forms/my-forms');
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
    const response = await api.get(`/user/forms/${id}`);
    return { success: true, form: response.data.form };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch form'
    };
  }
};