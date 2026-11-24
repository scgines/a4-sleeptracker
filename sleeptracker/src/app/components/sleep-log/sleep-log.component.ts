import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { 
          IonCol, IonRow, IonButton, IonItemSliding, IonItem, 
          IonItemOptions, IonItemOption, IonIcon, IonItemDivider, IonLabel} from '@ionic/angular/standalone';

import { SleepData } from 'src/app/data/sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleep-log',
  templateUrl: './sleep-log.component.html',
  styleUrls: ['./sleep-log.component.scss'],
  imports:[
    IonCol, IonRow, IonButton, IonItemSliding, IonItem, IonItemOption, IonItemOptions, IonIcon,
    IonItemDivider, IonLabel
  ]
})
export class SleepLogComponent  implements OnInit {

  @Input() data:SleepData = new SleepData();
  @Output() requestDelete = new EventEmitter();

  confirmDelete = false;
  date = this.data.dateString();
  summary =this.data.summaryString();
  type="";


  constructor() { }

  ngOnInit() {
    this.date = this.data.dateString();
    this.summary =this.data.summaryString();  

    if(this.data instanceof StanfordSleepinessData)
    {
      this.type = "Sleepiness"
    }

  }

  deleteLog()
  {
    var elem = document.getElementById(this.data.id);

    if(elem != null)
      elem.remove();

    this.requestDelete.emit(this.data);
  }

  revertDeleteButton()
  {
    console.log("I was called!");
    this.confirmDelete = false;
  }

  changeDeleteButton()
  {
    this.confirmDelete = true;
  }

}
