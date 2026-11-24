import { Component, EventEmitter, numberAttribute, OnInit, Output, ViewChild} from '@angular/core';
import { IonInput, IonButton, IonRange, IonDatetime, IonSelect, 
          IonSelectOption, IonDatetimeButton, IonPopover, IonModal,
          IonContent, IonItem, IonList, IonLabel, IonToolbar, IonFooter, IonHeader, IonTitle,
          IonRow, IonCol, IonGrid, IonItemGroup, IonButtons} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SleepService } from 'src/app/services/sleep.service';
import { SleepData } from 'src/app/data/sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  imports:[
    IonInput, IonButton, FormsModule, 
    IonRange, IonDatetime, IonSelect, 
    IonSelectOption, IonDatetimeButton, 
    IonDatetime, IonPopover, IonModal, IonContent,
    IonItem, IonList, IonLabel, IonToolbar, IonFooter, IonHeader, IonTitle,
    IonGrid, IonRow, IonCol, IonItemGroup,
    IonButtons
  ],
})
export class InputBoxComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  @Output() logged = new EventEmitter();
  @Output() closed = new EventEmitter();

  openModal:boolean=false;

  logtype:string="";
  rating:number = 1;
  message:string = "";

  logdate:string = new Date().toISOString();

  sleepStart:string = new Date().toISOString();
  sleepEnd:string = new Date().toISOString();

  sleepRange:string = "";

  constructor(private sleepService:SleepService) { }

  ngOnInit() {this.openModal = true;}

  updateLog()
  {
    if(this.logtype == "Sleepiness")
    {
      var data_log = new StanfordSleepinessData(this.rating, new Date(this.logdate));
      this.sleepService.logSleepinessData(data_log);
      console.log(SleepService.AllSleepData);
      this.rating = 0;
      
      this.modal.dismiss();
      this.logged.emit(data_log);
    }
    else if(this.logtype == "Overnight")
    {
      console.log(this.sleepStart)
      var data_log2 = new OvernightSleepData(new Date(this.sleepStart), new Date(this.sleepEnd)); 
      this.sleepService.logOvernightData(data_log2);
      
      this.modal.dismiss();
      this.logged.emit(data_log2);
    }
  }

  closeBox()
  {
    this.modal.dismiss();
    this.closed.emit();
  }

  showDescription( value:number)
  {
    let scaleValues = 
    [ 
      undefined,
      'Feeling active, vital, alert, or wide awake', //1
      'Functioning at high levels, but not at peak; able to concentrate', //2
      'Awake, but relaxed; responsive but not fully alert', //3
      'Somewhat foggy, let down', //4
      'Foggy; losing interest in remaining awake; slowed down', //5
      'Sleepy, woozy, fighting sleep; prefer to lie down', //6
      'No longer fighting sleep, sleep onset soon; having dream-like thoughts'
    ];
    return scaleValues[value];
  }
}
