import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-lista-reproduccion',
  templateUrl: './lista-reproduccion.component.html',
  styleUrls: ['./lista-reproduccion.component.css'],
  imports: [FormsModule, CommonModule,RouterModule]
})
export class ListaReproduccionComponent implements OnInit {
  lists: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private playlistService: PlaylistService , private router: Router) {}

  ngOnInit(): void {
    this.loadLists();
  }


  loadLists(): void {
    this.playlistService.getAllLists().subscribe({
      next: (data) => {
        this.lists = data;
        this.loading = false;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las listas';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
