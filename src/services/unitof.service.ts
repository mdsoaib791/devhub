import { iocContainer } from '@/ioc/container.ioc';

import { injectable } from 'inversify';
import IDeveloperService from './interfaces/ideveloper.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IOCTYPES } from '@/ioc/types.ioc';

@injectable()
export default class UnitOfService implements IUnitOfService {
  public DeveloperService: IDeveloperService;
  constructor(
    developerService = iocContainer.get<IDeveloperService>(IOCTYPES.IDeveloperService),
  ) {
    this.DeveloperService = developerService;
  }
}
