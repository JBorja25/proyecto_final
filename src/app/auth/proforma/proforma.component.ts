import { Component, OnInit } from '@angular/core';

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

                    
  serviciosMedicos: any[] = ['Oxigeno', 'Terapias Respiratorias', 'Terapias Musculares', 'Cuidados Postoperatorios', 'Dialisis', 'Sondas', 'Ostomias', 'Terapias Cognitivas', 'Diabetes']
  servicioMedAux:any[] = [];
  //
  serviciosAdicionales: any[] = ['Peluqueria', 'Entrega de Medicamentos', 'Acompañamiento a Citas Medicas', 'Dieta Especial', 'Cama Hospitalaria']
  servicioAdiAux:any[] = [];
  //eventos imput


  habitacion: string = '';
  fisico: string = '';
  servicio: string[] = [];
  cognitivo: string = '';
  medico: string = '';

  //eventos generales
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }
  selectChangeHandle (event: any) {
    //update the ui
    this.selectedDa = event.target.value;
  }
  selectChangeHandlr (event: any) {
    //update the ui
    this.selectedDays = event.target.value;
  }
  //eventos del imput


  constructor() { }

  ngOnInit(): void {
 
  }


  // funciona paraobtener el valor de los ervicios medicos
  serviciosmedicos(evento :any){
    console.log(evento);
    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    if(evento.target.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      this.servicioMedAux.push(this.serviciosMedicos.find(v => v===evento.target.value));
      console.log(this.servicioMedAux);
    }else{
      console.log('entra borrar');
      let index = this.servicioMedAux.findIndex(v => v == evento.target.value);
      this.servicioMedAux.splice(index, 1);
      console.log(this.servicioMedAux);
      
    }
    
    
  }
  serviciosadicionales(evento :any){
    console.log(evento);
    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    if(evento.target.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      this.servicioAdiAux.push(this.serviciosAdicionales.find(v => v===evento.target.value));
      console.log(this.servicioAdiAux);
    }else{
      console.log('entra borrar');
      let index = this.servicioAdiAux.findIndex(v => v == evento.target.value);
      this.servicioAdiAux.splice(index, 1);
      console.log(this.servicioAdiAux);
      
    }
    
    
  }

}
