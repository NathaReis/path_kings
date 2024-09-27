import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelogioService {
  private relogios: { [key: number]: string } = { };

  setRelogio(id: number, valor: string): void {
    this.relogios[id] = valor;
  }

  getRelogio(id: number): string {
    return this.relogios[id];
  }

  getAllRelogios(): { [key: number]: string } {
    return { ...this.relogios }; // Retorna uma cópia para evitar modificações não intencionais
  }
}
