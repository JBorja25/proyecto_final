import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {
  selectedDay: string = '';
  selectedDa: string = '';
  selectedDays: string = '';

  //event handler for the select element's change event
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

  constructor() { }

  ngOnInit(): void {
  }

}
