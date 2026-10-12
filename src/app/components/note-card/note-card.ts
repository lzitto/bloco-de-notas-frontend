import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-card',
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
})
export class NoteCard {
  // Pai -> Filho: o dado chega via signal input (obrigatório).
  note = input.required<Note>();

  // Filho -> Pai: eventos emitidos com output().
  editClick = output<Note>();
  deleteClick = output<Note>();
}
