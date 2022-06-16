// service lokia varten, joka tulostetaan sivun alareunaan, kaupallisissa sovelluksissa tata ei kayteta

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Taulukko johon tulee viesteja siita mita sovelluksessa tapahtuu eli tama on lokitaulukko. Typescriptissa
  // maaritellaan tyyppi taulukoksi
  messages: string[] = [];
  // lisataan tietoa lokitaulukkoon
  add(message: string) {
    this.messages.push(message);
  }
  // putsaa lokin tyhjaksi
  clear() {
    this.messages = [];
  }
}
