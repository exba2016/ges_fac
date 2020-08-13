import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProduitCommandeComponent } from './select-produit-commande.component';

describe('SelectProduitCommandeComponent', () => {
  let component: SelectProduitCommandeComponent;
  let fixture: ComponentFixture<SelectProduitCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProduitCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProduitCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
