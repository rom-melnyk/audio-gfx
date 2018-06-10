import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app-component/app.component';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';
import { FilenamePipe } from './pipes/filename/filename.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    FilenamePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
