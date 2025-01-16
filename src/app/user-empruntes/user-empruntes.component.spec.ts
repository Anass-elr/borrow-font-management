import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmpruntesComponent } from './user-empruntes.component';

describe('UserEmpruntesComponent', () => {
  let component: UserEmpruntesComponent;
  let fixture: ComponentFixture<UserEmpruntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmpruntesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEmpruntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
