package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.repository.AutorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AutorController.class)
class AutorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutorRepository repository;

    @Test
    void deveCriarAutorComSucesso() throws Exception {
        Autor salvo = new Autor();
        salvo.setId(1L);
        salvo.setNome("Machado de Assis");
        when(repository.save(any(Autor.class))).thenReturn(salvo);

        mockMvc.perform(post("/api/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Machado de Assis\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void deveRetornar404ParaAutorInexistente() throws Exception {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/autores/99"))
                .andExpect(status().isNotFound());
    }

    // (extra) listagem ordenada
    @Test
    void deveListarAutoresOrdenados() throws Exception {
        Autor a = new Autor();
        a.setId(1L);
        a.setNome("Ana");
        Autor b = new Autor();
        b.setId(2L);
        b.setNome("Bruno");
        when(repository.findAllByOrderByNomeAsc()).thenReturn(List.of(a, b));

        mockMvc.perform(get("/api/autores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Ana"));
    }
}
