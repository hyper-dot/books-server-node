import {
  TCustomerSchema,
  customerSchema,
} from '../../../schema/customer.schema';
import { BadRequestError } from '../../../utils/exceptions';
import CustomerModel from './customer.model';

export default class CustomerService {
  async getAllCustomers(user: string) {
    return await CustomerModel.find({ user }).select('-user');
  }

  async addCustomer(payload: TCustomerSchema, user: string) {
    const { data, success } = customerSchema.safeParse(payload);
    if (!success) throw new BadRequestError('Invalid customer data');
    const customer = await CustomerModel.create({ ...data, user });
    return customer;
  }
}
