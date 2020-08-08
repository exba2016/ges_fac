import { TokenInterceptorService } from './pages/services/token-interceptor.service';
import { GererPaiementComponent } from './pages/list/gerer-paiement/gerer-paiement.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GererCommandeComponent } from './pages/list/gerer-commande/gerer-commande.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GererProduitComponent } from './pages/list/gerer-produit/gerer-produit.component';
import { PageNotFoundComponent } from './pages/auth/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './pages/modals/change-password/change-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccueilComponent } from './pages/list/accueil/accueil.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessDeniedComponent } from './pages/auth/access-denied/access-denied.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GererUtilisateurComponent } from './pages/list/gerer-utilisateur/gerer-utilisateur.component';
import { ToastrModule } from 'ngx-toastr';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    GererUtilisateurComponent,
    GererProduitComponent,
    GererCommandeComponent,
    GererPaiementComponent,
    AccueilComponent,
    ChangePasswordComponent
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
    ReactiveFormsModule,
    ToastrModule.forRoot({
    positionClass: 'toast-top-center'
    }), // ToastrModule added
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ChangePasswordComponent]
})
export class AppModule { }
