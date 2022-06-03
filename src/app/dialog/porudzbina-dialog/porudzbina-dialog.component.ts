import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/model/dobavljac.model';
import { Porudzbina } from 'src/app/model/porudzbina.model';
import { DobavljacService } from 'src/app/service/dobavljac.service';
import { PorudzbinaService } from 'src/app/service/porudzbina.service';



@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  public flag!: number;

  dobavljaci!: Dobavljac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Porudzbina,
    public porudzbinaService: PorudzbinaService,
    public dobavljacService: DobavljacService ) { }

  ngOnInit(): void {
      this.dobavljacService.getAllDobavljac().subscribe(dobavljaci =>
      this.dobavljaci = dobavljaci)
  }

  public add(): void {
    this.porudzbinaService.addPorudzbina(this.data);
    this.snackBar.open('Uspešno dodata porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.porudzbinaService.updatePorudzbina(this.data);
    this.snackBar.open('Uspešno izmenjena porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.id);
    this.snackBar.open('Uspešno obrisana porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

}
