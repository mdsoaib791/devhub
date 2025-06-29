import { Container } from 'inversify';
import 'reflect-metadata';
import { IOCTYPES } from './types.ioc';

import IBlogService from '@/services/interfaces/iblog.service';
import ICommentService from '@/services/interfaces/icomment.service';
import IDeveloperService from '@/services/interfaces/ideveloper.service';
import IUnitOfService from '@/services/interfaces/iunitof.service';

import BlogService from '@/services/blog.service';
import CommentService from '@/services/comment.service';
import DeveloperService from '@/services/developer.service';
import UnitOfService from '@/services/unitof.service';

const iocContainer = new Container();
iocContainer.bind<IUnitOfService>(IOCTYPES.IUnitOfService).to(UnitOfService);
iocContainer.bind<IDeveloperService>(IOCTYPES.IDeveloperService).to(DeveloperService);
iocContainer.bind<IBlogService>(IOCTYPES.IBlogService).to(BlogService);
iocContainer.bind<ICommentService>(IOCTYPES.ICommentService).to(CommentService);

export { iocContainer };

