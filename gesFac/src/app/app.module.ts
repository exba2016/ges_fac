import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { SidebarComponent } from './sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/auth/login/login.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { AccessDeniedComponent } from './pages/auth/access-denied/access-denied.component';
import { PageNotFoundComponent } from './pages/auth/page-not-found/page-not-found.component';
import { GererUtilisateurComponent } from './pages/list/gerer-utilisateur/gerer-utilisateur.component';
import { GererProduitComponent } from './pages/list/gerer-produit/gerer-produit.component';
import { GererCommandeComponent } from './pages/list/gerer-commande/gerer-commande.component';
import { GererPaiementComponent } from './pages/list/gerer-paiement/gerer-paiement.component';
import { UtilisateurCreateUpdateComponent } from './pages/modals/utilisateur-create-update/utilisateur-create-update.component';
import { CommandeCreateUpdateComponent } from './pages/modals/commande-create-update/commande-create-update.component';
import { ProduitCreateUpdateComponent } from './pages/modals/produit-create-update/produit-create-update.component';
import { PaiementCreateUpdateComponent } from './pages/modals/paiement-create-update/paiement-create-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './pages/services/token-interceptor.service';
import { AccueilComponent } from './pages/list/accueil/accueil.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    ChangePasswordComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    GererUtilisateurComponent,
    GererProduitComponent,
    GererCommandeComponent,
    GererPaiementComponent,
    UtilisateurCreateUpdateComponent,
    CommandeCreateUpdateComponent,
    ProduitCreateUpdateComponent,
    PaiementCreateUpdateComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
