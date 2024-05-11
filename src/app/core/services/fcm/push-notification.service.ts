import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';

export const DEVICE_TOKEN_KEY = 'device_token';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private readonly END_POINT = environment.API_URL + '/protected/auth-device';

  private readonly http = inject(HttpClient);

  constructor() {}

  async initPush(id: number) {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerNotifications(id);
    }
  }

  async addListeners(id: number) {
    await PushNotifications.addListener('registration', (token) => {
      const deviceToken = token.value;

      const savedDeviceToken = localStorage.getItem(DEVICE_TOKEN_KEY);
      console.log('Device token: ', savedDeviceToken);
      let status = 1;
      if (savedDeviceToken) {
        const savedDeviceTokenObj = JSON.parse(savedDeviceToken);
        if (deviceToken !== savedDeviceTokenObj) {
          localStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(deviceToken));
        }
      } else {
        localStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(deviceToken));
      }
      this.updateDeviceToken({ userId: id, deviceToken }).subscribe({
        next: (resp) => {
          console.log('Device token updated: ', resp);
        },
        error: (err) => {
          console.error('Error updating device token: ', err);
        },
      });
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
        const data = notification.data;
        if (data) {
          console.log('Data: ', data);
        }
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log('Push notification action performed', notification);
      }
    );
  }

  async registerNotifications(id: number) {
    await this.addListeners(id);
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  async getDeliveredNotifications() {
    const notificationList =
      await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  removeToken() {
    localStorage.removeItem(DEVICE_TOKEN_KEY);
  }

  private updateDeviceToken(data: { userId: number; deviceToken: string }) {
    return this.http.post(this.END_POINT, data);
  }

  unsubscribe() {
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.removeAllListeners();
    }
  }
}
