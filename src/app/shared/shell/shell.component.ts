import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {

  isHandset$: Observable<boolean> = this.BreakpointObserver.observe([
    Breakpoints.Handset,
  ]).pipe(
    map(result => result.matches),
    shareReplay()
  );
  // isHandset$ is an Observable property that represents whether the screen is a handset (small screen) device or not.
  // this.breakpointObserver.observe([Breakpoints.Handset]) observes the screen size using Breakpoints.Handset from @angular/cdk/layout.
  // .pipe(...) is used to apply operators to the observable.
  // map(result => result.matches) maps the observable result to a boolean indicating whether the screen matches the handset breakpoint.
  // shareReplay() shares the result of the computation with multiple subscribers.

  constructor(private BreakpointObserver: BreakpointObserver) {}
    // to use the breakpointObserver always inject it in the consstructer
    
  // we inject the BreakpointObserver into the constructor
  // we get access to an Observable
  // the Observable listens to != Breakpoints
  // depending on how to react to != Viewport sizes
}
