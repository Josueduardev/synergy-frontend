import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteBitacorasComponent } from './reporte-bitacoras.component';

describe('ReporteBitacorasComponent', () => {
  let component: ReporteBitacorasComponent;
  let fixture: ComponentFixture<ReporteBitacorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteBitacorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteBitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
