import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let auth: AuthService;
  let notes: NoteService;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
    notes = TestBed.inject(NoteService);
    await auth.register('a@a.com', '123456');
  });

  it('cria nota com UUID associada ao usuário', () => {
    notes.create('minha nota');
    const [note] = notes.notes();
    expect(note.text).toBe('minha nota');
    expect(note.userId).toBe(auth.currentUser()!.id);
    expect(note.id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('edita e exclui', () => {
    notes.create('antes');
    const id = notes.notes()[0].id;

    notes.update(id, 'depois');
    expect(notes.notes()[0].text).toBe('depois');
    expect(notes.notes()[0].updatedAt).toBeDefined();

    notes.remove(id);
    expect(notes.notes().length).toBe(0);
  });

  it('um usuário não enxerga as notas de outro', async () => {
    notes.create('do usuário A');
    auth.logout();
    await auth.register('b@b.com', '123456');
    expect(notes.notes().length).toBe(0);
  });
});
