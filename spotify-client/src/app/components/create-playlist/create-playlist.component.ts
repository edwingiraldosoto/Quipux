
import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CreatePlaylistComponent {
  nombre = '';
  descripcion = '';
  canciones = [this.nuevaCancion()];

  constructor(
    private service: PlaylistService,
    private router: Router
  ) {}

  nuevaCancion() {
    return {
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: ''
    };
  }

  agregarCancion() {
    this.canciones.push(this.nuevaCancion());
  }

  submit() {
    const data = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      canciones: this.canciones.filter(c => c.titulo) // Filtra canciones vacías
    };

    this.service.createList(data).subscribe({
      next: (res) => {
        alert('¡Lista creada con éxito!');
        // this.router.navigate(['/']); // Redirige al inicio
      },
      error: (err) => {
        alert(`Error: ${err.error || 'No se pudo crear la lista'}`);
      }
    });
  }
}
