import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

}
