import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss'],
})
export class FormAnswerComponent {
  formData: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    if (localStorage.getItem('data')) {
      this.formData = JSON.parse(localStorage.getItem('data') || '[]');
    }
  }

  backtoForm() {
    this.router.navigateByUrl('/form/builder');
  }
}
