import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { PorudzbinaDialogComponent } from '../dialog/porudzbina-dialog/porudzbina-dialog.component';
import { Porudzbina } from '../model/porudzbina.model';
import { PorudzbinaService } from '../service/porudzbina.service';
import { Dobavljac } from './../model/dobavljac.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {

  displayedColumns = ['id', 'datum', 'isporuceno', 'iznos', 'placeno', 'dobavljac', 'actions'];

  today: Date = new Date();

  dobavljac!: Dobavljac;

  //dataSource!: Observable<Porudzbina[]>;
  dataSource!: MatTableDataSource<Porudzbina>;

  selektovanaPorudzbina!: Porudzbina;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public porudzbinaService: PorudzbinaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.porudzbinaService.getAllPorudzbina();
    this.porudzbinaService.getAllPorudzbina().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'dobavljac' ? currentTerm + data.dobavljac.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'iznos': return data[property];
          case 'placeno': return data[property];
          case 'dobavljac': return data.dobavljac.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, id: number, datum: Date, isporuceno: Date, iznos: number, placeno: boolean, dobavljac: Dobavljac) {
    const dialog = this.dialog.open(PorudzbinaDialogComponent, {data: {id: id, datum: datum, isporuceno: isporuceno, iznos: iznos, placeno: placeno, dobavljac: dobavljac}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Porudzbina): void {
    this.selektovanaPorudzbina = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
