import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Reporte1Page }from "./reporte1.page";


describe('Reporte1Page', () => {
  let component: Reporte1Page;
  let fixture: ComponentFixture<Reporte1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reporte1Page],
    }).compileComponents();

    fixture = TestBed.createComponent(Reporte1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});