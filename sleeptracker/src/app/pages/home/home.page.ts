import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput} from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton} from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { SleepData } from '../../data/sleep-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

import { SleepLogComponent } from 'src/app/components/sleep-log/sleep-log.component';
import { InputBoxComponent } from 'src/app/components/input-box/input-box.component';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
	IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
	IonGrid, SleepLogComponent, InputBoxComponent, IonRow, IonCol, IonButton
	],

})
export class HomePage {
  constructor(public sleepService:SleepService, public viewContainerRef:ViewContainerRef) { }

	data:string = "";
	makeNewLog = false;

	@ViewChild('log_content', {
		read:ViewContainerRef
	})
	private log_content!:ViewContainerRef;

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData.sort(function(a, b){return a.loggedAt.getTime() - b.loggedAt.getTime()});
	}

	insertLog(data:SleepData)
	{
		// const new_log = this.log_content.createComponent(SleepLogComponent);
		// new_log.instance.date = data.dateString();
		// new_log.instance.summary = data.summaryString();
		this.hidePopup();
	}

	displayPopup()
	{
		this.makeNewLog = true;
	}

	hidePopup()
	{
		this.makeNewLog = false;
	}
}
