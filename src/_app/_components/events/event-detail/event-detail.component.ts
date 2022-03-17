import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  get f(): any{
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      theme: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      place: ['', Validators.required],
      date: ['', Validators.required],
      maxPeople: ['', [Validators.required, Validators.max(120000)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imageURL: ['', Validators.required],
    });

  }

  public clearForm(): void{
    this.form.reset();

  }
  public logConsole(): boolean{
    console.log("teste aqui");

  return true;
  }
}
