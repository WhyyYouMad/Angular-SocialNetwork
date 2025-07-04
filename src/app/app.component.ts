import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
  ]
})
export class AppComponent{

  constructor() {
  }
}
