import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() dataLiquidador:any = []
  @Output() parametroAfiltrar = new EventEmitter<any>()
  @Output() dataFilter = new EventEmitter<any>();
  
  filterParam:any = []

  optionsOS= [
    { name: "ASE", value: 1 },
    { name: "OSPM", value: 2 },
    { name: "OSEN", value: 3 }
  ]
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
     
      cuit: new FormControl(''),
      Tmp_os: new FormControl(''),
      estado: new FormControl(''),
      razon_social: new FormControl(''),
      comprobante_desde: new FormControl(''),
      comprobante_hasta: new FormControl(''),
      tramite_desde: new FormControl(''),
      tramite_hasta: new FormControl(''),

    });
  }
  

 
  search(filters: any): void {
    this.parametroAfiltrar.emit(filters)
  }

  EnterSubmit(event:any, form:any) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.search(form)
    }  
  }

  setOSValue(value: any): void {
    if (value===''){
      this.form.patchValue({
        Tmp_os:value,
        estado:'',
        cuit:'' ,
        razon_social: '',
        comprobante_desde: '',
        comprobante_hasta: '',
        tramite_desde: '',
        tramite_hasta: '',
      })
    }else{
      this.form.patchValue({
        Tmp_os:value,
        estado:'',
      })
    }
    
    this.search(this.form.value)
    
  }
  setStatusValue(value: any): void {
    this.form.patchValue({
      estado:value,
      Tmp_os:''
    })
    this.search(this.form.value)
  }


}
