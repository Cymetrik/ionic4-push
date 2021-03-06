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

    public token: string;

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

        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
            this.token = token.value;
            console.log('token ' + token.value);
        });

        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('error on register ' + error);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            console.log('pushNotificationReceived:title=' + notification.title);
            console.log('pushNotificationReceived:subtitle=' + notification.subtitle);
            console.log('pushNotificationReceived:body=' + notification.body);
            console.log('pushNotificationReceived:id=' + notification.id);
            console.log('pushNotificationReceived:badge=' + notification.badge);
            console.log('pushNotificationReceived:notification=' + notification.notification);
            console.log('pushNotificationReceived:data=' + notification.data);
        });

        PushNotifications.register();

        /*
        // Android only. Example response:

        channels: Array(1)
            0:
                description: "Default"
                id: "default"
                importance: 3
                name: "Default"
                visibility: -1000
        */
        /*
        PushNotifications.listChannels().then((data) => {
            console.log('listChannels', data);
        });
        */

        /* iOS only. Example response:
            { "notifications":[] }
        */
        /*
        PushNotifications.getDeliveredNotifications().then((data) => {
            console.log('getDeliveredNotifications', data);
        });
        */
    }

    public writeClipboard() {

        Plugins.Clipboard.write({
            string: this.token
        });
    }
}
