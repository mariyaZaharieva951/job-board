import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signal, signal } from '@angular/core';
import { map, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
  private jobDetailsUrl = 'https://hacker-news.firebaseio.com/v0/item/';

  constructor(private http: HttpClient) {}

  
  jobs = signal<any[]>([]);


  loadJobs(start: number, limit: number): void {
    this.http
      .get<number[]>(this.apiUrl)
      .pipe(
        map((ids) => ids.slice(start, start + limit)), 
        switchMap((ids) =>
          forkJoin(ids.map((id) => this.http.get(`${this.jobDetailsUrl}${id}.json`)))
        )
      )
      .subscribe((newJobs) => {
      
        this.jobs.update((currentJobs) => [...currentJobs, ...newJobs]);
       
      });
  }
}
