import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyHomeTabPage } from './my-home-tab.page';

describe('MyHomeTabPage', () => {
  let component: MyHomeTabPage;
  let fixture: ComponentFixture<MyHomeTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHomeTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
