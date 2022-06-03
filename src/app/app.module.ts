import { ArtiklService } from './service/artikl.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { ArtiklComponent } from './artikl/artikl.component';
import { PorudzbinaComponent } from './porudzbina/porudzbina.component';
import { StavkaPorudzbineComponent } from './stavka-porudzbine/stavka-porudzbine.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArtiklDialogComponent } from './dialog/artikl-dialog/artikl-dialog.component';
import { DobavljacComponent } from './dobavljac/dobavljac.component';
import { DobavljacDialogComponent } from './dialog/dobavljac-dialog/dobavljac-dialog.component';
import { DobavljacService } from './service/dobavljac.service';
import { PorudzbinaDialogComponent } from './dialog/porudzbina-dialog/porudzbina-dialog.component';
import { PorudzbinaService } from './service/porudzbina.service';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { StavkaPorudzbineService } from './service/stavka-porudzbine.service';
import { StavkaPorudzbineDialogComponent } from './dialog/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';

const Routes = [{path: 'artikl', component: ArtiklComponent},
                {path: 'dobavljac', component: DobavljacComponent},
                {path: 'porudzbina', component: PorudzbinaComponent},
                {path: 'stavkaPorudzbine', component: StavkaPorudzbineComponent},
                {path: 'home', component: HomeComponent},
                {path: 'author', component: AuthorComponent},
                {path: 'about', component: AboutComponent},
                {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    ArtiklComponent,
    PorudzbinaComponent,
    StavkaPorudzbineComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    DobavljacComponent,
    ArtiklDialogComponent,
    DobavljacDialogComponent,
    PorudzbinaDialogComponent,
    StavkaPorudzbineDialogComponent
  ],
  imports: [
  BrowserModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, ArtiklService, DobavljacService, PorudzbinaService, StavkaPorudzbineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
