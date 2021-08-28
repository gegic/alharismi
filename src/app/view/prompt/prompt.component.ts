import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  group: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.group = this.formBuilder.group({
      typed: ['']
    });
  }

  close(): void {
    const typed = this.group.get('typed').value;
    this.group.get('typed').reset('');

    this.ref.close(typed);
  }

}
