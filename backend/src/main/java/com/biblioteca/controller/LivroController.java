package com.biblioteca.controller;

import com.biblioteca.model.Livro;
import com.biblioteca.repository.AutorRepository;
import com.biblioteca.repository.LivroRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "*")
public class LivroController {

    private final LivroRepository livroRepository;
    private final AutorRepository autorRepository;

    public LivroController(LivroRepository livroRepository, AutorRepository autorRepository) {
        this.livroRepository = livroRepository;
        this.autorRepository = autorRepository;
    }

    @PostMapping
    public ResponseEntity<Livro> criar(@Valid @RequestBody Livro livro) {
        // O JSON traz só {"autor": {"id": 1}}; buscamos o autor completo no banco.
        return autorRepository.findById(livro.getAutor().getId()).map(autor -> {
            livro.setId(null);
            livro.setAutor(autor);
            return ResponseEntity.status(HttpStatus.CREATED).body(livroRepository.save(livro));
        }).orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping
    public List<Livro> listar() {
        return livroRepository.findAllByOrderByTituloAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscar(@PathVariable Long id) {
        return livroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @Valid @RequestBody Livro dados) {
        return livroRepository.findById(id).map(existente -> {
            // Atualiza também o autor (igual ao setContato do Compromisso na Agenda)
            return autorRepository.findById(dados.getAutor().getId()).map(autor -> {
                existente.setTitulo(dados.getTitulo());
                existente.setIsbn(dados.getIsbn());
                existente.setAnoPublicacao(dados.getAnoPublicacao());
                existente.setGenero(dados.getGenero());
                existente.setAutor(autor);
                return ResponseEntity.ok(livroRepository.save(existente));
            }).orElse(ResponseEntity.badRequest().<Livro>build());
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (!livroRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        livroRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // (extra) livros de um autor
    @GetMapping("/autor/{autorId}")
    public List<Livro> porAutor(@PathVariable Long autorId) {
        return livroRepository.findByAutorId(autorId);
    }
}
