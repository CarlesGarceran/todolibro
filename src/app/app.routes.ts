import { Routes } from '@angular/router';
import { HomeComponent as HomePage } from './pages/home/home.component';
import { LoginComponent as LoginPage } from './pages/login/login.component';
import { RegisterComponent as RegisterPage } from './pages/register/register.component';
import { FilterBookComponent as FilterBookPage } from './pages/filter-book/filter-book.component';
import { RootComponent as RootPage } from './pages/admin/root/root.component';
import { LibroComponent as LibroPage } from './pages/libro/libro.component';
import { ConfigComponent as ConfigPage } from './pages/config/config.component';
import { PublisherComponent as PublisherPage } from './pages/publisher/publisher.component';
import { CartCheckoutComponent as CartCheckoutPage } from './pages/cart-checkout/cart-checkout.component';
import { PrivacyPolicyComponent as PrivacyPolicyPage } from './pages/privacy-policy/privacy-policy.component';
import { AuthorComponent as AuthorPage } from './pages/author/author.component';
import { FavoritesComponent as FavoritesPage } from './pages/favorites/favorites.component';
import { PurchaseComponent as PurchasePage } from './pages/purchase/purchase.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePage,
        title: "Pagina de Inicio"
    },
    {
        path: "home",
        component: HomePage,
        title: "Pagina de Inicio"
    },
    {
        path: "login",
        component: LoginPage,
        title: "Iniciar Sesión"
    },
    {
        path: "register",
        component: RegisterPage,
        title: "Registrarse"
    },
    {
        path: "filter/:filter_type/:filter_arg",
        component: FilterBookPage,
        title: "Buscar"
    },
    {
        path: "author/:id",
        component: AuthorPage,
        title: "Perfil del Autor"
    },
    {
        path: "publishers/:id",
        component: PublisherPage,
        title: "Perfil de la Editorial"
    },
    {
        path: "book/:isbn",
        component: LibroPage,
        title: "Libro"
    },
    {
        path: "admin",
        component: RootPage,
        title: "Panel de administrador"
    },
    {
        path: "config",
        component: ConfigPage,
        title: "Configuración del usuario"
    },
    {
        path: "cart",
        component: CartCheckoutPage,
        title: "Carrito"
    },
    {
        path: "privacy-policy",
        component: PrivacyPolicyPage,
        title: "Politica de privacidad de datos"
    },
    {
        path: "favorites",
        component: FavoritesPage,
        title: "Favoritos"
    },
    {
        path: "purchase",
        component: PurchasePage,
        title: "Comprar carrito"
    },
    {
        path: "purchase/:isbn",
        component: PurchasePage,
        title: "Comprar libro"
    }
];
