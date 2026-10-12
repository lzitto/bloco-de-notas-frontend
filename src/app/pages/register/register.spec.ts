import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Register } from './register';

describe('Register', () => {
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('mostra os campos de e-mail, senha e confirmação', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('input[name="email"]')).toBeTruthy();
    expect(el.querySelector('input[name="password"]')).toBeTruthy();
    expect(el.querySelector('input[name="confirmPassword"]')).toBeTruthy();
  });

  it('recusa quando as senhas não conferem', async () => {
    fixture.componentInstance.email.set('a@a.com');
    fixture.componentInstance.password.set('123456');
    fixture.componentInstance.confirmPassword.set('654321');
    await fixture.componentInstance.onRegister();

    expect(fixture.componentInstance.error()).toBe('As senhas não conferem.');
    expect(localStorage.getItem('notepad.users')).toBeNull();
  });
});
