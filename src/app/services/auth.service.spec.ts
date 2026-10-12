import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('cadastra e já deixa o usuário logado', async () => {
    await service.register('Teste@Email.com', '123456');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser()?.email).toBe('teste@email.com');
  });

  it('não permite e-mail duplicado', async () => {
    await service.register('a@a.com', '123456');
    await expect(service.register('a@a.com', '654321')).rejects.toThrow('já está cadastrado');
  });

  it('rejeita senha errada e aceita a certa', async () => {
    await service.register('a@a.com', '123456');
    service.logout();
    await expect(service.login('a@a.com', 'errada')).rejects.toThrow('inválidos');
    await service.login('a@a.com', '123456');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('não guarda a senha em texto puro', async () => {
    await service.register('a@a.com', '123456');
    expect(localStorage.getItem('notepad.users')).not.toContain('123456');
  });
});
