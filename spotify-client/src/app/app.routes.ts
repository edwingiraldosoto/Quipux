import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { ListaReproduccionComponent } from './components/lista-reproduccion/lista-reproduccion.component';
import { ListaDetalleComponent } from './components/lista-detalle/lista-detalle.component';
import { BorrarListaComponent } from './components/borrar-lista/borrar-lista.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'create-playlist', component: CreatePlaylistComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'lists', component: ListaReproduccionComponent },
      { path: 'lists/:listName',  component: ListaDetalleComponent },
      { path: 'lists/:listName/delete', component: BorrarListaComponent },
      { path: '**', redirectTo: ''
  }
    ]
  },
  { path: 'home', component: HomeComponent } // Ruta alternativa directa
];
