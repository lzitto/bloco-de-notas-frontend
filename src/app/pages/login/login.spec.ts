import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('mostra os campos de e-mail e senha', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('input[name="email"]')).toBeTruthy();
    expect(el.querySelector('input[name="password"]')).toBeTruthy();
  });

  it('mantém o botão Entrar desabilitado com o formulário vazio', async () => {
    // O ngModel registra os campos de forma assíncrona; renderiza de novo para refletir a validação.
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true);
  });

  it('mostra erro ao tentar entrar com usuário inexistente', async () => {
    fixture.componentInstance.email.set('naoexiste@a.com');
    fixture.componentInstance.password.set('123456');
    await fixture.componentInstance.onLogin();
    fixture.detectChanges();

    expect(fixture.componentInstance.error()).toBe('E-mail ou senha inválidos.');
    expect(fixture.nativeElement.querySelector('.auth-error')).toBeTruthy();
  });
});

describe('Login com usuário logado', () => {
  it('manda para as notas', async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    await TestBed.inject(AuthService).register('a@a.com', '123456');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();

    expect(navigate).toHaveBeenCalledWith(['/notes'], { replaceUrl: true });
  });
});