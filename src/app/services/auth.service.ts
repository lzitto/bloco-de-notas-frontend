import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user';
import { sha256 } from '../utils/hash';

const USERS_KEY = 'notepad.users';
const SESSION_KEY = 'notepad.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(this.restoreSession());

  /** Usuário logado (ou null). Somente leitura para quem consome. */
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  async register(email: string, password: string): Promise<void> {
    const normalized = this.normalizeEmail(email);
    const users = this.loadUsers();

    if (users.some((u) => u.email === normalized)) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const user: User = {
      id: crypto.randomUUID(),
      email: normalized,
      passwordHash: await sha256(password),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    this.startSession(user);
  }

  async login(email: string, password: string): Promise<void> {
    const normalized = this.normalizeEmail(email);
    const hash = await sha256(password);
    const user = this.loadUsers().find((u) => u.email === normalized && u.passwordHash === hash);

    if (!user) {
      throw new Error('E-mail ou senha inválidos.');
    }
    this.startSession(user);
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this._currentUser.set(null);
  }

  // ---------- privados ----------

  private startSession(user: User): void {
    localStorage.setItem(SESSION_KEY, user.id);
    this._currentUser.set(user);
  }

  private restoreSession(): User | null {
    const userId = localStorage.getItem(SESSION_KEY);
    if (!userId) return null;
    return this.loadUsers().find((u) => u.id === userId) ?? null;
  }

  private loadUsers(): User[] {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
