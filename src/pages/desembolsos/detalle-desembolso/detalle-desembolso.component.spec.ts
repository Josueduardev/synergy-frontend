import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDesembolsoComponent } from './detalle-desembolso.component';

describe('DetalleDesembolsoComponent', () => {
  let component: DetalleDesembolsoComponent;
  let fixture: ComponentFixture<DetalleDesembolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDesembolsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDesembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
