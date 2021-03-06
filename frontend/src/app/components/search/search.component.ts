import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RweService} from '../../services/rwe.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import {AnalysisComponent} from "../analysis/analysis.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DatePipe]
})
export class SearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  coverageResponse: any;
  response = new MatTableDataSource<any>();
  searchForm: FormGroup;
  displayedColumns: string[] = ['position', 'id', 'name', 'mindate', 'maxdate', 'latitude', 'longitude', 'elevationUnit', 'elevation', 'datacoverage', 'analysis'];

  constructor(public fb: FormBuilder, private rweService: RweService,  private  dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.mainForm();
  }

  mainForm(): void {
    this.searchForm = this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      net: ['', []],
      dct: ['', []],
    });
  }

  listAllStations(): any {
    let startDate = this.datePipe.transform(this.searchForm.value.startdate, 'yyyy-MM-dd')
    let endDate = this.datePipe.transform(this.searchForm.value.enddate, 'yyyy-MM-dd')
    let reqObj = {
      startdate: startDate,
      enddate: endDate,
      latitude: this.searchForm.value.latitude,
      longitude: this.searchForm.value.longitude
    }
    if(this.searchForm.value.net !== "")
      reqObj['net'] = this.searchForm.value.net;
    this.rweService.getNOAAstations(reqObj)
      .subscribe(data => {
        this.coverageResponse = data.results;
        if(this.searchForm.value.dct !== "")
          this.coverageResponse = this.coverageResponse.filter(x => x.datacoverage === parseFloat(this.searchForm.value.dct));
        this.response.data = this.coverageResponse;
        this.response.paginator = this.paginator;
        this.response.sort = this.sort;
      });
    console.log(this.response);
  }

  showTemperatureCharts(station) {
    station.startdate = this.searchForm.value.startdate;
    station.enddate = this.searchForm.value.enddate;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = station;
    const dialogRef = this.dialog.open(AnalysisComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.listAllStations();
    });
  }
}
