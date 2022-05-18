import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  defaultLanguage = 'en';
  selectedLanguage: string = '';
  data: any = {};
  clicked = false;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  onAddressComplete(event: any) {
    console.log('address complete event message', event);
    if (event.isComplete) {
      let data = {
        municipalityName: event.localityName,
        postalCode: event.postalCode,
        streetName: event.streetName,
        streetNumber: event.houseNumber,
        boxNumber: event.boxNumber
      }
      console.log(data);
      this.data = data
    } else {
      event.message
    }
  }

  onClearInputEventMessage(event: any) {
    console.log('address clear input message', event);
  }

  onAddressValidationMessage(event: any) {
    console.log('address system message', event);
  }

  onSelectLanguage(lang: string) {
    if (lang === 'browser') {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang);
      this.selectedLanguage = browserLang;
    } else {
      this.translate.use(lang);
      this.selectedLanguage = lang;
    }
  }

  submitForm() {
    const headers = {'content-type': 'application/json'};
    const jsonBody = JSON.stringify(this.data);
    console.log(jsonBody);
    this.http
      .post('http://localhost:8080/address', jsonBody, {headers})
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    this.clicked = true;
  }
}
