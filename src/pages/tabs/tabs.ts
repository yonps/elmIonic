import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PersonalPage } from '../personal/personal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = PersonalPage;
  @ViewChild('rootTabs') tabRef:any;
  constructor( private navParma:NavParams) {

  }

  ionViewDidEnter() {
    this.tabRef.select(0);

  }
}
