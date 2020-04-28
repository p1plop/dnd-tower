import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {
  image: File;

  constructor(public dialogRef: MatDialogRef<AvatarUploadComponent>) { }

  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close(this.image);
  }

  deleteImage() {
    this.image = null;
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

}
