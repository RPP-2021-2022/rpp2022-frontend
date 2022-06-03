import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/model/dobavljac.model';
import { DobavljacService } from 'src/app/service/dobavljac.service';


@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Dobavljac,
    public dobavljacService: DobavljacService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.dobavljacService.addDobavljac(this.data);
    this.snackBar.open('Uspešno dodat dobavljač ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.dobavljacService.updateDobavljac(this.data);
    this.snackBar.open('Uspešno izmenjen dobavljač ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.dobavljacService.deleteDobavljac(this.data.id);
    this.snackBar.open('Uspešno obrisan dobavljač ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

}
