
export default interface IDeveloperService {
  getAll(): Promise<any>;
  getById(id: number): Promise<any>;
  add(model: any): Promise<any>;
  update(id: number, model: any): Promise<any>;
  // delete(id: number): Promise<any>;
}
