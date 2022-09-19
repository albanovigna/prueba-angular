import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  

  capitalize(text:string):string {
    return text.toLowerCase().replace(/(^.|\s+.)/g, m => m.toUpperCase())
  }

  capitalizeArray(array:any):Array<string> {
    return array.map((item:any) => this.capitalize(item))
  }

  transform(value: any, ...args: any[]): any {
    if(!value) {
      return [];
    }
    if(!args) {
      return value;
    }
      const valuesToFilter = this.capitalizeArray(Object.values(args[0]))
      
      const filterValues = value.filter((v:any) => {
        return valuesToFilter.every(val => {
          return Object.values(v).indexOf(val) !== -1;
        });
      });
      return filterValues.length === 0 ? [{}] : filterValues
  }

}
