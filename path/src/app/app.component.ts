import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    window.addEventListener('keydown', function(event) {
      if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
          event.preventDefault();
      }
    });
  }
}
