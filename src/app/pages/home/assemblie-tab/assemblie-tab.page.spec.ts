import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssemblieTabPage } from './assemblie-tab.page';

describe('AssemblieTabPage', () => {
  let component: AssemblieTabPage;
  let fixture: ComponentFixture<AssemblieTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblieTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
