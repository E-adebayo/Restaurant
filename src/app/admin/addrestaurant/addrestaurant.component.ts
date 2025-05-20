import { CategorieserviceService } from '../../services/categorieservice.service';
import { RestaurantserviceService } from '../../services/restaurantservice.service';
import { Categorie } from '../../class/categorie';
import { Restaurant } from '../../class/restaurant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent implements OnInit {
  public restaurant!: Restaurant;
  public categorie!: Categorie[];
  public addrestaurantForm!: FormGroup;
  public selectedFile!: File;
  public isSubmitting = false;
  public showAddCategory = false;
  public newCategoryName = '';

  constructor(
    private service: RestaurantserviceService,
    private servCate: CategorieserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
    this.loadCategories();
  }

  private initializeForm(): void {
    this.addrestaurantForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      codepostale: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.restaurant = new Restaurant(
      this.service.list_length + 1,
      '',
      '',
      '',
      '',
      0,
      0,
      undefined
    );
  }

  private async loadCategories(): Promise<void> {
    try {
      const data = await firstValueFrom(this.servCate.getData());
      this.categorie = data.filter((cat: Categorie) => cat.id !== 0);
      
      if (this.categorie.length > 0) {
        const firstValidCategory = this.categorie.find(cat => cat.id > 0);
        this.restaurant.categorie = firstValidCategory?.id || this.categorie[0].id;
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // You could add a toast notification here
    }
  }

  ngOnInit(): void {
    this.service.getDataLength();
  }

  toggleAddCategory(): void {
    this.showAddCategory = !this.showAddCategory;
  }

  cancelAddCategory(): void {
    this.showAddCategory = false;
    this.newCategoryName = '';
  }

  async saveNewCategory(): Promise<void> {
    if (!this.newCategoryName) return;

    try {
      // Get the next available category ID
      const data = await firstValueFrom(this.servCate.getData());
      const maxId = Math.max(...data.map(cat => cat.id));
      const newCategoryId = maxId + 1;

      // Create new category
      const newCategory = new Categorie(newCategoryId, this.newCategoryName);
      
      const addedCategory = await firstValueFrom(this.servCate.addCategorie(newCategory));
      this.categorie.push(addedCategory);
      
      // Select the new category
      this.restaurant.categorie = addedCategory.id;
      
      // Reset the form
      this.showAddCategory = false;
      this.newCategoryName = '';
    } catch (error) {
      console.error('Error adding new category:', error);
      // You could add a toast notification here
    }
  }

  onlyNumber(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files?.length) {
      // If no file is selected, use default image
      this.restaurant.img = './assets/images/default-restaurant.jpg';
      return;
    }

    const file = input.files[0];
    
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert('Format de fichier non supporté. Veuillez choisir une image (jpg, jpeg, png)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    this.selectedFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.restaurant.img = reader.result as string;
    };
    reader.onerror = () => {
      alert('Erreur lors du chargement de l\'image');
      this.restaurant.img = './assets/images/default-restaurant.jpg';
    };
    reader.readAsDataURL(file);
  }

  onCategorySelected(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const categoryId = parseInt(select.value, 10);
    if (!isNaN(categoryId)) {
      this.restaurant.categorie = categoryId;
    }
  }

  async addRestaurant(): Promise<void> {
    if (this.addrestaurantForm.invalid) {
      Object.keys(this.addrestaurantForm.controls).forEach(key => {
        const control = this.addrestaurantForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    try {
      const formValues = this.addrestaurantForm.value;
      
      // Update restaurant object with form values
      this.restaurant.nom = formValues.nom;
      this.restaurant.description = formValues.description;
      this.restaurant.adresse = formValues.adresse;
      this.restaurant.codepostal = formValues.codepostale;
      
      // If there's no category selected, use the first available one
      if (!this.restaurant.categorie && this.categorie.length > 0) {
        this.restaurant.categorie = this.categorie[0].id;
      }

      // Wait for the restaurant to be added
      const addedRestaurant = await firstValueFrom(this.service.addRestaurant(this.restaurant)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        ));

      // Navigate to the restaurant list page
      this.router.navigate(['']); // Navigate to root which shows the restaurant list
      
    } catch (error) {
      console.error('Error adding restaurant:', error);
      this.isSubmitting = false;
      // You could add an error toast notification here
    }
  }
}
