import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererUtilisateurComponent } from './gerer-utilisateur.component';

describe('GererUtilisateurComponent', () => {
  let component: GererUtilisateurComponent;
  let fixture: ComponentFixture<GererUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
