import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropListComponent } from './drag-drop-list/drag-drop-list.component';
import { DragDropModule } from'@angular/cdk/drag-drop';
import { DragDropConnectedListsComponent } from './drag-drop-connected-lists/drag-drop-connected-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropListComponent,
    DragDropConnectedListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
