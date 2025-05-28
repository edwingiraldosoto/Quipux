package com.example.playlists.controller;

import com.example.playlists.model.ListaReproduccion;
import com.example.playlists.service.ListaReproduccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/lists")
public class ListaReproduccionController {

    @Autowired
    private ListaReproduccionService service;

    @PostMapping
    public ResponseEntity<?> crearLista(@RequestBody ListaReproduccion lista) {
        if (lista.getNombre() == null || lista.getNombre().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre de la lista es obligatorio.");
        }
        ListaReproduccion creada = service.crearLista(lista);
        return ResponseEntity.created(URI.create("/lists/" + creada.getNombre())).body(creada);
    }

    @GetMapping
    public List<ListaReproduccion> obtenerListas() {
        return service.obtenerTodas();
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerLista(@PathVariable String nombre) {
        ListaReproduccion lista = service.obtenerPorNombre(nombre);
        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada.");
        }
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<?> eliminarLista(@PathVariable String nombre) {
        boolean eliminada = service.eliminar(nombre);
        if (!eliminada) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada.");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "¡Hola, tu app funciona!";
    }
}
