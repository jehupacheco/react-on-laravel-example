import { Record } from 'immutable';

const Product = new Record({
  id: '',
  name: '',
  description: '',
  price: 0,
  images: [],
  selected: false,
  rowId: '',
});

export default Product;
