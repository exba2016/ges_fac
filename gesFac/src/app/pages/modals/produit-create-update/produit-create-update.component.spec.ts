import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCreateUpdateComponent } from './produit-create-update.component';

describe('ProduitCreateUpdateComponent', () => {
  let component: ProduitCreateUpdateComponent;
  let fixture: ComponentFixture<ProduitCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
