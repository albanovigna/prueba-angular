import { FilterPipePipe } from './filter-pipe.pipe';
import { HomeComponent } from '../home/home.component';
import data from '../data/infoLiquidador.json';
import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [HomeComponent, FilterPipePipe],
  });
});
describe('FilterPipePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return an array with empty object of clients if not find any data', () => {
    const pipe = new FilterPipePipe();
    const formObject = 
      {
        Tmp_os: '',
        comprobante_desde: '',
        comprobante_hasta: '',
        cuit: '405 ',
        estado: '',
        razon_social: '',
        tramite_desde: '',
        tramite_hasta: '',
      }
    const array = pipe.transform(data, formObject)
    expect(array).toEqual([{}]);
  });
  it('should return an array with objects of clients if find any data', () => {
    const pipe = new FilterPipePipe();
    const formObject = 
      {
        Tmp_os: '',
        comprobante_desde: '',
        comprobante_hasta: '',
        cuit: '30503364898',
        estado: '',
        razon_social: '',
        tramite_desde: '',
        tramite_hasta: '',
      }
    const array = pipe.transform(data, formObject)
    expect(array).toEqual([{
    Tmp_os: 'OSPM',
    periodo_comprobante: 20190910,
    cuit: '30503364898',
    estado: 'modificar',
    razon_social: 'SIEMENS S.A.',
    fecha_tramite: 20200114,
  }]);
  });
});
