import { RestaurantserviceService } from './../../services/restaurantservice.service';
import { MenuService } from 'src/app/services/menu.service';
import { Restaurant } from './../../class/restaurant';
import { Menu } from './../../class/menu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {
  idx!: number;
  public menu!: Menu;
  public restaurant!: Restaurant;
  public addmenuForm!: FormGroup;
  public selectedFile!: File;
  public isSubmitting = false;
  public imagePreview: string | null = null;

  constructor(
    private activatedroute: ActivatedRoute,
    private service: MenuService,
    private restaurantService: RestaurantserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0');
    this.initForm();
  }

  ngOnInit(): void {
    // Load restaurant details if needed
  }

  private initForm(): void {
    this.addmenuForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      prix: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

    this.menu = new Menu(
      this.service.list_length + 1,
      this.addmenuForm.value.nom,
      this.addmenuForm.value.description,
      this.addmenuForm.value.prix,
      0,
      this.idx,
      undefined
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.addmenuForm.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `Le ${this.getFieldLabel(controlName)} est requis`;
    }

    switch (controlName) {
      case 'nom':
        if (control.errors['minlength']) {
          return 'Le nom doit contenir au moins 2 caractères';
        }
        break;
      case 'description':
        if (control.errors['minlength']) {
          return 'La description doit contenir au moins 10 caractères';
        }
        break;
      case 'prix':
        if (control.errors['min']) {
          return 'Le prix doit être positif';
        }
        if (control.errors['pattern']) {
          return 'Le prix doit être un nombre avec maximum 2 décimales';
        }
        break;
    }

    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nom: 'nom du menu',
      description: 'description',
      prix: 'prix'
    };
    return labels[field] || field;
  }

  addMenu(): void {
    if (this.addmenuForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    this.service.addMenu({ ...this.menu, ...this.addmenuForm.value })
      .subscribe({
        next: (data) => {
          this.menu = data;
          this.router.navigate(['/', 'restaurant', this.idx]);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du menu:', error);
          // Handle error appropriately
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0] as File;
    if (!file) return;

    if (!this.isImage(file.name)) {
      alert("Format de fichier non supporté. Veuillez choisir une image (jpg, jpeg, png)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5MB");
      return;
    }

    this.selectedFile = file;
    try {
      this.menu.img = await this.fileToBase64(file) as string;
      this.imagePreview = this.menu.img;
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image:', error);
      alert("Erreur lors du chargement de l'image");
    }
  }

  private isImage(name: string): boolean {
    const ext = name.split(".").pop()?.toLowerCase() || '';
    return ["jpg", "jpeg", "png"].includes(ext);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Allow only numbers and one decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    input.value = value;
    this.addmenuForm.get('prix')?.setValue(value);
  }
}
