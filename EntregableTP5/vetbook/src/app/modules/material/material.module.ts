import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatCardModule,
      MatDividerModule,
      ReactiveFormsModule,
      MatOptionModule,
      MatSelectModule,
  ]
})
export class MaterialModule { }
