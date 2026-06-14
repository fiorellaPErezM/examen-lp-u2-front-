import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoReserva } from './proceso-reserva';

describe('ProcesoReserva', () => {
  let component: ProcesoReserva;
  let fixture: ComponentFixture<ProcesoReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoReserva],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
