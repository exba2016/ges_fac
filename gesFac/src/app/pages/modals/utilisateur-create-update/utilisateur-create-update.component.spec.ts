import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurCreateUpdateComponent } from './utilisateur-create-update.component';

describe('UtilisateurCreateUpdateComponent', () => {
  let component: UtilisateurCreateUpdateComponent;
  let fixture: ComponentFixture<UtilisateurCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
