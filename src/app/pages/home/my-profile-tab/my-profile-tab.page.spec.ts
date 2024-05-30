import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProfileTabPage } from './my-profile-tab.page';

describe('MyProfileTabPage', () => {
  let component: MyProfileTabPage;
  let fixture: ComponentFixture<MyProfileTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
