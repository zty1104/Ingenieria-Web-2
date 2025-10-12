import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  constructor(private api: ApiService) {}

  private _products = new BehaviorSubject<Product[]>([]);
  products$ = this._products.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private error = new BehaviorSubject<string | null>(null);
  error$ = this.error.asObservable();

  async load() {
    try {
      this.loading.next(true);
      const data = await this.api.listProducts();
      this._products.next(data);
      this.error.next(null);
    } catch (e: any) {
      this.error.next(e.message || 'Load failed');
    } finally {
      this.loading.next(false);
    }
  }

  async add(product: { name: string; price: number }) {
    try {
      this.loading.next(true);
      const created: Product = await this.api.createProduct(product);
      const current = this._products.getValue();
      this._products.next([...current, created]);
      this.error.next(null);
      return created;
    } catch (e: any) {
      this.error.next(e.message || 'Create failed');
      throw e;
    } finally {
      this.loading.next(false);
    }
  }

  async remove(id: number) {
    try {
      this.loading.next(true);
      await this.api.deleteProduct(id);
      const current = this._products.getValue();
      this._products.next(current.filter((p) => p.id !== id));
      this.error.next(null);
    } catch (e: any) {
      this.error.next(e.message || 'Delete failed');
      throw e;
    } finally {
      this.loading.next(false);
    }
  }
}
