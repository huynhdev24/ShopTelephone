import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    userId        : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, {
    timestamps: true
})

// define Schema
const productSchema = mongoose.Schema(
    {
        // admin tao ra san pham co quyen xem them sua xoa
        user        : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        name        : { type: String, required: true, trim: true },
        price       : { type: Number, required: true, default: 0 },
        brand       : { type: String, required: true, lowercase: true, trim: true  },
        image       : { type: String, required: true, trim: true },
        // số lượng sản phẩm tồn kho
        countInStock: { type: Number, required: true, default: 0 },
        // mức độ khuyến mãi
        priceDiscount: { type: Number},
        // đánh giá 1 - 5 sao, tương ứng với index element từ 0 - 4
        rate        : {type: [Number], default: [0, 0, 0, 0, 0], },
        // mô tả sản phẩm
        description : { type: String, required: true },
       
        chipset     : { type: String, required: true, trim: true },       
        rom         : { type: Number, required: true },
        ram         : { type: Number, required: true }, 
        color       : { type: String, trim: true },
        operating   : { type: String, trim: true },
        cameraTruoc : { type: String, trim: true },
        cameraSau   : { type: String, trim: true },
        manHinh     : { type: String, trim: true },
        pin         : { type: String, trim: true },
        
        // các thông tin khác kèm theo, lưu với dạng {key: value}
        // vd: {key: 'ưu đãi kèm theo', value: 'Một con chuột không dây'}
        otherInfo   : {
            type: Array,
            key: { type: String, trim: true },
            value: { type: String, trim: true },
            default: [],
        },
        // rating trung binh
        rating      : { type: Number, required: true, default: 0 },
        // số lượng review
        numReviews  : { type: Number, required: true, default: 0 },
        // mảng
        reviews     : [reviewSchema],
    },
    {
        timestamps: true
    }
)

//create Model
const Product = mongoose.model('Product', productSchema)
// export
export default Product