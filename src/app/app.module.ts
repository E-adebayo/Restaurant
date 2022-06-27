import { RestaurantserviceService } from './restaurantservice.service';
import { CategorieserviceService } from './categorieservice.service';
import { HomeComponent } from './admin/home/home.component';
import { AboutComponent } from './admin/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RestaurantComponent } from './admin/restaurant/restaurant.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AddmenuComponent } from './admin/addmenu/addmenu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClientModule,
    RestaurantserviceService,
    CategorieserviceService],
  bootstrap: [AppComponent]

})
export class AppModule { }
