import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntLivreComponent } from './emprunt-livre.component';

describe('EmpruntLivreComponent', () => {
  let component: EmpruntLivreComponent;
  let fixture: ComponentFixture<EmpruntLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntLivreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpruntLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
