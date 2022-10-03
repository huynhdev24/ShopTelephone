import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', },
    
    orderProd: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      priceDiscount: { type: Number },
      discount: { type: String },
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
    },
    // số lượng
    numOfProd: { type: Number, required: true, default: 1 },

    // địa chỉ giao nhận
    deliveryAdd: {
      name: { type: String, required: true, trim: true, maxLength: 40, trim: true },
      phone: { type: String, required: true, trim: true, maxLength: 10, trim: true },
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

    // hình thức giao hàng
    // 0 - tiêu chuẩn, 1 - tiết kiệm, 2 - nhanh
    transportMethod: {
      type: Number,
      enum: [0, 1, 2],
      required: true,
      default: 0,
    },

    // trạng thái đơn hàng
    // 0 - Đặt hàng thành công, 1 - đã tiếp nhận đơn hàng, 2 - Chuẩn bị hàng
    // 3 - Bàn giao vận chuyển, 4 - Đang vận chuyển, 5 - Giao hàng thành công 6 - Hủy đơn hàng
    orderStatus: {
      type: Number,
      enum: [...Array(7).keys()],
      required: true,
      default: 0,
    },

    // phí vận chuyển
    transportFee: { type: Number, required: true, default: 0 },

    // ghi chú cho đơn hàng
    note: { type: String, trim: true, maxlength: 200 },

    // hình thức thanh toán
    // 0 - thanh toán tiền mặt khi nhận hàng
    // 1 - thanh toán qua VNPay
    paymentMethod: { type: Number, required: true, enum: [0, 1], default: 0 },

    // da nhan xet chua
    // true, false
    isReview: {type: Boolean, required: true, default: false,},

    isPaid: { type: Boolean, required: true, default: false, },
    paidAt: { type: Date, },

    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },

  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order












