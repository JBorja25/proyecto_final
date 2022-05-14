import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {
  //vnetos generales
  selectedDay: string = '';
  selectedDa: string = '';
  selectedDays: string = '';

  ubicacionObj: any = {};
  tipoHabitacionObj: any = {};
  amobladoObj: any = {};
  cuidadoFisicoObj : any  = {};
  cuidadoCogObj: any = {};
  sumaTotalServMedicos: number = 0;
  sumaTotalServAdicionales: number = 0;

  sumaTotalProforma: number = 0;

  tipoHabitacionBool: boolean = false;
  ubicacionBool: boolean = false;
  amobladoBool: boolean = false;
  cuidadoFisicoBool: boolean = false;
  cambioCognitivoBool: boolean = false;


  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;

                    
  serviciosMedicos: any[] = [
                              {serd:'Oxigeno',value:20}, 
                              {serd:'Terapias Respiratorias',value:30}, 
                              {serd: 'Terapias Musculares',value:25}, 
                              {serd: 'Cuidados Postoperatorios',value:35}, 
                              {serd: 'Dialisis',value:35}, 
                              {serd: 'Sondas',value:25}, 
                              {serd: 'Ostomias',value:35}, 
                              {serd: 'Terapias Cognitivas',value:30}, 
                              {serd: 'Terapias Diabetes',value:15}, 
                            ]
  servicioMedAux:any[] = [];
  //
  serviciosAdicionales: any[] = [
                                {serd:'Peluqueria',value:8},  
                                {serd:'Entrega de Medicamentos',value:7},  
                                {serd:'Acompañamiento a Citas Medicas',value:20},  
                                {serd:'Dieta Especial',value:30},  
                                {serd:'Cama Hospitalaria',value:50},  
                                ]
  
  servicioAdiAux:any[] = [];

  tipoHabitacion: any[] = [
    {tipo: 'Individual', value:350 },
    {tipo: 'Compartida', value: 325},
    {tipo: 'Individual con banio privado', value: 375}
  ]
  cuidadoFisico: any[] = [
    {tipo: 'Es independiente', value:0 },
    {tipo: 'Se le Dificulta', value: 25},
    {tipo: 'Acompañamiento Permanente', value: 50}
  ];

  cuidadoCog: any[] = [
    { cuidado: 'Capacidad Mental Plena', value: 0},
    { cuidado: 'Deterioro Mental Moderado', value: 25},
    { cuidado: 'Demencia Severa', value: 50}
  ];

  amoblado: any[] = [
    { amoblado: 'Si', value: 30 },
    { amoblado: 'No', value: 0 }
  ]
  
  ubicaciones: any[] = [
    { ubi: 'Norte', value: 50 },
    { ubi: 'Sur', value: 25 },
    { ubi: 'Valle', value: 100 },
    { ubi: 'Centro', value: 75 }
  ]
  
  
    //eventos imput


  habitacion: string = '';
  fisico: string = '';
  servicio: string[] = [];
  cognitivo: string = '';
  medico: string = '';

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      selectUbi: ['', Validators.required],
      habitaciones: ['', Validators.required]
    });

    this.SecondFormGroup = this._fb.group({
      amobladoType: ['', Validators.required],
      cuidadoFisicoForm: ['', Validators.required]
    });
    this.thirdFormGroup = this._fb.group({
      servMed: ['', Validators.required],
      servCogni: ['', Validators.required]
    });

    this.FourthFormGroup = this._fb.group({
      servAdicionales: ['', Validators.required],
      hijos: ['', Validators.required]
    });
  }


  //eventos generales
  selectChangeHandler (event: any) {
    //update the ui
    console.log(event);
    this.ubicacionBool = true;
    
    this.ubicacionObj = this.ubicaciones.find((v, index) => {
      if(index == parseInt(event.value)){
        return v;
      }
      
    });
    
    
    
    
    // this.selectedDay = event.target.value;
  }
  selectChangeHandle (event: any) {
    //update the ui
    this.amobladoBool = true;
    this.selectedDa = event.target.value;
    this.amobladoObj = this.amoblado.find((v, index) => index == parseInt(event.target.value) && v);
    // (condicion) ? valor_verdadero : valor_false`
    if(this.selectedDa == '0'){
      this.sumaTotalProforma += this.amobladoObj.value;
    }else{
      this.sumaTotalProforma -= 30;
      // this.sumaTotalProforma -=this.amobladoObj.value;
    }
  }
  selectChangeHandlr (event: any) {
    //update the ui
    this.selectedDays = event.target.value;
  }

  inputTipoHabitacion(){
    // console.log(this.habitacion);
    this.tipoHabitacionBool = true;
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index==parseInt(this.habitacion) && v);
    if(this.ubicacionBool && this.amobladoBool && this.cuidadoFisicoBool){
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma = this.tipoHabitacionObj.value + this.ubicacionObj.value + this.amobladoObj.value + this.cuidadoFisicoObj.value;
    }else{
      // this.sumaTotalProforma = 0;
      this.sumaTotalProforma += this.tipoHabitacionObj.value;
    }
  }
  //eventos del imput
  // funciona paraobtener el valor de los ervicios medicos
  serviciosmedicos(evento :any){
    console.log(evento.checked);
    console.log(evento.source.value);
    console.log(this.thirdFormGroup.get('servMed').value);
    
    console.log(evento.source.value);
    if(evento.checked){
      this.servicioMedAux.push(evento.source.value);

    }else{
      let findObj = this.serviciosMedicos.find((v, index) => v === evento.source.value && v)
      let index = this.servicioMedAux.findIndex((v, index) => v == findObj);
      this.servicioMedAux.splice(index, 1);
    }
    console.log(this.servicioMedAux);
    
    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    /* if(evento.target.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      
      this.servicioMedAux.push(this.serviciosMedicos.find((v, index) => index===parseInt(evento.target.value) && v));
      console.log(this.servicioMedAux);
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos += this.servicioMedAux[i].value;
      }
    }else{
      console.log('entra borrar');
      let findObj = this.serviciosMedicos.find((v, index) => index === parseInt(evento.target.value) && v)
      let index = this.servicioMedAux.findIndex((v, index) => v == findObj);
      console.log(index);
      
      this.servicioMedAux.splice(index, 1);
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos -= this.servicioMedAux[i].value;
      }
      
      console.log(this.servicioMedAux);
      this.sumaTotalProforma +=this.sumaTotalServMedicos;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }
  serviciosadicionales(evento :any){
    console.log(evento.checked);
    console.log(evento.source.value);

    if(evento.checked){
      this.servicioAdiAux.push(evento.source.value);
    }else{
      let findObj = this.serviciosAdicionales.find((v, index) => v === (evento.source.value) && v)
      let index = this.servicioAdiAux.findIndex(v => v == findObj);
      this.servicioAdiAux.splice(index, 1);
    }
    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    /* if(evento.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      this.servicioAdiAux.push(this.serviciosAdicionales.find((v,index) => v===evento.source.value.value && v));
      console.log(this.servicioAdiAux);
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
      }
    }else{
      console.log('entra borrar');
      let findObj = this.serviciosAdicionales.find((v, index) => v === (evento.source.value.value) && v)
      let index = this.servicioAdiAux.findIndex(v => v == findObj);
      this.servicioAdiAux.splice(index, 1);
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales -= this.servicioAdiAux[i].value;
      }
      console.log(this.servicioAdiAux);
      this.sumaTotalProforma += this.sumaTotalServAdicionales;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }

  cuidadoFisicofunction(){
    this.cuidadoFisicoBool=true;
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index=== parseInt(this.fisico) && v);

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool ) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    }
  }

  cambioCognitivo(){
    this.cambioCognitivoBool=true;
    this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index=== parseInt(this.cognitivo) && v);
    

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool  && this.cuidadoFisicoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=this.cuidadoCogObj.value +this.tipoHabitacionObj.value+this.amobladoObj.value+ this.ubicacionObj.value+this.cuidadoFisicoObj.value;
      
    } else {
      this.sumaTotalProforma +=this.cuidadoCogObj.value;
  }
  }

  calcular(){
    
    let sumaTotalMedicos: number = 0;
    let sumaTotalAdi: number = 0;
    let sumaAuxMed: number = 0;
    let sumaAuxAdi: number = 0;
    let ubicaciones = this.ubicaciones.find((v, index) => (index === this.firstFormGroup.value.selectUbi) && v);
    let hab = this.tipoHabitacion.find((v, index) => index === this.firstFormGroup.value.habitaciones && v);
    let amob = this.amoblado.find((v, index) => index === this.SecondFormGroup.value.amobladoType && v);
    let fisico = this.cuidadoFisico.find((v, index) => index === this.SecondFormGroup.value.cuidadoFisicoForm && v);
    let cog = this.cuidadoCog.find((v, index) => index === this.thirdFormGroup.value.servCogni && v);

    for(let i=0; i<this.servicioMedAux.length; i++){
      sumaAuxMed += this.servicioMedAux[i].value;
    }
    for(let i=0; i<this.servicioAdiAux.length; i++){
      sumaAuxAdi += this.servicioAdiAux[i].value;
    }

    let suma = ubicaciones.value + hab.value + amob.value +fisico.value + sumaAuxMed + sumaAuxAdi;


    console.log( suma );
    
  
    
    // console.log(this.servicioMedAux, this.servicioAdiAux);
    // console.log(cog);
    
    // console.log(ubicaciones.value + hab.value);
    
    console.log(ubicaciones);
    console.log(hab);
    console.log(amob);
    console.log(fisico);
    console.log(cog);
    console.log(this.servicioAdiAux);
    console.log(this.servicioMedAux);
    console.log(this.FourthFormGroup.get('hijos')?.value);
    
  }

  cambioStep(step: any){
    console.log(step);
    console.log(step.selectedIndex);
    if((step.steps.length -1) === 4 && this.FourthFormGroup.get('hijos')?.value){
      this.calcular();
    }
    
  }

}
