import { request } from './auth';

const CategoryMap = {
  'Médico': 'MEDICINE',
  'Comida': 'FOOD',
  'Educación': 'EDUCATION',
  'Otros': 'OTHER'
};

export const getPosts = async (filters = {}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const queryString = queryParams.toString();
  const url = `${baseUrl}/posts${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener las publicaciones');
  }
  return response.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

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
