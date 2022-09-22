import { Pipe, PipeTransform } from '@angular/core';
import { FuseUtils } from '../../app/utils/index';
@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  capitalize(text: string): string {
    return text.toLowerCase().replace(/(^.|\s+.)/g, (m) => m.toUpperCase());
  }

  capitalizeArray(array: any): Array<string> {
    return array.map((item: any) => this.capitalize(item));
  }

  filterByDates(values: any, datesComprobante: any, datesTramite: any): boolean {
    // console.log(values[0],values[1],  "values in match dates")
    // console.log(datesComprobante[0], datesComprobante[1], 'datesComprobante');
    // console.log(datesTramite[0], datesTramite[1], 'datesTramite');
    const fecha_comprob = new Date(values[0]);
    const fecha_tramite = new Date(values[1]);
    const comprob_desde = new Date(datesComprobante[0]);
    const comprob_hasta = new Date(datesComprobante[1]);
    const tramite_desde = new Date(datesTramite[0]);
    const tramite_hasta = new Date(datesTramite[1]);
    // console.log(fecha_comprob, fecha_tramite, 'dates json');
    // console.log(comprob_desde, comprob_hasta, 'dates form');
    // console.log(tramite_desde, tramite_hasta, 'dates form');
    // if (fecha_comprob >= comprob_desde && fecha_comprob <= comprob_hasta) {
    //   return fecha_tramite >= tramite_desde && fecha_tramite <= tramite_hasta;
    // }
    // return false;
    return ((fecha_comprob >= comprob_desde && fecha_comprob <= comprob_hasta)||(fecha_tramite >= tramite_desde && fecha_tramite <= tramite_hasta))
  }

  // filterSwitch(array:any,keys:any , value:any):any{
  //   let result = []
  //   for (const key in keys) {
  //     switch (key) {
  //       case 'cuit': result = this.filterByInput(array, value)
  //         break;
  //         case 'razon_social': result = this.filterByInput(array, value)
  //         break;
  //         case 'Tmp_os':result =  this.filterByInput(array, value)
  //         break;
  //         case 'estado':result =  this.filterByInput(array, value)
  //         break;    
  //       default:
  //         break;
  //     }
  //   }
  //   console.log(result)
  //   return result
  // }

  checkValuesInArray(values: any, array: any[]): boolean {
    return false;
  }

  filterByInput(array:any, input:any):any{
    return array.filter((v: any) => Object.values(v).indexOf(input) !== -1)
  }

  

  transform(value: any, ...args: any[]): any {
    // console.log(Object.values(args[0]).filter((val:any)=> val!==''), "esto es args[0]")
    // console.log(Object.keys(args[0]).filter((val:any)=> args[0][val]!==''), "esto es args[0]")
    if (!value) {
      return [];
    }
    if(!args || Object.keys(args[0]).length < 2) return value

    // if(!args || !args[0].status) {
    // if (!args || Object.keys(args[0]).length < 2 || args[0].Tmp_os==='' ) {
    //   return value;
    // }
    // if(args[0].Tmp_os!==''){
    //   return value.filter((val: any) => val.Tmp_os===args[0].Tmp_os)
    // }
    // const cuits = this.filterByInput(value, 'cuit', args[0].cuit)
    // console.log(cuits, "esto es cuits")

    /// FILTRADO DE DATOS///

    const firstValues = Object.values(args[0]);
   
    const valuesToFilter = firstValues.slice(0, 4).filter((val:any)=> val!=='');
    
    const datesComprobante = firstValues.slice(4, 6);
    const datesTramites = firstValues.slice(-2);
    console.log(datesComprobante, datesTramites, "dates values")
    let filterValues = value.filter((v: any) => {
      const valuesInObject = Object.values(v);
      
      const filterData = valuesToFilter.every((val) => {
        // if(val !== ''){
          return valuesInObject.slice(0, 4).indexOf(val) !== -1;
        // }
        // return true;
      });
      return filterData;
    });
    // console.log(filterValues, "filterValues")
    // return filterValues.length === 0 ? [{}] : filterValues;

    // PRUEBA //


    // const firstValues = Object.values(args[0]);
    // const camposIngresados = Object.keys(args[0]).filter((val:any)=> args[0][val]!=='')
    // // console.log(firstValues, "firstValues")
    // const valuesToFilter = firstValues.slice(0, 4);
    // console.log(valuesToFilter, "values to filter")
    // const datesComprobante = firstValues.slice(4, 6);
    // const datesTramites = firstValues.slice(-2);
    // console.log(datesComprobante, datesTramites, "dates values")
    // let filterValues = value.filter((v: any) => {
    //   const valuesInObject = Object.values(v);
    //   console.log(camposIngresados,"campos ingresados")
    //   const filterData = camposIngresados.every((val:any, i:number) => {
    //     // if(val !== ''){
    //       return camposIngresados[i].indexOf(val) !== -1;
    //     // }
    //     // return true;
    //   });
    //   return filterData;
    // });

    //FILTRADO DE FECHAS///

    if((datesComprobante[0]!==''&& datesComprobante[1]!=='')||(datesTramites[0]!==''&& datesTramites[1]!=='')){
      console.log(filterValues,"filter values")
      filterValues = filterValues.filter((v: any) => {
      const valuesInObject = Object.values(v);
      console.log(valuesInObject, "values in object")
      const datesToFilter = valuesInObject
        .map((valor: any) =>
          String(valor).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        )
        .slice(4);
        console.log(datesToFilter, "datesToFilter")
      return this.filterByDates(datesToFilter, datesComprobante, datesTramites);
    });
    }
    
    // console.log(filterValues,"filterValues")
    return filterValues.length === 0 ? [{}] : filterValues;

    // if(args[0].status) {
    //   const valuesToFilter = this.capitalizeArray(Object.values(args[0]))
    //   console.log(FuseUtils.filterArrayByString(value,args[0].status))
    //   const filterValues = FuseUtils.filterArrayByString(value,args[0].status)
    //   return filterValues.length === 0 ? [{}]  : filterValues
    // }
  }
}
