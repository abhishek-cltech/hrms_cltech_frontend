import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractFirstLeter'
})
export class ExtractFirstLeterPipe implements PipeTransform {
  transform(value:any): any {
    return value.charAt(0);
  }

}
