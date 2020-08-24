import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  annee;
  listAnnee;
  listHisto=[];
  listBar=[];
  user;
  selectedGraph;
  listGraphs=["Histogramme","diagramme circulaire"];

  constructor(public loginService:LoginService) {
    Object.assign(this, this.listHisto )
  }
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Produit';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Revenu';
  legendTitle: string = 'Statistique vente / année';


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
    let user:any = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log("retrive force user ", user);
    this.user=user;
    this.getAllAnnee();
  }
  getAllAnnee(){
  this.loginService.getStatsVenteAnnee().subscribe((rs)=>{
    this.listAnnee=rs;
  });
  }
  graph_init(){
    switch (this.selectedGraph){
      case "Histogramme":
        this.listHisto = [];
        this.loginService.getStatsVenteForHistogramme(this.annee).subscribe((rs)=>{
          console.log("result histo ",rs);
          let s=[];
          for (let m of rs) {
            s.push({
              "name": m.libelle,
              "value": m.prix
            });
          }
          this.listHisto=s;
          console.log("list histo ",this.listHisto);
          Object.assign(this, this.listHisto);
        });
      case "diagramme circulaire":
        this.listBar = [];
        this.loginService.getStatsVenteForClient(this.annee).subscribe((rs)=>{
          console.log("result histo ",rs);
          let s=[];
          for (let m of rs) {
            s.push({
              "name": m.libelle,
              "value": m.prix
            });
          }
          this.listBar=s;
          Object.assign(this, this.listBar);
        });
        break;

        break;
    }
  }



}
