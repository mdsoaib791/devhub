
export default interface IDeveloperService {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  add(model: any): Promise<any>;
  update(id: string, model: any): Promise<any>;
  delete(id: string): Promise<any>;
}
