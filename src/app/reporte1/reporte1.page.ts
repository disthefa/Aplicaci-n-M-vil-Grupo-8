import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent,
  IonButton, IonIcon, IonButtons, IonAvatar, IonChip,IonBackButton 
} from '@ionic/angular/standalone';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DataService, PieChartData } from './services/data.service';
import { addIcons } from 'ionicons';
import { logoIonic, arrowBack, personCircleOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-reporte1',
  templateUrl: 'reporte1.page.html',
  styleUrls: ['reporte1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonRefresher,
    IonRefresherContent, IonButton, IonIcon, IonButtons, IonAvatar, IonChip,RouterLink,IonBackButton 
  ]
})
export class Reporte1Page implements AfterViewInit, OnDestroy {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;

  private pieChart: Chart | undefined;
  pieData: PieChartData[] = [];

  constructor(private dataService: DataService) {
    addIcons({ logoIonic, arrowBack, personCircleOutline });
    this.loadData();
  }

  ngAfterViewInit() {
    this.createPieChart();
  }

  loadData() {
    this.pieData = this.dataService.getPieChartData();
  }

  createPieChart() {
    if (this.pieChart) this.pieChart.destroy();

    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: this.pieData.map(d => d.label),
        datasets: [{
          data: this.pieData.map(d => d.percentage),
          backgroundColor: this.pieData.map(d => d.color)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 11 },
              boxWidth: 15,
              boxHeight: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}%`
            }
          }
        },
        layout: {
          padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
      },
      plugins: [{
        id: 'percentageLabels',
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((element: any, index) => {
              const data = dataset.data[index] as number;
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 11px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const position = element.tooltipPosition();
              ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
              ctx.shadowBlur = 3;
              ctx.fillText(`${data}%`, position.x, position.y);
              ctx.shadowColor = 'transparent';
            });
          });
        }
      }]
    };

    this.pieChart = new Chart(this.pieCanvas.nativeElement, config);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadData();
      this.createPieChart();
      event.target.complete();
    }, 1000);
  }

  irAjustes() {
    console.log('Llamando a Avatar');
  }

  ngOnDestroy() {
    if (this.pieChart) this.pieChart.destroy();
  }
}
