import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () =>
    autorService.listar().then((r) => setAutores(r.data)).catch(() => setErro('Erro ao carregar autores.'));

  useEffect(() => { carregar(); }, []);

  const excluir = (id) => {
    if (!window.confirm('Excluir este autor?')) return;
    autorService.deletar(id).then(carregar)
      .catch(() => setErro('Não foi possível excluir. Exclua os livros do autor antes.'));
  };

  return (
    <div>
      <h2>Autores</h2>
      <Link className="btn" to="/autores/novo">Novo autor</Link>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr><th>Nome</th><th>Nacionalidade</th><th>Nascimento</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {autores.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.nacionalidade}</td>
              <td>{a.dataNascimento}</td>
              <td>
                <Link className="btn" to={`/autores/editar/${a.id}`}>Editar</Link>
                <button className="danger" onClick={() => excluir(a.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutorList;
