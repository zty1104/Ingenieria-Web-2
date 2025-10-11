
// api.service.ts
// Simple fetch-based API client that targets the mock API at http://localhost:3001
export class ApiService {
  base = (window as any).__API_BASE__ || 'http://localhost:3001/api';

  async listProducts() {
    const res = await fetch(`${this.base}/products`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
  }

  async getProduct(id: number) {
    const res = await fetch(`${this.base}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  }

  async createProduct(payload: {name: string, price: number}) {
    const res = await fetch(`${this.base}/products`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({error:'unknown'}));
      throw new Error(err.error || 'Create failed');
    }
    return res.json();
  }

  async deleteProduct(id: number) {
    const res = await fetch(`${this.base}/products/${id}`, { method: 'DELETE' });
    if (res.status === 204) return true;
    const err = await res.json().catch(()=>({error:'unknown'}));
    throw new Error(err.error || 'Delete failed');
  }
}
