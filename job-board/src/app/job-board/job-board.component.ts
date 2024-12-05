import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css'],
})
export class JobBoardComponent implements OnInit {

  start = 0;
  limit = 6; 
  filterText = '';  
  filterDate?: Date; 
  filteredJobs: any[] = [];

  constructor(public jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.loadJobs(this.start, this.limit);
    
    this.updateFilteredJobs();
  }

 
  loadMore(): void {
    this.start += this.limit;
    this.jobService.loadJobs(this.start, this.limit);
  }

  onFilterChange(): void {
    this.updateFilteredJobs();
    
  }

  private updateFilteredJobs(): void {
    const parsedDate = this.filterDate ? new Date(this.filterDate) : undefined;
    if (!this.filterText && !parsedDate) {
      this.filteredJobs = this.jobService.jobs(); 
      
    } else {
      this.filteredJobs = this.jobService.filterJobs(this.filterText, parsedDate);
    }

  }
}
