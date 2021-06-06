import { Component, OnInit } from '@angular/core';
import { Animal } from './animal';
import { AnimalService } from './animal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  public animals: Animal[];
  public editAnimal: Animal | undefined;
  public deleteAnimal: Animal | undefined;

  constructor(private animalService: AnimalService){
    this.animals=[];
  }

  ngOnInit() {
    this.getAnimals();
  }

  public getAnimals(): void {
    this.animalService.getAnimals().subscribe(
      (response: Animal[]) => {
        this.animals = response;
        console.log(this.animals);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAnimal(addForm: NgForm): void {
    document.getElementById('add-animal-form')!.click();
    this.animalService.addAnimal(addForm.value).subscribe(
      (response: Animal) => {
        console.log(response);
        this.getAnimals();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAnimal(animal: Animal): void {
    this.animalService.updateAnimal(animal).subscribe(
      (response: Animal) => {
        console.log(response);
        this.getAnimals();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAnimal(animalId: number): void {
    this.animalService.deleteAnimal(animalId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAnimals();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAnimals(key: string): void {
    console.log(key);
    const results: Animal[] = [];
    for (const animal of this.animals) {
      if (animal.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        results.push(animal);
    }
    this.animals = results;
    if (results.length === 0 || !key) {
      this.getAnimals();
    }
  }

  public onOpenModal(animal: Animal, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAnimalModal');
    }
    if (mode === 'edit') {
      this.editAnimal = animal;
      button.setAttribute('data-target', '#updateAnimalModal');
    }
    if (mode === 'delete') {
      this.deleteAnimal = animal;
      button.setAttribute('data-target', '#deleteAnimalModal');
    }
    container!.appendChild(button);
    button.click();
  }



}
