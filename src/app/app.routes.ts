import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path : "" , redirectTo : "auth" , pathMatch : "full"},
    {path : "auth" , component : AuthComponent , children : [
        {path : "" , redirectTo : "login" , pathMatch : "full"},
        {path : "login" , component :  LoginComponent , title : "LogIn"},
        {path : "register" , component : RegisterComponent , title : "Register"}
    ]},
    {path : "main" , component : MainComponent , children : [
        {path : "" , redirectTo : "home" , pathMatch : "full"},
        {path : "home" , component : HomeComponent , title : "Home"},
        {path : "cart" , component : CartComponent , title : "Cart"},
        {path : "brands" , component : BrandsComponent , title : "brands"},
        {path : "products" , component : ProductsComponent , title : "Products"},
        {path : "categories" , component : CategoriesComponent , title : "Categoreies"}
    ] , canActivate : [authGuard]},
    {path : "**" , component : NotFoundComponent}
];
