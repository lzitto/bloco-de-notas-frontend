import { Component, effect, ElementRef, input, linkedSignal, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
  // Nota em edição. null = criando uma nota nova.
  note = input<Note | null>(null);

  saved = output<string>();
  cancelled = output<void>();

  // Signal gravável que se reinicia sozinho quando "note" muda:
  // editando -> começa com o texto da nota; criando -> começa vazio.
  text = linkedSignal(() => this.note()?.text ?? '');

  // Equivalente Angular de document.querySelector('#field'):
  // pega o elemento marcado com #field no template.
  private field = viewChild<ElementRef<HTMLTextAreaElement>>('field');

  constructor() {
    // Ao começar a editar uma nota, joga o cursor no campo.
    effect(() => {
      if (this.note()) {
        this.field()?.nativeElement.focus();
      }
    });
  }

  submit(): void {
    const value = this.text().trim();
    if (!value) return;

    this.saved.emit(value);
    this.text.set('');
  }
}
