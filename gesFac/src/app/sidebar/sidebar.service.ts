import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  authList = [
    {
      role: 'ROLE_ADMIN',
      auth: 0
    },
    {
      role: 'ROLE_CLIENT',
      auth: 1
    }

  ];
  menus = [
    {
      title: 'general',
      type: 'header',
      auth: this.authList[1]
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'simple',
      url: '/accueil',
      auth: this.authList[0]
    },
    {
      title: 'Gerer produits',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      auth: this.authList[1],
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Produits',
          url: '/produit',
          auth: this.authList[1]
        },
        {
          title: 'Commande',
          url: '/commande',
          auth: this.authList[1]
        },
        {
          title: 'Paiement',
          url: '/paiement',
          auth: this.authList[1]
        }
      ]
    },
    {
      title: 'Gerer utilisateurs',
      icon: 'far fa-gem',
      active: false,
      type: 'simple',
      auth: this.authList[0],
      url: '/users'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
