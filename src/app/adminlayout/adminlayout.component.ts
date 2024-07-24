import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent {

  @Input() receivedData: any = '';
  constructor(){}
  ngOnInit() {

  }

  title = 'ProjectCDB';
  randomName(receivedData:any) {
    receivedData.toggle();
}

}
