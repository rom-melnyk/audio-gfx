import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/_/g, ' ');
  }

}
