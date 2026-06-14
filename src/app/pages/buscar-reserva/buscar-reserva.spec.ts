import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReserva } from './buscar-reserva';

describe('BuscarReserva', () => {
  let component: BuscarReserva;
  let fixture: ComponentFixture<BuscarReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarReserva],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
