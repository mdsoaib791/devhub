import 'reflect-metadata';

import { Container } from 'inversify';
import { IOCTYPES } from './types.ioc';


import DeveloperService from '@/services/developer.service';

import IDeveloperService from '@/services/interfaces/ideveloper.service';
import IUnitOfService from '@/services/interfaces/iunitof.service';
import UnitOfService from '@/services/unitof.service';


const iocContainer = new Container();
iocContainer.bind<IDeveloperService>(IOCTYPES.IDeveloperService).to(DeveloperService);
iocContainer.bind<IUnitOfService>(IOCTYPES.IUnitOfService).to(UnitOfService);


// Add more bindings here...

export { iocContainer };

