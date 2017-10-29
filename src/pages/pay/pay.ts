import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';
import {AddToCartProvider} from '../../providers/add-to-cart/add-to-cart';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import {SelAddressPage} from '../sel-address/sel-address'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
  animations: [
    trigger('background', [
      state('in', style({opacity: 1, display: 'block'})),
      state('out', style({opacity: 0, display: 'none'})),
      transition('in => out', animate('500ms ease-in')),
      transition('out => in', animate('500ms ease-out'))
    ]),
    trigger('container', [
      state('in', style({bottom: 0, display: 'block'})),
      state('out', style({bottom: '-30%', display: 'none'})),
      transition('in => out', animate('500ms ease-in')),
      transition('out => in', animate('500ms ease-out'))
    ])
  ]
})
export class PayPage {
  result: any;//加入购物车之后的结果
  address: any;//用户的收货信息、地址
  selPayType = 'out';
  fapiao = '不需要开发票'
  userid: any;
  _Address: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public atcp: AddToCartProvider,
              public usp: UserServiceProvider,
              public actionSheetCtrl: ActionSheetController) {

  }

  ionViewDidLoad() {
    let data = this.navParams.get('data');
    let id = this.navParams.get('id');
    ////////////////////////////////////////////////////
    localStorage.setItem('userid', '7378');
    this.userid = localStorage.getItem('userid');
    let postdata = {
      come_from: 'web',
      restaurant_id: id,
      geohash: "31.2751,120.74191",
      entities: [data]
    };

    this.atcp.checkout(postdata).then((result) => {
      this.result = JSON.parse(result._body);
    });

    this.usp.getUseraddress(this.userid).then((data) => {
      this.address = data;
      this._Address = this.address[0];
    })
  }

  selPay(bool) {
    this.selPayType = bool;
  }

  disMiss() {
    this.viewCtrl.dismiss();
  }

  selAddress() {
    this.navCtrl.push(SelAddressPage, {userid: this.userid, callback: this.getData});
  }


  getData = (data) => {
    return new Promise((resolve, reject) => {
      this._Address = data;
      resolve();
    });
  };

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否需要发票',
      buttons: [
        {
          text: '是',
          role: 'destructive',
          handler: () => {
            this.fapiao = '需要开发票';
          }
        }, {
          text: '否',
          handler: () => {
            this.fapiao = '不需要开发票';
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}