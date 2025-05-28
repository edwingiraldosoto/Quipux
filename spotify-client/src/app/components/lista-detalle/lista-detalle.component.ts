import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-lista-detalle',
  templateUrl: './lista-detalle.component.html',
  styleUrls: ['./lista-detalle.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ListaDetalleComponent implements OnInit {
  playlist: any = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private location: Location
  ) {}

  // Método para volver atrás
goBack(): void {
  this.location.back();
}

  ngOnInit(): void {
    const listName = this.route.snapshot.paramMap.get('listName');
    if (listName) {
      this.loadPlaylistDetails(listName);
    }
  }

  loadPlaylistDetails(name: string): void {
    this.playlistService.getListByName(name).subscribe({
      next: (data) => {
        this.playlist = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar la lista';
        this.loading = false;
      }
    });
  }
}
