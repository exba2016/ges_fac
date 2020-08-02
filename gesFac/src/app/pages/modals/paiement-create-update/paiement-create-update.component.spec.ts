import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementCreateUpdateComponent } from './paiement-create-update.component';

describe('PaiementCreateUpdateComponent', () => {
  let component: PaiementCreateUpdateComponent;
  let fixture: ComponentFixture<PaiementCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiementCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
