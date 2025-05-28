package com.example.playlists.repository;

import com.example.playlists.model.ListaReproduccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListaReproduccionRepository extends JpaRepository<ListaReproduccion, String> {
}