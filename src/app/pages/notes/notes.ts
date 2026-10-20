import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatSnackBarModule,
    NoteForm,
    NoteCard,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private noteService = inject(NoteService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private titleService = inject(Title);

  readonly user = this.auth.currentUser;
  readonly notes = this.noteService.notes;
  readonly editing = signal<Note | null>(null);

  // Ciclo de vida: roda uma vez, quando o componente é criado.
  ngOnInit(): void {
    this.titleService.setTitle('Minhas notas · Journey Onwards');

    // Sem guard: a própria tela confere se há alguém logado.
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // Ciclo de vida: roda quando o componente é destruído (saiu da rota).
  ngOnDestroy(): void {
    this.titleService.setTitle('Journey Onwards - Bloco de Notas');
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
