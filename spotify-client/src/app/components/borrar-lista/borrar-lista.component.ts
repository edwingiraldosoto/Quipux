import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-borrar-lista',
  templateUrl: './borrar-lista.component.html',
  styleUrls: ['./borrar-lista.component.css'],
  imports: [FormsModule, CommonModule,RouterModule]
})
export class BorrarListaComponent implements OnInit {
  listName: string = '';
  isDeleting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.listName = this.route.snapshot.paramMap.get('listName') || '';
  }

  confirmDelete(): void {
    this.isDeleting = true;

    this.playlistService.deleteList(this.listName).subscribe({
      next: () => {
        this.router.navigate(['/lists'], {
          state: { message: `Lista "${this.listName}" eliminada correctamente` }
        });
      },
      error: (err) => {
        this.isDeleting = false;
        this.errorMessage = err.status === 404
          ? `La lista "${this.listName}" no existe`
          : 'Error al eliminar la lista';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/lists', this.listName]);
  }
}
