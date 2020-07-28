import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule } from'@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import{ MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

import { UserIdleModule } from 'angular-user-idle';

import { from } from 'rxjs';
@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule,MatMenuModule,UserIdleModule.forRoot({ idle: 300, timeout: 1, ping: 1}),
        MatButtonModule,MatIconModule,MatToolbarModule,MatSnackBarModule,MatDialogModule,MatTooltipModule,
    MatCardModule],
    declarations: [AppComponent],
    providers: [BnNgIdleService],

    bootstrap: [AppComponent]
})
export class AppModule {}
