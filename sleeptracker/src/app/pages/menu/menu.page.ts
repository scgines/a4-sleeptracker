import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, IonItem, IonList, IonNote } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { eyeOutline, homeOutline, trashBinOutline } from 'ionicons/icons';

import { InputBoxComponent } from 'src/app/components/input-box/input-box.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonToolbar, IonTabs,
    IonTabBar, IonTabButton, IonIcon,IonLabel, IonItem, IonList, IonNote
  ]
})
export class MenuPage implements OnInit {

  today:Date = new Date();

  constructor() {
    addIcons({homeOutline, eyeOutline, trashBinOutline});
    this.startTime();
  }

  ngOnInit() {
  }

  startTime() {
    var intervalVar = setInterval(this.updateTime.bind(this),500)
}

updateTime()
{
  this.today = new Date();
}

returnString()
{
  return this.today.toDateString();
}

}
