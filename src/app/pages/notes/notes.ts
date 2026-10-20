import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoteCard } from '../../components/note-card/note-card';
import { NoteForm } from '../../components/note-form/note-form';
import { Note } from '../../models/note';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-notes',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NoteForm,
    NoteCard,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnInit {
  private auth = inject(AuthService);
  private noteService = inject(NoteService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly user = this.auth.currentUser;
  readonly notes = this.noteService.notes;
  readonly editing = signal<Note | null>(null);

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  onSave(text: string): void {
    const current = this.editing();
    if (current) {
      this.noteService.update(current.id, text);
      this.editing.set(null);
      this.notify('Nota atualizada');
    } else {
      this.noteService.create(text);
      this.notify('Nota adicionada');
    }
  }

  onEdit(note: Note): void {
    this.editing.set(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(note: Note): void {
    if (!confirm('Excluir esta nota?')) return;
    this.noteService.remove(note.id);
    if (this.editing()?.id === note.id) {
      this.editing.set(null);
    }
    this.notify('Nota excluída');
  }

  async logout(): Promise<void> {
    this.auth.logout();
    await this.router.navigate(['/login']);
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 2500 });
  }
}