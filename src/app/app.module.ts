import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app-component/app.component';
import { FileSelectorComponent } from './components/nodes/audio-source/file-selector/file-selector.component';
import { FilenamePipe } from './pipes/filename/filename.pipe';
import { AudioPlayerComponent } from './components/nodes/audio-source/audio-player/audio-player.component';
import { NodeWrapperComponent } from './components/nodes/node-wrapper/node-wrapper.component';
import { AudioSourceComponent } from './components/nodes/audio-source/audio-source.component';
import { AudioDestinationComponent } from './components/nodes/audio-destination/audio-destination.component';
import { AddNodeComponent } from './components/nodes/add-node/add-node.component';
import { AnalyserComponent } from './components/nodes/analyser/analyser.component';
import { GainComponent } from './components/nodes/gain/gain.component';
import { DelayComponent } from './components/nodes/delay/delay.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    AudioPlayerComponent,
    NodeWrapperComponent,
    AddNodeComponent,
    AudioSourceComponent,
    AnalyserComponent,
    GainComponent,
    DelayComponent,
    AudioDestinationComponent,

    // --- pipes ---
    FilenamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
