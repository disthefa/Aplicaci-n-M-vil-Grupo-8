import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilMiskiPage } from './perfil-miski.page';

describe('PerfilMiskiPage', () => {
  let component: PerfilMiskiPage;
  let fixture: ComponentFixture<PerfilMiskiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMiskiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
