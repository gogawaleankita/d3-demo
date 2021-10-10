import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDataDemoComponent } from './meta-data-demo.component';

describe('MetaDataDemoComponent', () => {
  let component: MetaDataDemoComponent;
  let fixture: ComponentFixture<MetaDataDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaDataDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
