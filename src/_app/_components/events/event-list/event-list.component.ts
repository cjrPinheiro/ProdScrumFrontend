import { OnInit } from '@angular/core';
import { EventObj } from '@app/_models/eventObj';
import { EventService } from '@app/_services/event.service';
import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  public events: EventObj[] = [];
  public filteredEvents: EventObj[] = [];
  public widthImg : number = 150;
  public marginImg : number = 2;
  public showImage : boolean = true;
  public _filterRows : string = "";
  public modalRef?: BsModalRef;


  constructor(private modalService: BsModalService,
     private eventService: EventService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private router: Router
     ) { }

  public get filterRows(){
    return this._filterRows
  }
  public set filterRows(value){
    this._filterRows = value;
    this.filteredEvents = this._filterRows ? this.FilterEvents(this._filterRows) : this.events;
  }

  ngOnInit(): void {
    this.getEvents();
    this.spinner.show();

    setTimeout(() => {
    }, 5000);
  }

  public AlterImage(): void {
    this.showImage = !this.showImage;

  }
  public getEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (_events: EventObj[]) => {
        this.events = _events,
        this.filteredEvents = this.events
      },
      error: (e) => {
        this.spinner.hide(),
        this.toastr.error("Error on load the events." + e, "Error")
      },
      complete: () => this.spinner.hide()
    });
  }
  public FilterEvents(filter : string) : EventObj[] {
    filter = filter.toLocaleLowerCase();

    return this.events.filter(
      (event : EventObj) => event.theme.toLocaleLowerCase().indexOf(filter) !== -1 ||
      event.place.toLocaleLowerCase().indexOf(filter) !== -1
    )


  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success("Event deleted with sucess!", 'Deleted!')
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detailEvent(id: number):void{
    this.router.navigate([`/events/detail/${id}`])

  }
}
