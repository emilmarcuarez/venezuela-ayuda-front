import { request } from './auth';

const CategoryMap = {
    'Médico': 'MEDICINE',
    'Comida': 'FOOD',
    'Educación': 'EDUCATION',
    'Otros': 'OTHER'
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // We cannot use the default request wrapper easily because it sets Content-Type to application/json
  // For FormData, we must let the browser set the Content-Type automatically
  const token = localStorage.getItem('venezuela-ayuda:auth') 
    ? JSON.parse(localStorage.getItem('venezuela-ayuda:auth')).token 
    : null;
    
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
  const response = await fetch(`${baseUrl}/uploads`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Error al subir la imagen');
  }
  
  return response.json();
};

export const createPost = async (postData) => {
    const payload = {
        title: postData.title,
        description: postData.description,
        type: 'REQUEST',
        category: CategoryMap[postData.category] || 'OTHER',
        city: postData.location.split(',')[0].trim(),
        deadline: postData.deadline ? new Date(postData.deadline).toISOString() : undefined,
        contactName: postData.contactName,
        contactPhone: postData.phone,
        contactPreference: postData.preference,
        images: postData.images || []

    };

    const response = await request('/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
    });

    return response;
};
