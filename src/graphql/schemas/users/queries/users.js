import UserType from '../types/user';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';
import UserFilterType from '../types/inputs/user-filter';
import { fields as paginationInterfaceFields } from '../../../core/interfaces/pagination';
import createPaginationType from '../../../core/helpers/types/pagination-type-creator';

 const controller = ControllerFactory.getController('user');


export default {
  type: createPaginationType(UserType),
  args: {
    ...paginationInterfaceFields,
    filter: { type: UserFilterType },
  },
   resolve: ({ user }, { filter, ...pagination }) => controller.getUsers(filter, pagination, user),
};
