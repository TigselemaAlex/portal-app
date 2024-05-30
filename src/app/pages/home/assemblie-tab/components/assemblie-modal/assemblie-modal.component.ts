import { ConvocationService } from './../../../../../core/services/api/convocation.service';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ConvocationResponse } from 'src/app/shared/models/response/convocation/convocation-response.model';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  ModalController,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  LoadingController,
  ToastController,
  IonRefresher,
  RefresherEventDetail,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { ConvocationParticipantsResponse } from 'src/app/shared/models/response/convocation/convocation-participants-response.model';
import { StorageService } from 'src/app/core/services/resource/storage.service';
import { ConvocationParticipantAttendanceData } from 'src/app/shared/models/request/convocation/convocation-participant-attendance-data.model';
import { AsyncPipe, NgClass } from '@angular/common';
import { IonRefresherCustomEvent } from '@ionic/core';
import { VoteService } from 'src/app/core/services/api/vote.service';
import { AssemblyQuestionResponse } from 'src/app/shared/models/response/vote/assembly-question-response.model';
import { catchError, map, of } from 'rxjs';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-assemblie-modal',
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonContent,
    IonTitle,
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    FormsModule,
    NgClass,
    IonRefresher,
    IonRefresherContent,
    AsyncPipe,
  ],
  providers: [AsyncPipe],
  templateUrl: './assemblie-modal.component.html',
  styleUrls: ['./assemblie-modal.component.scss'],
})
export class AssemblieModalComponent implements OnInit {
  @Input() convocation: ConvocationResponse = {} as ConvocationResponse;

  convocationParticipants: ConvocationParticipantsResponse[] = [];
  questions: AssemblyQuestionResponse[] = [];

  catchedVoteStatus: { [questionId: number]: string }[] = [];

  selectedSegment = 'assistance';
  private readonly modalCtrl = inject(ModalController);
  private readonly convocationService = inject(ConvocationService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly storageService = inject(StorageService);
  private readonly toastCtrl = inject(ToastController);
  private readonly voteService = inject(VoteService);

  user: number | undefined;

  ngOnInit() {
    this.getParticipants();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async getParticipants() {
    const jwt = this.storageService.getAuth();

    if (jwt) {
      this.user = jwt.id;
      this.convocationService
        .findAllByConvocationIdAndResidenceUserId(
          this.convocation.id,
          this.user
        )
        .subscribe({
          next: (response) => {
            this.convocationParticipants = response.data;
          },
          error: (error) => {
            const toast = this.toastCtrl.create({
              message: 'Error al obtener participantes de la convocatoria.',
              duration: 3000,
              color: 'danger',
            });
            toast.then((toast) => toast.present());
          },
        });
    }
  }

  async getQuestions() {
    this.voteService.findAllAssemblyQuestions(this.convocation.id).subscribe({
      next: (response) => {
        this.questions = response.data;
        this.questions.forEach((question) => {
          this.getVoteStatus(question);
        });
      },
      error: (error) => {
        const toast = this.toastCtrl.create({
          message: 'Error al obtener las preguntas de la asamblea.',
          duration: 3000,
          color: 'danger',
        });
        toast.then((toast) => toast.present());
      },
    });
  }

  async registerAssistance(asistant: ConvocationParticipantsResponse) {
    const loading = await this.loadingCtrl.create({
      message: 'Validando y registrando asistencia... espere por favor.',
    });

    await loading.present();
    const status = await Geolocation.requestPermissions();
    const toast = await this.toastCtrl.create({
      duration: 2000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    if (status.coarseLocation === 'granted' || status.location === 'granted') {
      const coordinates = await Geolocation.getCurrentPosition();

      const deviceId = await Device.getId();

      const data: ConvocationParticipantAttendanceData = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        residence: asistant.residence.id,
        deviceId: deviceId.identifier,
      };

      this.convocationService
        .updateParticipantAttendance(asistant.id, data)
        .subscribe({
          next: (response) => {
            toast.message = response.message;
            toast.cssClass = 'success';
            setTimeout(() => {
              loading.dismiss();
              toast.present();
            }, 300);
            this.getParticipants();
          },
          error: (error) => {
            if (error.error) {
              toast.message = error.error.message;
            } else {
              toast.message =
                'Error al registrar asistencia. Intente nuevamente.';
            }
            toast.duration = 3000;
            toast.color = 'danger';
            setTimeout(() => {
              loading.dismiss();
              toast.present();
            }, 300);
          },
        });
    } else {
      loading.dismiss();
      toast.message = 'No se han otorgado permisos de ubicación.';
      toast.duration = 3000;
      toast.color = 'danger';
      toast.present();
    }
  }

  getVoteStatus(question: AssemblyQuestionResponse) {
    if (this.user) {
      this.voteService.getParticipantVote(question.id, this.user).subscribe({
        next: (response) => {
          console.log(response);
          if (response.data === null) {
            this.catchedVoteStatus[question.id] = 'Sin votar';
          } else {
            this.catchedVoteStatus[question.id] = response.data.vote
              ? 'A favor'
              : 'En contra';
          }
        },
        error: (error) => {
          this.catchedVoteStatus[question.id] = 'Sin votar';
        },
      });
    }
  }

  async onVote(question: AssemblyQuestionResponse, vote: boolean) {
    const loading = await this.loadingCtrl.create({
      message: 'Validando y registrando su voto... espere por favor.',
    });
    loading.present();
    const status = await Geolocation.requestPermissions();
    const toast = await this.toastCtrl.create({
      duration: 2000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    if (status.coarseLocation === 'granted' || status.location === 'granted') {
      const coordinates = await Geolocation.getCurrentPosition();

      const deviceId = await Device.getId();

      if (this.user) {
        const data = {
          vote: vote,
          assemblyQuestion: question.id,
          voteBy: this.user,
          geolocation: {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
          },
          deviceId: deviceId.identifier,
        };

        this.voteService.updateVote(data).subscribe({
          next: (response) => {
            this.getQuestions();
            toast.message = response.message;
            toast.cssClass = 'success';
            setTimeout(() => {
              loading.dismiss();
              toast.present();
            }, 300);
          },
          error: (error) => {
            if (error.error) {
              toast.message = error.error.message;
            } else {
              toast.message = 'Error al registrar el voto. Intente nuevamente.';
            }
            this.getQuestions();
            toast.duration = 3000;
            toast.color = 'danger';
            setTimeout(() => {
              loading.dismiss();
              toast.present();
            }, 300);
          },
        });
      }
    } else {
      loading.dismiss();
      toast.message = 'No se han otorgado permisos de ubicación.';
      toast.duration = 3000;
      toast.color = 'danger';
      toast.present();
    }
  }

  validateAuth() {
    const jwt = this.storageService.getAuth();
    if (jwt) {
      const result = jwt.authorities.includes({ authority: 'ROLE_TENANT' });
      if (result) {
        return true;
      }
      return false;
    }
    return false;
  }

  doRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {
    if (this.selectedSegment === 'assistance') {
      this.getParticipants().then(() => {
        setTimeout(() => {
          $event.detail.complete();
        }, 500);
      });
    } else {
      this.getQuestions().then(() => {
        setTimeout(() => {
          $event.detail.complete();
        }, 500);
      });
    }
  }
}
