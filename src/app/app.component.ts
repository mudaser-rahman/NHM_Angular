import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() receivedData: any = '';
  title = 'ProjectCDB';
  randomName(receivedData:any) {
    receivedData.toggle();
}
}
