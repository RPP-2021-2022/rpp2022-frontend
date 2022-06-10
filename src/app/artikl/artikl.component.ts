import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { ArtiklDialogComponent } from '../dialog/artikl-dialog/artikl-dialog.component';
import { Artikl } from '../model/artikl.model';
import { ArtiklService } from '../service/artikl.service';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];

  //dataSource!: Observable<Artikl[]>;
  dataSource!: MatTableDataSource<Artikl>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public artiklService: ArtiklService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.artiklService.getAllArtikl();
    this.artiklService.getAllArtikl().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, proizvodjac: string) {
    const dialog = this.dialog.open(ArtiklDialogComponent, {data: {id: id, naziv: naziv, proizvodjac: proizvodjac}});
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
