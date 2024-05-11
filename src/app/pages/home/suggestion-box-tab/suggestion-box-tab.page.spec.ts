import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionBoxTabPage } from './suggestion-box-tab.page';

describe('SuggestionBoxTabPage', () => {
  let component: SuggestionBoxTabPage;
  let fixture: ComponentFixture<SuggestionBoxTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionBoxTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
