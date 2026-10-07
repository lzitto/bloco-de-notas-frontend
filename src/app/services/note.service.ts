import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesKey = 'bloco_notas_app_data';

  getNotes(): Note[] {
    const data = localStorage.getItem(this.notesKey);
    return data ? JSON.parse(data) : [
      { id: 1, title: 'Anotações', content: 'Bem-vindo ao seu bloco de notas !', createdAt: new Date().toLocaleDateString() }
    ];
  }

  addNote(title: string, content: string): Note[] {
    const notes = this.getNotes();
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    notes.unshift(newNote);
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
    return notes;
  }

  deleteNote(id: number): Note[] {
    let notes = this.getNotes();
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
    return notes;
  }
}