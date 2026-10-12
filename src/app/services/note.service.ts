import { Injectable, computed, inject, signal } from '@angular/core';
import { Note, NoteData } from '../models/note';
import { AuthService } from './auth.service';

const NOTES_KEY = 'notepad.notes';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly auth = inject(AuthService);

  // Todas as notas de todos os usuários (como se fosse a "tabela" do banco).
  private readonly allNotes = signal<Note[]>(this.load());

  /** Somente as notas do usuário logado, da mais recente para a mais antiga. */
  readonly notes = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return [];
    return this.allNotes()
      .filter((n) => n.belongsTo(user.id))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });

  create(text: string): void {
    const user = this.auth.currentUser();
    if (!user) return;

    this.save([...this.allNotes(), Note.create(user.id, text)]);
  }

  update(id: string, text: string): void {
    const userId = this.auth.currentUser()?.id;
    this.save(
      this.allNotes().map((n) => (n.id === id && n.belongsTo(userId) ? n.edit(text) : n)),
    );
  }

  remove(id: string): void {
    const userId = this.auth.currentUser()?.id;
    this.save(this.allNotes().filter((n) => !(n.id === id && n.belongsTo(userId))));
  }

  // ---------- privados ----------

  private save(notes: Note[]): void {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    this.allNotes.set(notes);
  }

  private load(): Note[] {
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      const data = raw ? (JSON.parse(raw) as NoteData[]) : [];
      return data.map((d) => Note.fromJSON(d));
    } catch {
      return [];
    }
  }
}
