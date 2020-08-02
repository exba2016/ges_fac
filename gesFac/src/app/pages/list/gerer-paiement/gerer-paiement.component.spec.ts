import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPaiementComponent } from './gerer-paiement.component';

describe('GererPaiementComponent', () => {
  let component: GererPaiementComponent;
  let fixture: ComponentFixture<GererPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
