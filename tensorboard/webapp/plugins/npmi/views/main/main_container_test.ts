/* Copyright 2020 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
/**
 * Unit tests for the Main Container.
 */
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Store, Action} from '@ngrx/store';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

import {State} from '../../../../app_state';
import {getRunSelection} from './../../../../core/store/core_selectors';
import {getSidebarExpanded} from '../../store';
import {appStateFromNpmiState, createNpmiState} from '../../testing';
import {createState, createCoreState} from '../../../../core/testing';
import {MainComponent} from './main_component';
import {MainContainer} from './main_container';
import * as npmiActions from '../../actions';

/** @typehack */ import * as _typeHackStore from '@ngrx/store';

describe('Npmi Main Container', () => {
  let store: MockStore<State>;
  let dispatchedActions: Action[];
  const css = {
    ANALYSIS_CONTAINER: '.analysis-container',
    SIDEBAR_CONTAINER: '.sidebar-container',
    SIDE_TOGGLE: '.side-toggle',
    GRABBER: '.grabber',
    CONTENT: '.content',
    RUN_SELECTOR: 'tb-legacy-runs-selector',
    BUTTON: 'button',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, MainContainer],
      imports: [],
      providers: [
        provideMockStore({
          initialState: {
            ...createState(createCoreState()),
            ...appStateFromNpmiState(createNpmiState()),
          },
        }),
      ],
    }).compileComponents();
    store = TestBed.inject<Store<State>>(Store) as MockStore<State>;

    dispatchedActions = [];
    spyOn(store, 'dispatch').and.callFake((action: Action) => {
      dispatchedActions.push(action);
    });
  });

  it('renders npmi main component without runs', () => {
    store.overrideSelector(getRunSelection, new Map());
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const runsElement = fixture.debugElement.query(By.css(css.RUN_SELECTOR));
    expect(runsElement).toBeTruthy();

    const analysisElement = fixture.debugElement.query(
      By.css(css.ANALYSIS_CONTAINER)
    );
    expect(analysisElement).toBeNull();
  });

  it('renders npmi main component with run', () => {
    store.overrideSelector(getRunSelection, new Map([['run_1', true]]));
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const runsElement = fixture.debugElement.query(By.css(css.RUN_SELECTOR));
    expect(runsElement).toBeTruthy();

    const analysisElement = fixture.debugElement.query(
      By.css(css.ANALYSIS_CONTAINER)
    );
    expect(analysisElement).toBeTruthy();
  });

  it('renders npmi main component without active run', () => {
    store.overrideSelector(getRunSelection, new Map([['run_1', false]]));
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const runsElement = fixture.debugElement.query(By.css(css.RUN_SELECTOR));
    expect(runsElement).toBeTruthy();

    const analysisElement = fixture.debugElement.query(
      By.css(css.ANALYSIS_CONTAINER)
    );
    expect(analysisElement).toBeNull();
  });

  it('renders npmi main component with multiple runs, some active, some inactive', () => {
    store.overrideSelector(
      getRunSelection,
      new Map([['run_1', false], ['run_2', true], ['run_3', false]])
    );
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const runsElement = fixture.debugElement.query(By.css(css.RUN_SELECTOR));
    expect(runsElement).toBeTruthy();

    const analysisElement = fixture.debugElement.query(
      By.css(css.ANALYSIS_CONTAINER)
    );
    expect(analysisElement).toBeTruthy();
  });

  it('does not render sidebar or grabber when sidebar hidden', () => {
    store.overrideSelector(getSidebarExpanded, false);
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const sidebarElement = fixture.debugElement.query(
      By.css(css.SIDEBAR_CONTAINER)
    );
    expect(sidebarElement).toBeNull();
    const grabber = fixture.debugElement.query(By.css(css.GRABBER));
    expect(grabber).toBeNull();
  });

  it('dispatches sidebar toggle when disabled and toggle button clicked', () => {
    store.overrideSelector(getSidebarExpanded, false);
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();
    const sideToggle = fixture.debugElement.query(By.css(css.SIDE_TOGGLE));
    expect(sideToggle).toBeTruthy();
    const expansionButton = sideToggle.query(By.css(css.BUTTON));
    expansionButton.nativeElement.click();

    expect(dispatchedActions).toEqual([
      npmiActions.npmiToggleSidebarExpanded(),
    ]);
  });

  it('renders sidebar and grabber when enabled', () => {
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const sidebarElement = fixture.debugElement.query(
      By.css(css.SIDEBAR_CONTAINER)
    );
    expect(sidebarElement).toBeTruthy();
    const grabberElement = fixture.debugElement.query(By.css(css.GRABBER));
    expect(grabberElement).toBeTruthy();
    const sideToggle = fixture.debugElement.query(By.css(css.SIDE_TOGGLE));
    expect(sideToggle).toBeNull();
  });

  it('dispatches change sidebarWidth when interacted with grabber', () => {
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const grabberElement = fixture.debugElement.query(By.css(css.GRABBER));
    grabberElement.triggerEventHandler('mousedown', {clientX: 301});
    const contentElement = fixture.debugElement.query(By.css(css.CONTENT));
    contentElement.triggerEventHandler('mousemove', {clientX: 50});
    expect(dispatchedActions).toEqual([
      npmiActions.npmiChangeSidebarWidth({sidebarWidth: 50}),
    ]);
  });

  it('does not dispatch change sidebarWidth when grabber not selected', () => {
    const fixture = TestBed.createComponent(MainContainer);
    fixture.detectChanges();

    const contentElement = fixture.debugElement.query(By.css(css.CONTENT));
    contentElement.triggerEventHandler('mousemove', {clientX: 50});
    expect(dispatchedActions).toEqual([]);
  });
});
