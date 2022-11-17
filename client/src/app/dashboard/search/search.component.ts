import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  faMagnifyingGlass = faMagnifyingGlass;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.searchForm.value);
    this.dashboardService.searchResultChange.next(this.searchForm.value.search);
  }
}
