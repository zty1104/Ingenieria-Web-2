
// product-store.service.ts
// Lightweight state store using RxJS BehaviorSubject (Angular-friendly alternative to Redux)
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

export class ProductStore {
  private api = new ApiService();
  private _products = new BehaviorSubject([]);
  products$ = this._products.asObservable();
  private loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();
  private error = new BehaviorSubject(null);
  error$ = this.error.asObservable();

  async load() {
    try {
      this.loading.next(true);
      const data = await this.api.listProducts();
      this._products.next(data);
      this.error.next(null);
    } catch (e:any) {
      this.error.next(e.message || 'Load failed');
    } finally {
      this.loading.next(false);
    }
  }

  async add(product:{name:string, price:number}) {
    try {
      this.loading.next(true);
      const created = await this.api.createProduct(product);
      const current = this._products.getValue();
      this._products.next([...current, created]);
      this.error.next(null);
      return created;
    } catch (e:any) {
      this.error.next(e.message || 'Create failed');
      throw e;
    } finally {
      this.loading.next(false);
    }
  }

  async remove(id:number) {
    try {
      this.loading.next(true);
      await this.api.deleteProduct(id);
      const current = this._products.getValue();
      this._products.next(current.filter((p:any)=>p.id !== id));
      this.error.next(null);
    } catch (e:any) {
      this.error.next(e.message || 'Delete failed');
      throw e;
    } finally {
      this.loading.next(false);
    }
  }
}
