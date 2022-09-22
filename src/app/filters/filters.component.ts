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

 
  optionsStatus = [
    { name: "Alive", value: 1 },
    { name: "Dead", value: 2 },
    { name: "unknown", value: 3 },
  ]
  optionsGender= [
    { name: "Female", value: 1 },
    { name: "Male", value: 2 },
    { name: "Genderless", value: 3 },
    { name: "unknown", value: 4 }
  ]
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.dataLiquidador, "data en filters es")
  }

  buildForm(): void {
    this.form = this.fb.group({
      // status: new FormControl('',[Validators.required]),
      // specie: new FormControl('',[Validators.required]),
      // gender: new FormControl('',[Validators.required])

      // cuit: new FormControl('30708185864'),
      // Tmp_os: new FormControl(''),
      // estado: new FormControl(''),
      // razon_social: new FormControl('PISTRELLI, HENRY MARTIN Y ASOCIADOS SRL'),
      // comprobante_desde: new FormControl('2018-02-12'),
      // comprobante_hasta: new FormControl('2022-08-20'),
      // tramite_desde: new FormControl('2018-02-12'),
      // tramite_hasta: new FormControl('2022-08-20'),

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
    // if(this.form.valid){
    //   this.parametroAfiltrar.emit(filters)
    //   console.log('valid')
    // }else{
    //   console.log('No valid')
    // }
    this.parametroAfiltrar.emit(filters)
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

  // get status(){return this.form.get('status')}
  // get specie(){return this.form.get('specie')}
  // get gender(){return this.form.get('gender')}

}
