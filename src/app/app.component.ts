import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LoginComponent} from './authorization/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LoginComponent,
  ]
})
export class AppComponent{

  constructor() {
  }
}
