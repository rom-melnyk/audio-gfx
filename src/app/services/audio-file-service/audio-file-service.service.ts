import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioFileService {

  constructor() { }

  fetch(): Observable<string[]> {
    return from(
      fetch('./assets/audio/audio-files.json')
        .then((res: Response) => res.json())
    );
  }
}
