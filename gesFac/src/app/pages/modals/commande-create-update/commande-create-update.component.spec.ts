import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCreateUpdateComponent } from './commande-create-update.component';

describe('CommandeCreateUpdateComponent', () => {
  let component: CommandeCreateUpdateComponent;
  let fixture: ComponentFixture<CommandeCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
