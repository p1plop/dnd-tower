import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {
  form: FormGroup;
  image: File;

  constructor(
    public dialogRef: MatDialogRef<CreateCharacterComponent>,
    private characterService: CharactersService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  formSubmit() {
    const name = this.form.get('name').value;
    this.characterService.createNewCharacter(name, this.image);
    this.dialogRef.close();
  }

  deleteImage() {
    this.image = null;
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

}
