import { Injectable } from '@angular/core';

const MODULE_NAME = 'AudioContextService';

@Injectable({
  providedIn: 'root'
})
export class AudioContextService {
  private readonly context: AudioContext;

  constructor() {
    const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
    try {
      this.context = new AudioContext();
    } catch (e) {
      console.error(`[ ${MODULE_NAME} ] Failed creating audio context`, e);
    }
  }

  getContext() {
    return this.context;
  }
}
