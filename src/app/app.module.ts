import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app-component/app.component';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';
import { FilenamePipe } from './pipes/filename/filename.pipe';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { NodeGeneralComponent } from './components/nodes/node-general/node-general.component';
import { AudioSourceComponent } from './components/nodes/audio-source/audio-source.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    AudioPlayerComponent,
    NodeGeneralComponent,
    AudioSourceComponent,

    // --- pipes ---
    FilenamePipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
