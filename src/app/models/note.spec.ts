import { Note } from './note';

describe('Note', () => {
  it('create gera UUID, remove espaços e não nasce editada', () => {
    const note = Note.create('user-1', '  olá  ');
    expect(note.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(note.text).toBe('olá');
    expect(note.userId).toBe('user-1');
    expect(note.isEdited()).toBe(false);
  });

  it('edit devolve uma nova instância e não altera a original', () => {
    const original = Note.create('user-1', 'antes');
    const edited = original.edit('depois');

    expect(edited).not.toBe(original);
    expect(edited.id).toBe(original.id);
    expect(edited.createdAt).toBe(original.createdAt);
    expect(edited.text).toBe('depois');
    expect(edited.isEdited()).toBe(true);
    expect(original.text).toBe('antes');
    expect(original.isEdited()).toBe(false);
  });

  it('belongsTo só aceita o dono', () => {
    const note = Note.create('user-1', 'x');
    expect(note.belongsTo('user-1')).toBe(true);
    expect(note.belongsTo('user-2')).toBe(false);
    expect(note.belongsTo(undefined)).toBe(false);
  });

  it('fromJSON reconstrói a classe com seus métodos (ida e volta pelo JSON)', () => {
    const note = Note.create('user-1', 'texto').edit('texto 2');
    const restored = Note.fromJSON(JSON.parse(JSON.stringify(note)));

    expect(restored).toBeInstanceOf(Note);
    expect(restored.text).toBe('texto 2');
    expect(restored.isEdited()).toBe(true);
  });
});
