import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError, throwError } from 'rxjs';

const API_URL = 'http://localhost:8080/lists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private authHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    // Crear headers con autenticación básica
    this.authHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin123')
    });
  }

  private getRequestOptions() {
    return {
      headers: this.authHeader
    };
  }

  getAllLists(): Observable<any> {
    return this.http.get(API_URL, this.getRequestOptions());
  }

  getListByName(name: string): Observable<any> {
    return this.http.get(`${API_URL}/${name}`, this.getRequestOptions());
  }

  createList(data: any): Observable<any> {
    return this.http.post(API_URL, data, { headers: this.authHeader }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejo específico para errores 400 (validación)
        if (error.status === 400) {
          // Si el backend devuelve un mensaje de error, lo mostramos
          const errorMessage = error.error || 'Datos inválidos';
          return throwError(() => errorMessage);
        }
        // Para otros tipos de errores
        return throwError(() => 'Error al crear la lista');
      })
    );
  }


  deleteList(name: string): Observable<any> {
    return this.http.delete(`${API_URL}/${name}`, this.getRequestOptions());
  }
}
