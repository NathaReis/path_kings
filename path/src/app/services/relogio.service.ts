import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelogioService {
  private relogios: { [key: number]: string } = {
    1: '00:00:00',
    2: '00:00:00',
    3: '00:00:00'
  };

  setRelogio(id: 1 | 2| 3, valor: string): void {
    this.relogios[id] = valor;
  }

  getRelogio(id: 1 | 2| 3): string {
    return this.relogios[id];
  }

  getAllRelogios(): { [key: number]: string } {
    return { ...this.relogios }; // Retorna uma cópia para evitar modificações não intencionais
  }
}
