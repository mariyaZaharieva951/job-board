import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css'],
})
export class JobBoardComponent implements OnInit {

  start = 0;
  limit = 6; 

  constructor(public jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.loadJobs(this.start, this.limit);
  }

 
  loadMore(): void {
    this.start += this.limit;
    this.jobService.loadJobs(this.start, this.limit);
  }
}
