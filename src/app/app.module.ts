import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app-component/app.component';
import { FileSelectorComponent } from './components/nodes/audio-source/file-selector/file-selector.component';
import { FilenamePipe } from './pipes/filename/filename.pipe';
import { AudioPlayerComponent } from './components/nodes/audio-source/audio-player/audio-player.component';
import { NodeWrapperComponent } from './components/nodes/node-wrapper/node-wrapper.component';
import { AudioSourceComponent } from './components/nodes/audio-source/audio-source.component';
import { AudioDestinationComponent } from './components/nodes/audio-destination/audio-destination.component';
import { AddNodeComponent } from './components/nodes/add-node/add-node.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    AudioPlayerComponent,
    NodeWrapperComponent,
    AddNodeComponent,
    AudioSourceComponent,
    AudioDestinationComponent,

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
