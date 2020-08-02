import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {PageNotFoundComponent} from './pages/auth/page-not-found/page-not-found.component';
import {AccessDeniedComponent} from './pages/auth/access-denied/access-denied.component';
import {GererUtilisateurComponent} from './pages/list/gerer-utilisateur/gerer-utilisateur.component';
import {GererProduitComponent} from './pages/list/gerer-produit/gerer-produit.component';
import {GererCommandeComponent} from './pages/list/gerer-commande/gerer-commande.component';
import {GererPaiementComponent} from './pages/list/gerer-paiement/gerer-paiement.component';
import {AccueilComponent} from './pages/list/accueil/accueil.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'users', component: GererUtilisateurComponent },
  { path: 'produit', component: GererProduitComponent },
  { path: 'commande', component: GererCommandeComponent },
  { path: 'paiement', component: GererPaiementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accessdenied', component: AccessDeniedComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
