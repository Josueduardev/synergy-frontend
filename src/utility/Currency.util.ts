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
