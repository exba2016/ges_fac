import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePartielCreateUpdateComponent } from './facture-partiel-create-update.component';

describe('FacturePartielCreateUpdateComponent', () => {
  let component: FacturePartielCreateUpdateComponent;
  let fixture: ComponentFixture<FacturePartielCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturePartielCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturePartielCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
