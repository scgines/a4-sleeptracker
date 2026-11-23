import { Component, OnInit, Input } from '@angular/core';
import { IonCol, IonRow} from '@ionic/angular/standalone';

import { SleepData } from 'src/app/data/sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';

@Component({
  selector: 'app-sleep-log',
  templateUrl: './sleep-log.component.html',
  styleUrls: ['./sleep-log.component.scss'],
  imports:[IonCol, IonRow]
})
export class SleepLogComponent  implements OnInit {

  @Input() data:SleepData = new SleepData();
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

}
