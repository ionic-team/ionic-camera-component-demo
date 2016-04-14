import {Page} from 'ionic-angular';

import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Camera} from 'ionic-native';

@Component({
  selector: 'ion-camera',
  template: ''
})
class CameraComponent {
  @Output() onPhoto = new EventEmitter();
  @Output() onPhotoError = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    Camera.getPicture({
      quality: 90,
      destinationType: 0,
      sourceType: 1,
      allowEdit: true,
      encodingType: 0,
      saveToPhotoAlbum: false,
      correctOrientation:true
    }).then((img) => {
      this.onPhoto.emit(img);
    }, (err) => {
      this.onPhotoError.emit(err);
    })
  }
}

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [CameraComponent]
})
export class Page1 {
  showCamera: boolean;
  photo: string;

  constructor() {
    this.showCamera = false;
  }

  openCamera() {
    console.log('Open camera');
    this.showCamera = !this.showCamera;
  }

  onPhoto(photo) {
    this.photo = 'data:image/jpeg;base64,' + photo;
    this.showCamera = false;
  }
  onPhotoError(err) {
    console.error('Photo error', err);
    this.showCamera = false;
  }
}
