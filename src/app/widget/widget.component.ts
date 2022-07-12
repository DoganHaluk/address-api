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
  address: string = "";
  clicked = true;

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
        houseNumber: event.houseNumber,
        boxNumber: event.boxNumber
      }
      this.clicked = false;
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
        next: (response) => this.addressSubmitted(response),
        error: (error) => console.log(error),
      });
    this.clicked = true;
  }

  addressSubmitted(response: any) {
    let street = response.streetName;
    let house = response.houseNumber;
    let box = response.boxNumber;
    if (box == null) {
      box = "";
    } else {
      box = "Bus:".concat(box, ", ");
    }
    let code = response.postalCode;
    let city = response.municipalityName;
    this.address = street.concat(" ", house, ", ", box, code, " ", city);
    console.log(this.address);
  }

  reloadPage(){
    window.location.reload();
  }
}
