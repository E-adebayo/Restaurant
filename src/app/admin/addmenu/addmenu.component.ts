import { RestaurantserviceService } from './../../restaurantservice.service';
import { MenuService } from 'src/app/menu.service';
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
  idx!: number
  public menu!: Menu
  public restaurant!: Restaurant;
  public addmenuForm!: FormGroup;
  public selectedFile!: File;

  constructor(private activatedroute: ActivatedRoute, private service: MenuService, private restaurantService: RestaurantserviceService,  private formBuilder: FormBuilder, private router: Router) {
    
    this.idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    
    this.addmenuForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required]
    })
    
    this.menu = new Menu(this.service.list_length + 1, this.addmenuForm.value.nom , this.addmenuForm.value.description, this.addmenuForm.value.prix, 0, this.idx,undefined);



  }

  ngOnInit(): void {
  }

  addMenu() {
    this.service.addMenu({ ...this.menu, ...this.addmenuForm.value }).subscribe((data) => {
      this.menu = data
      this.router.navigate(['/', 'restaurant', this.idx]);
    })

  }
  
  async onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    const { name } = this.selectedFile
    if (!this.isImage(name)) {
      alert("Fichier non supporté")
      return
    }
    this.menu.img = await this.fileToBase64(this.selectedFile) as string
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
