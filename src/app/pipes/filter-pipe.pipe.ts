import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
 
  checkDates(values: any, datesComprobante: any, datesTramite: any): boolean {
    datesComprobante = datesComprobante.filter((val:any)=> val!=='')
    datesTramite = datesTramite.filter((val:any)=> val!=='')
    const fecha_comprob = new Date(values[0]);
    const fecha_tramite = new Date(values[1]);
    const comprob_desde = new Date(datesComprobante[0]);
    const comprob_hasta = new Date(datesComprobante[1]);
    const tramite_desde = new Date(datesTramite[0]);
    const tramite_hasta = new Date(datesTramite[1]);
      
    let checkCondition = false
    if(datesComprobante.length > 0 && datesTramite.length === 0) {
      checkCondition = (fecha_comprob >= comprob_desde && fecha_comprob <= comprob_hasta)
    }else if(datesComprobante.length === 0 && datesTramite.length > 0){
      checkCondition = (fecha_tramite >= tramite_desde && fecha_tramite <= tramite_hasta)
    }else {
      checkCondition = ((fecha_comprob >= comprob_desde && fecha_comprob <= comprob_hasta)&&(fecha_tramite >= tramite_desde && fecha_tramite <= tramite_hasta))
    }
    return checkCondition
  }

  filterClientsByClientInfo(clientsArray:Array<any>, formClientDataValues:Array<any>):Array<any>{
    return clientsArray.filter((v: any) => {
        const ObjectDataClientValues = Object.values(v);
        const filteredValues = formClientDataValues.every((val) => {
            return ObjectDataClientValues.slice(0, 4).find((element:any) => element.toLowerCase().includes(val.toLowerCase().replace(/\s/g, '')))
        });
          
        return filteredValues;
      });
  }

  filterClientsByClientDates(clientsArray:Array<any>,datesComprobante:Array<any>,datesTramites:Array<any>):any{
    return clientsArray.filter((v: any) => {
      const ObjectDataClientValues = Object.values(v);
      const datesToFilter = ObjectDataClientValues
        .map((valor: any) =>
          String(valor).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        )
        .slice(4);
      return this.checkDates(datesToFilter, datesComprobante, datesTramites);
    });
  }

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return [];
    }
    if(!args || Object.keys(args[0]).length < 2){
      return value
    } 
    const formValues = Object.values(args[0]);
    const formClientDataValues = formValues.slice(0, 4).filter((val:any)=> val!=='');
    let filteredClients = this.filterClientsByClientInfo(value, formClientDataValues)
    const datesComprobante = formValues.slice(4, 6);
    const datesTramites = formValues.slice(-2);
    if((datesComprobante[0]!==''&& datesComprobante[1]!=='')||(datesTramites[0]!==''&& datesTramites[1]!=='')){
      filteredClients=this.filterClientsByClientDates(filteredClients, datesComprobante, datesTramites)
    }
    return filteredClients.length === 0 ? [{}] : filteredClients;
  }
}
