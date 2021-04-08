import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RweService} from "../../services/rwe.service";
import {DatePipe} from "@angular/common";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions = {};
  stationData:any = {};
  allDates: Date[] = [];
  minTemperature: Number[] = [];
  maxTemperature: Number[] = [];
  datePipe = new DatePipe('en-US');

  constructor(
      private dialogRef: MatDialogRef<AnalysisComponent>,
      @Inject(MAT_DIALOG_DATA) stationData,
      private rweService: RweService) {
    this.stationData = stationData;

  }

  ngOnInit(): void {
    this.rweService.getStationDetails(this.stationData).subscribe(data => {
      this.allDates = data.results.filter(x => x.datatype === 'TMIN').map(x => this.datePipe.transform(x.date));
      this.minTemperature = data.results.filter(x => x.datatype === 'TMIN').map(x => x.value);
      this.maxTemperature = data.results.filter(x => x.datatype === 'TMAX').map(x => x.value);
      this.drawChart();
    });
    this.drawChart();
  }

  close() {
    this.dialogRef.close('cancel');
  }

  drawChart(): void {
    this.chartOptions = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'MIN and MAX Temperature for Station',
        align: 'left'
      },
      subtitle: {
        text: 'Source: NOAA',
        align: 'left'
      },
      xAxis: [{
        categories: this.allDates,
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}°F',
          style: {
            color: Highcharts.getOptions().colors[3]
          }
        },
        title: {
          text: 'Maximum Temperature',
          style: {
            color: Highcharts.getOptions().colors[3]
          }
        },
        opposite: true

      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Minimum Temperature',
          style: {
            color: Highcharts.getOptions().colors[4]
          }
        },
        labels: {
          format: '{value}°F',
          style: {
            color: Highcharts.getOptions().colors[4]
          }
        }

      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,182,66,0.25)'
      },
      series: [{
        name: 'Min Temperature',
        type: 'spline',
        yAxis: 1,
        data: this.minTemperature,
        tooltip: {
          valueSuffix: ' °F'
        },
        color: Highcharts.getOptions().colors[4]

      }, {
        name: 'Max Temperature',
        type: 'spline',
        data: this.maxTemperature,
        tooltip: {
          valueSuffix: ' °F'
        },
        color: Highcharts.getOptions().colors[3]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 0
            },
            yAxis: [{
              labels: {
                align: 'right',
                x: 0,
                y: -6
              },
              showLastLabel: false
            }, {
              labels: {
                align: 'left',
                x: 0,
                y: -6
              },
              showLastLabel: false
            }, {
              visible: false
            }]
          }
        }]
      }
    };
  }
}
