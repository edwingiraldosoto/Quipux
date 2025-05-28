package com.example.playlists.service;

import com.example.playlists.model.ListaReproduccion;
import com.example.playlists.repository.ListaReproduccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaReproduccionService {

    @Autowired
    private ListaReproduccionRepository repository;

    public ListaReproduccion crearLista(ListaReproduccion lista) {
        return repository.save(lista);
    }

    public List<ListaReproduccion> obtenerTodas() {
        return repository.findAll();
    }

    public ListaReproduccion obtenerPorNombre(String nombre) {
        return repository.findById(nombre).orElse(null);
    }

    public boolean eliminar(String nombre) {
        if (repository.existsById(nombre)) {
            repository.deleteById(nombre);
            return true;
        }
        return false;
    }
}
