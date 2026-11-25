import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonFooter, IonButtons, IonNote, IonToast} from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton, IonList, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon} from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { SleepData } from '../../data/sleep-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

import { SleepLogComponent } from 'src/app/components/sleep-log/sleep-log.component';
import { InputBoxComponent } from 'src/app/components/input-box/input-box.component';
import { ViewContainerRef } from '@angular/core';

import { addIcons } from 'ionicons';
import { addOutline, eyeOutline, homeOutline, trashBinOutline } from 'ionicons/icons';

import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
	IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
	IonGrid, SleepLogComponent, InputBoxComponent, IonRow, IonCol, IonButton,
	IonFooter, IonButtons, IonNote, IonList, IonTabs, IonTabBar, IonTabButton, IonLabel,
	IonIcon, IonToast	
],

})
export class HomePage {
  constructor(public sleepService:SleepService, public viewContainerRef:ViewContainerRef) {
	addIcons({homeOutline, eyeOutline, trashBinOutline, addOutline});

	Preferences.get
	({
		key: "overnightData",
	})
	.then((resultData) => 
		{
			if(resultData.value)
			{
				console.log("Overnight Data is NOT Empty.");
				console.log(resultData.value);
				SleepService.AllOvernightData = JSON.parse(resultData.value).map(
					function(entry:any)
					{
						return new OvernightSleepData(new Date(entry.sleepStart), new Date(entry.sleepEnd));
					}
				);

				for (let i = 0; i < SleepService.AllOvernightData.length; i++)
				{
					SleepService.AllSleepData.push(SleepService.AllOvernightData[i]);
					this.loggedDays.add(this.allOvernightData[i].loggedAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year:'numeric'}));
					console.log("added to AllSleepData from Overnight");
				}
				console.log(this.loggedDays);
			}
	});

	Preferences.get
	({
		key: "sleepinessData",
	})
	.then((resultData) => 
		{
			if(resultData.value)
			{
				console.log("Sleep Data is NOT Empty.");
				console.log(resultData.value);
				SleepService.AllSleepinessData = JSON.parse(resultData.value).map(
					function(entry:any)
					{
						return new StanfordSleepinessData(entry.loggedValue, new Date(entry.loggedAt));
					}
				);
				
				for (let i = 0; i < SleepService.AllSleepinessData.length; i++)
				{
					SleepService.AllSleepData.push(SleepService.AllSleepinessData[i]);
					this.loggedDays.add(this.allSleepinessData[i].loggedAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year:'numeric'}));
					console.log("added to AllSleepData from Sleepiness");
				}
				console.log(this.loggedDays);
			}
	});
}
   
	makeNewLog = false;
	confirmClear = false;
	loggedDays= new Set();
	isToastOpen=false;

	@ViewChild('log_content', {
		read:ViewContainerRef
	})
	private log_content!:ViewContainerRef;

	ngOnInit() {
		// console.log(this.allSleepData);
	}

	setOpen(val:boolean)
	{
		this.isToastOpen = val;
	}

	// getlogDays()
	// {
	// 	for(let i=0; i < this.allSleepData.length; i++)
	// 	{
	// 		this.loggedDays.add(this.allSleepData[i].loggedAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year:'numeric'}));
	// 	}
	// 	console.log("loggedDays result:");
	// 	console.log(this.loggedDays);
	// }

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData.sort(function(a, b)
		{
			return a.loggedDate.getTime() - b.loggedDate.getTime()
		});
	}
	get allOvernightData() {
		return SleepService.AllOvernightData;
	}
	get allSleepinessData() {
		return SleepService.AllSleepinessData;
	}

	changeClearButton()
	{
		this.confirmClear = true;
	}

	revertClearButton()
	{
		this.confirmClear = false;
	}

	deleteLog(data:any)
	{
		if(data instanceof StanfordSleepinessData)
		{
			SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(
				item => item !== data
			);
			this.saveEntry();
		}
		else
		{
			SleepService.AllOvernightData = SleepService.AllOvernightData.filter(
				item => item !== data
			);
			this.saveEntry();
		}
	}

	insertLog(data:SleepData)
	{
		this.hidePopup();
		this.saveEntry();
		this.setOpen(true);
	}

	displayPopup()
	{
		this.makeNewLog = true;
	}

	hidePopup()
	{
		this.makeNewLog = false;
	}

	async saveEntry()
	{
		try
		{
			await Preferences.set({
				key:"sleepinessData", 
				value:JSON.stringify(this.allSleepinessData)
			})

		} 
		catch(e)
		{
			console.log(e);
		}

		try
		{
			await Preferences.set({
				key:"overnightData", 
				value:JSON.stringify(this.allOvernightData)
			})
		} 
		catch(e)
		{
			console.log(e);
		}
	}

	async clearData()
	{
		await Preferences.remove({
      		key: "overnightData"
    	});

		await Preferences.remove({
      		key: "sleepinessData"
    	});

		this.clearLocalLog();
	}

	clearLocalLog()
	{
		// var logs = document.getElementsByTagName("app-sleep-log");
		// console.log(logs.length);
		// while(logs.length > 0)
		// {	console.log(logs.length);
		// 	logs[0].remove();
		// }
		SleepService.AllOvernightData = [];
		SleepService.AllSleepinessData = [];
		SleepService.AllSleepData = [];
	}
}
