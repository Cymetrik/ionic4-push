import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
        public toastController: ToastController
    ) { }

    ngOnInit() {
        console.log('ngOnInit');
        this.toastController.create({
            message: 'ngOnInit',
            duration: 5000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: ''
        }).then((toast) => {
            toast.present();
        });

        PushNotifications.register();
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
            console.log('token ' + token.value);
            this.toastController.create({
                message: token.value,
                duration: 10000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: ''
            }).then((toast) => {
                toast.present();
            });
        });
        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('error on register ' + JSON.stringify(error));
        });
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            console.log('notification ' + JSON.stringify(notification));
        });
    }
}
