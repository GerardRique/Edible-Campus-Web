import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEdibleTreeListingComponent } from './admin-edible-tree-listing.component';

describe('AdminEdibleTreeListingComponent', () => {
  let component: AdminEdibleTreeListingComponent;
  let fixture: ComponentFixture<AdminEdibleTreeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEdibleTreeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEdibleTreeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
