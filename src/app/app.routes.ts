import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilterBookComponent } from './pages/filter-book/filter-book.component';
import { RootComponent } from './pages/admin/root/root.component';
import { LibroComponent } from './pages/libro/libro.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Pagina de Inicio"
    },
    {
        path: "home",
        component: HomeComponent,
        title: "Pagina de Inicio"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Iniciar Sesión"
    },
    {
        path: "register",
        component: RegisterComponent,
        title: "Registrarse"
    },
    {
        path: "filter",
        component: FilterBookComponent,
        title: "Buscar"
    },
    {
        path: "author/:id",
        component: FilterBookComponent,
        title: "Perfil del Autor"
    },
    {
        path: "publishers/:id",
        component: FilterBookComponent,
        title: "Perfil de la Editorial"
    },
    {
        path: "book/:isbn",
        component: LibroComponent,
        title: "Libro"
    },
    {
        path: "admin",
        component: RootComponent,
        title: "Panel de administrador"
    }
];
