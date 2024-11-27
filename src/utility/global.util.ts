import { CurrencyPipe } from '@angular/common';

export class Currency {
  private static currencyPipe = new CurrencyPipe('en-US'); // Configura el locale según tu región

  static format(value: number | undefined, currencyCode: string = 'USD'): string {
    if(value == undefined){
        return '0.00';
    }
    return this.currencyPipe.transform(value, currencyCode, 'symbol', '1.2-2') || '';
  }
}

export class Email{
  static isValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
