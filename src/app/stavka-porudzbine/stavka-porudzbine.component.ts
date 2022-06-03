import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { StavkaPorudzbineDialogComponent } from '../dialog/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from '../model/artikl.model';
import { Porudzbina } from '../model/porudzbina.model';
import { StavkaPorudzbineService } from '../service/stavka-porudzbine.service';
import { StavkaPorudzbine } from './../model/stavka-porudzbine.model';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'porudzbina', 'artikl', 'actions'];

  dataSource!: Observable<StavkaPorudzbine[]>;

  porudzbina!: Porudzbina;

  artikl!: Artikl;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.stavkaPorudzbineService.getAllStavkaPorudzbine();
  }

  public openDialog(flag: number, id: number, redniBroj: number, kolicina: number, jedinicaMere: string, cena: number, porudzbina: Porudzbina, artikl: Artikl) {
    const dialog = this.dialog.open(StavkaPorudzbineDialogComponent, {data: {id: id, redniBroj: redniBroj, kolicina: kolicina, jedinicaMere: jedinicaMere, cena: cena, porudzbina: porudzbina, artikl: artikl}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

}


