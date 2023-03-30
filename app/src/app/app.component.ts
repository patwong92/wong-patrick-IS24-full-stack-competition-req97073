import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import environment from 'src/environment';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.appService.notification$.subscribe(({ message }) => {
      this.snackBar.open(message, 'OK', {
        duration: environment.snackBarDuration,
      });
    });
  }
}
