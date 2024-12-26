import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { DataAccessService } from 'src/app/services/data-access.service';
import { YearlyRevenueData } from 'src/app/interfaces/models/yearly-revenue.interface';
import { ServicePackageRevenueData } from 'src/app/interfaces/models/service-package-revenue-data.interface';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatsCardConfig } from 'src/app/interfaces/ui-config/progress-stats-card-config.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  toastrService = inject(ToastrService);
  revenueCards: ProgressStatsCardConfig[] = [];
  servicePackageRevenueData!: ServicePackageRevenueData;
  chartLabel = 'Revenue';
  constructor(private dataAccessService: DataAccessService){}

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    this.getServicePackageRevenue();
    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    
    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.dataAccessService.getYearlyRevenue().subscribe({
      next: (res: YearlyRevenueData) => {
        const salesAmounts =  [];
        this.datasets[1] = []
        Object.keys(res).map((key) =>{
          salesAmounts.push(res[key].amount)
          this.datasets[1].push(res[key].orders);
          
        } )
        this.datasets[0] = salesAmounts;
        console.log(salesAmounts);
        this.data = salesAmounts;
        chartExample1.data.datasets[0].data = salesAmounts
        this.salesChart = new Chart(chartSales, {
          type: 'line',
          options: chartExample1.options,
          data: chartExample1.data
        });
      }
    })
    
  }

  getServicePackageRevenue() {
    this.revenueCards = [];
    this.dataAccessService.getServicePackageRevenue().subscribe({
      next: (res: ServicePackageRevenueData) =>{
        this.servicePackageRevenueData = res;
        this.revenueCards.push({
          color: 'bg-primary',
          icon: 'ni ni-money-coins',
          name: 'Total Revenue',
          stats: Object.keys(res).map((key) => res[key].amount).reduce((sum, amount ) => sum + amount)
        })

        Object.keys(res).map((key) => {
          this.revenueCards.push({
            color: 'bg-primary',
            icon: 'ni ni-money-coins',
            name: res[key].packageName,
            stats: res[key].amount
          });
        })
      },
      error: (error: any) =>{
        this.toastrService.error(error.error.message)
      }
    })
  }

  getServiceKeys() {
    return Object.keys(this.servicePackageRevenueData);
  }


  public updateOptions(option: number) {
    this.data = this.datasets[option];
    this.chartLabel = option === 0 ? 'Revenue' : "Order"
    this.salesChart.data.datasets[0].data = this.data;
    
      this.salesChart.options.scales.yAxes[0].ticks.callback = (value) => {
        console.log('value: ', value)
        if( option === 1){
          if(!(value % 1)){
            return value;

          }

        } else {
          return 'R' + value
        }
      
      }
    
    this.salesChart.update();
  }

}
