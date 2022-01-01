import mongoose from "mongoose"

const deliveryAddressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', },
  list: {
    type: Array,
    // tên người nhận
    name: { type: String, required: true, trim: true, maxLength: 40 },
    phone: { type: String, required: true, trim: true, maxLength: 10 },
    // địa chỉ
    address: {
      type: Object,
      required: true,
      province: String,
      district: String,
      wards: String,
      details: { type: String, default: '' },
    },
  },
});

//create Model
const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

export default DeliveryAddress

