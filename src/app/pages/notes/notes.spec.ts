import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';
import { Notes } from './notes';

describe('Notes', () => {
  let fixture: ComponentFixture<Notes>;
  let notes: NoteService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Notes],
      providers: [provideRouter([])],
    }).compileComponents();

    await TestBed.inject(AuthService).register('a@a.com', '123456');
    notes = TestBed.inject(NoteService);

    fixture = TestBed.createComponent(Notes);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('mostra o estado vazio quando o usuário não tem notas', () => {
    expect(fixture.nativeElement.querySelector('.empty')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('app-note-card').length).toBe(0);
  });

  it('salva uma nota nova e exibe o card', () => {
    fixture.componentInstance.onSave('primeira nota');
    fixture.detectChanges();

    expect(notes.notes().length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('app-note-card').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('primeira nota');
  });

  it('edita uma nota existente', () => {
    fixture.componentInstance.onSave('antes');
    const created = notes.notes()[0];

    fixture.componentInstance.onEdit(created);
    fixture.componentInstance.onSave('depois');
    fixture.detectChanges();

    expect(notes.notes().length).toBe(1);
    expect(notes.notes()[0].text).toBe('depois');
    expect(fixture.componentInstance.editing()).toBeNull();
  });
});

describe('Notes sem usuário logado', () => {
  it('manda para a tela de login', async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Notes],
      providers: [provideRouter([])],
    }).compileComponents();

    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    const fixture = TestBed.createComponent(Notes);
    fixture.detectChanges();

    expect(navigate).toHaveBeenCalledWith(['/login'], { replaceUrl: true });
  });
});
