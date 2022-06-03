import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  dataSource!: Observable<Artikl[]>;

  constructor(public artiklService: ArtiklService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.artiklService.getAllArtikl();
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


}
