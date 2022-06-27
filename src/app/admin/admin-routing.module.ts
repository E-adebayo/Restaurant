import { AddmenuComponent } from './addmenu/addmenu.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantFullComponent } from './restaurant-full/restaurant-full.component';
import { AddrestaurantComponent } from './addrestaurant/addrestaurant.component';
import { SignupComponent } from './signup/signup.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },/* ,
  { path: 'home', component: HomeComponent }, */
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'restaurant/:id', component: RestaurantFullComponent },
  { path: 'restaurant-list', component: RestaurantListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addrestaurant', component: AddrestaurantComponent },
  { path: 'addmenu/:id', component: AddmenuComponent }/* ,
  {path: '**', redirectTo: '/home'} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //exports: [RouterModule]
})
export class AdminRoutingModule { }
