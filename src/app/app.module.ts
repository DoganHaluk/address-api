import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { LibAddressAutocompleteByComponentModule } from '@bpost/bp-address-auto-complete-by-component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { WidgetComponent } from './widget/widget.component';
import { RouterModule } from "@angular/router";

export function HttpLoaderFactory(http: HttpClient) {                   // <------
// const i18nResourcePath = environment.i18nResourcePath;
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'},
    {prefix: './assets/aacwidget/i18n/', suffix: '.json'}
    // {prefix: /*'./shared/assets/i18n/'*/ i18nResourcePath, suffix: '.json'},
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    TranslateModule.forRoot({               // <------
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    LibAddressAutocompleteByComponentModule,  // <------
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
