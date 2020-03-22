import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataGridModule} from 'primeng/datagrid';
import {PanelModule} from 'primeng/panel';
import {DataListModule} from 'primeng/datalist';
import {DataViewModule} from 'primeng/dataview';
import { MarvelService } from 'src/app/services/marvel.service';
import { HttpModule } from '@angular/http';
import { globales } from 'src/globales';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import { LoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,  
    DataGridModule,
    PanelModule,
    HttpModule,
    DataListModule,
    DataViewModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    SidebarModule,  
    LoadingModule,
    NgxPaginationModule
  ],
  providers: [MarvelService, globales],
  bootstrap: [AppComponent]
})
export class AppModule { }
