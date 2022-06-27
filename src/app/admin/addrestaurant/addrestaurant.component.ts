import { CategorieserviceService } from './../../categorieservice.service';
import { RestaurantserviceService } from './../../restaurantservice.service';
import { Categorie } from './../../class/categorie';
import { Restaurant } from './../../class/restaurant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private service: RestaurantserviceService, private servCate: CategorieserviceService, private formBuilder: FormBuilder, private router: Router) {

    this.addrestaurantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      codepostale: ['', Validators.required],
      adresse: ['', Validators.required],
    })

    this.restaurant = new Restaurant(
      this.service.list_length + 1,
      this.addrestaurantForm.value.nom,
      this.addrestaurantForm.value.description,
      this.addrestaurantForm.value.adresse,
      this.addrestaurantForm.value.codepostale,
      0,
      0,
      undefined
    )

    this.servCate.getData().subscribe(data => {
      this.categorie = data.splice(1)
    this.restaurant.categorie =  this.categorie[0].id
    })

  }

  ngOnInit(): void {

  }
  
  addRestaurant() {
    this.service.addRestaurant({ ...this.restaurant, ...this.addrestaurantForm.value }).subscribe((data) => {
      this.restaurant = data
      this.router.navigate(['/', 'addmenu', this.restaurant.id]);
    })

  }

  async onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    const { name } = this.selectedFile
    if (!this.isImage(name)) {
      alert("Fichier non supporté")
      return
    }
    this.restaurant.img = await this.fileToBase64(this.selectedFile) as string
  }


  isImage(name: string) {
    const ext = name.split(".").reverse()[0]
    return ["jpg", "jpeg", "png"].includes(ext)
  }

  fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }


  onlyNumber(event: { which: any; keyCode: any; }): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


}
