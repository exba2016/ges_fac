import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureCreateUpdateComponent } from './facture-create-update.component';

describe('FactureCreateUpdateComponent', () => {
  let component: FactureCreateUpdateComponent;
  let fixture: ComponentFixture<FactureCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
