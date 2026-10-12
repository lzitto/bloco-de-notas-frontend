/** Formato "cru" da nota, como ela é gravada no localStorage (JSON). */
export interface NoteData {
  id: string; // UUID
  userId: string; // UUID do dono da nota
  text: string;
  createdAt: string; // ISO 8601
  updatedAt?: string; // preenchido quando a nota é editada
}

/**
 * Nota do usuário.
 * É imutável: para "mudar" uma nota, edit() devolve uma nova instância.
 * Isso permite que os signals do Angular percebam a mudança.
 */
export class Note implements NoteData {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly text: string,
    readonly createdAt: string,
    readonly updatedAt?: string,
  ) {}

  /** Cria uma nota nova (com UUID) para o usuário informado. */
  static create(userId: string, text: string): Note {
    return new Note(crypto.randomUUID(), userId, text.trim(), new Date().toISOString());
  }

  /** Reconstrói uma nota a partir do JSON salvo (JSON.parse não devolve métodos). */
  static fromJSON(data: NoteData): Note {
    return new Note(data.id, data.userId, data.text, data.createdAt, data.updatedAt);
  }

  /** Devolve uma nova nota com o texto alterado, mantendo id, dono e data de criação. */
  edit(text: string): Note {
    return new Note(this.id, this.userId, text.trim(), this.createdAt, new Date().toISOString());
  }

  isEdited(): boolean {
    return this.updatedAt !== undefined;
  }

  belongsTo(userId: string | undefined): boolean {
    return userId !== undefined && this.userId === userId;
  }
}
