import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesembolsosComponent } from './desembolsos.component';

describe('DesembolsosComponent', () => {
  let component: DesembolsosComponent;
  let fixture: ComponentFixture<DesembolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesembolsosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesembolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
