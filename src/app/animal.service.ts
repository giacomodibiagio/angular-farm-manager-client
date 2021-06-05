import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './animal';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AnimalService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiServerUrl}/animal/all`);
  }

  public addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiServerUrl}/animal/add`, animal);
  }

  public updateAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiServerUrl}/animal/update`, animal);
  }

  public deleteAnimal(animalId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/animal/delete/${animalId}`);
  }
}
