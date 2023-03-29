import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isShowQuestion: boolean = false;
  form: FormArray<FormGroup> = new FormArray<FormGroup>([]);
  formBuilder: FormGroup = new FormGroup({
    questionType: new FormControl(0),
    questionName: new FormControl(),
    isRequire: new FormControl(false),
    isOther: new FormControl(false),
  });
  options = new FormArray([new FormControl(), new FormControl()]);
  isShowForm: boolean = false;
  dropdownOptions = [
    { label: 'Paragraph', value: '0' },
    { label: 'Checkbox List', value: '1' },
  ];

  constructor(private router: Router) {
    this.formBuilder.controls['questionType'].setValue(this.dropdownOptions[0]);
    localStorage.clear();
  }

  openDialog() {
    this.isShowQuestion = !this.isShowQuestion;
  }

  addOption() {
    this.options.push(new FormControl(''));
  }

  submit() {
    console.log(this.options.value);
    const newForm: FormGroup<any> = new FormGroup({});
    newForm?.addControl(
      'questionName',
      new FormControl(this.formBuilder.value['questionName'])
    );
    newForm?.addControl(
      'questionType',
      new FormControl(this.formBuilder.value['questionType'].value)
    );

    if (this.formBuilder.value['questionType'].value == 1) {
      newForm.addControl('options', new FormControl([]));
      newForm.addControl(
        'optionValues',
        new FormControl(
          this.options.value.map((x) => ({
            label: x,
            value: x,
          }))
        )
      );

      if (this.formBuilder.value['isOther'][0]) {
        newForm?.addControl('other', new FormControl(''));
        newForm?.addControl('isOther', new FormControl(true));
      }
    } else {
      newForm?.addControl('value', new FormControl(null));
    }

    newForm.addControl(
      'isRequire',
      new FormControl(this.formBuilder.value['isRequire'][0])
    );

    this.form.push(newForm);
    this.formBuilder.reset();
    this.options.reset();
    this.isShowQuestion = !this.isShowQuestion;

    this.isShowForm = true;
  }

  reviewData() {
    let flag = true;

    for (let form of this.form.value) {
      if (form.isRequire && !form?.value && !form?.options?.length) {
        flag = false;
        break;
      }
    }

    if (flag) {
      localStorage.setItem('data', JSON.stringify(this.form.value));
      this.router.navigateByUrl('/form/answers');
    } else {
      alert('some field is required!');
    }
  }
}
