import { asyncWrapper } from '../../../utils/wrapper';
import CustomerService from './customer.service';

export default class CustomerController {
  private service: CustomerService;
  constructor() {
    this.service = new CustomerService();
  }
  addNewCustomer = asyncWrapper(async (req, res) => {
    const data = await this.service.addCustomer(req.body, req.userId);
    return res.json({ message: 'Customer added successfully', data });
  });
}
