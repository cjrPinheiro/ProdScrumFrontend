import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventObj } from 'src/_app/_models/eventObj';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:5001/api/Event';



  public getEvents() : Observable<EventObj[]> {
    return this.http.get<EventObj[]>(this.baseURL);
  }

  public getEventsByTheme(theme: string) : Observable<EventObj[]> {
    return this.http.get<EventObj[]>(`${this.baseURL}/theme/${theme}`);
  }

  public getEventById(id: number) : Observable<EventObj> {
    return this.http.get<EventObj>(`${this.baseURL}/${id}`);
  }

}
