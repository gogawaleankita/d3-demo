import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import {MatTableModule,MatTabsModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { MetaDataDemoComponent } from './meta-data-demo/meta-data-demo.component';
import {MyHightLighterComponent} from './my-hightlighter';
import { ReactiveFormsModule } from '@angular/forms';	
import {ContactService} from '../services/contact.service';
// import { HttpModule } from '@angular/common/http';
import { HttpClientModule} from "@angular/common/http";
import { FormValidationComponent } from './form-validation/form-validation.component';
import { TableWithBarChartCOmponent} from './table-with-bar-chart/table-with-bar-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    BarChartsComponent,
    MetaDataDemoComponent,
    MyHightLighterComponent,
    FormValidationComponent,
    TableWithBarChartCOmponent

  ],
  imports: [
    // HttpModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    MatTableModule,MatTabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
