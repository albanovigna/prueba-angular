import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { FiltersComponent } from './filters/filters.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  declarations: [AppComponent, AboutComponent, HomeComponent, SpinnerComponent, FiltersComponent, FilterPipePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
