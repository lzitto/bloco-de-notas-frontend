import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes implements OnInit {
  notes: Note[] = [];
  title = '';
  content = '';

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes();
  }

  addNote() {
    if (this.title.trim() && this.content.trim()) {
      this.notes = this.noteService.addNote(this.title, this.content);
      this.title = '';
      this.content = '';
    }
  }

  deleteNote(id?: number) {
    if (id) {
      this.notes = this.noteService.deleteNote(id);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}