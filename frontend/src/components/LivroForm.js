import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [livro, setLivro] = useState({ titulo: '', isbn: '', anoPublicacao: '', genero: '', autorId: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    autorService.listar().then((r) => setAutores(r.data));
    if (id) livroService.buscar(id).then((r) => setLivro({
      titulo: r.data.titulo || '',
      isbn: r.data.isbn || '',
      anoPublicacao: r.data.anoPublicacao || '',
      genero: r.data.genero || '',
      autorId: r.data.autor ? r.data.autor.id : '',
    }));
  }, [id]);

  const alterar = (e) => setLivro({ ...livro, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    // Monta o objeto com o autor só pelo id, igual ao "contato" do CompromissoForm da Agenda
    const dados = {
      titulo: livro.titulo,
      isbn: livro.isbn,
      anoPublicacao: livro.anoPublicacao ? Number(livro.anoPublicacao) : null,
      genero: livro.genero,
      autor: { id: Number(livro.autorId) },
    };
    const req = id ? livroService.atualizar(id, dados) : livroService.criar(dados);
    req.then(() => navigate('/livros')).catch(() => setErro('Erro ao salvar. Título e autor são obrigatórios.'));
  };

  return (
    <form onSubmit={salvar}>
      <h2>{id ? 'Editar livro' : 'Novo livro'}</h2>
      <label>Título *<input name="titulo" value={livro.titulo} onChange={alterar} maxLength={200} required /></label>
      <label>Autor *
        <select name="autorId" value={livro.autorId} onChange={alterar} required>
          <option value="">Selecione um autor</option>
          {autores.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
        </select>
      </label>
      <label>ISBN<input name="isbn" value={livro.isbn} onChange={alterar} maxLength={20} /></label>
      <label>Ano de publicação<input type="number" name="anoPublicacao" value={livro.anoPublicacao} onChange={alterar} /></label>
      <label>Gênero<input name="genero" value={livro.genero} onChange={alterar} maxLength={50} /></label>
      {erro && <p className="erro">{erro}</p>}
      <button type="submit">Salvar</button>
      <button type="button" onClick={() => navigate('/livros')}>Cancelar</button>
    </form>
  );
}

export default LivroForm;
