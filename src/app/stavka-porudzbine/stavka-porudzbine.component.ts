import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  //dataSource!: Observable<StavkaPorudzbine[]>;
  dataSource!: MatTableDataSource<StavkaPorudzbine>;

  porudzbina!: Porudzbina;

  artikl!: Artikl;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  selektovanaPorudzbina!: Porudzbina;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    if (this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  public loadData(){
    //this.dataSource = this.stavkaPorudzbineService.getAllStavkeZaPorudzbinu(this.selektovanaPorudzbina.id);
    this.stavkaPorudzbineService.getAllStavkeZaPorudzbinu(this.selektovanaPorudzbina.id).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'artikl' ? currentTerm + data.artikl.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'redniBroj': return data[property];
          case 'kolicina': return data[property];
          case 'cena': return data[property];
          case 'artikl': return data.artikl.naziv.toLocaleLowerCase();
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}


