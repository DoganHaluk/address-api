import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  defaultLanguage = 'en';
  selectedLanguage: string='';

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  onAddressComplete(event: any)
  {
    console.log('address complete event message', event);
  }

  onClearInputEventMessage(event: any)
  {
    console.log('address clear input message', event);
  }

  onAddressValidationMessage(event: any)
  {
    console.log('address system message', event);
  }

  onSelectLanguage(lang: string)
  {
    if (lang === 'browser') {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang);
      this.selectedLanguage = browserLang;
    } else {
      this.translate.use(lang);
      this.selectedLanguage = lang;
    }

  }
}
