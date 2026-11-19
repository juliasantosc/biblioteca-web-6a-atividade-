import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

function crud(recurso) {
  return {
    listar: () => api.get(recurso),
    buscar: (id) => api.get(`${recurso}/${id}`),
    criar: (dados) => api.post(recurso, dados),
    atualizar: (id, dados) => api.put(`${recurso}/${id}`, dados),
    deletar: (id) => api.delete(`${recurso}/${id}`),
  };
}

export const autorService = crud('/autores');
export const livroService = crud('/livros');

export default api;
