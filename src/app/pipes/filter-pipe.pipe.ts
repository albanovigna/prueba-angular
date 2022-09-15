import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value, "en pipe");
    if(args[0] !== '' && args[0] !== 'All'){
      return value.filter((v:any) => v.status === args[0]);
    }
    return value;
  }

}
