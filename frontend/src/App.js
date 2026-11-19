import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <Link to="/autores">Autores</Link>
        <Link to="/livros">Livros</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/livros" />} />
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
          <Route path="/livros" element={<LivroList />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/editar/:id" element={<LivroForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
