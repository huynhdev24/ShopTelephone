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
        name        : { type: String, required: true },
        price       : { type: Number, required: true, default: 0 },
        brand       : { type: String, required: true },
        image       : { type: String, required: true },
        // số lượng sản phẩm tồn kho
        countInStock: { type: Number, required: true, default: 0, },
        // mức độ khuyến mãi
        discount    : { type: Number},
        // đánh giá 1 - 5 sao, tương ứng với index element từ 0 - 4
        rate        : {type: [Number], default: [0, 0, 0, 0, 0], },
        // mô tả sản phẩm
        description : { type: String, required: true },
       
        cpu         : { type: String, trim: true },
        cameras_before    : { type: String, trim: true },
        camera_after : { type: String, trim: true },
        color       : { type: String, trim: true },
        displaySize : { type: String, trim: true },
        operating   : { type: Number, enum: [0, 1], required: true, default: 0 },
        rom         : { type: Number, required: true },
        ram         : { type: Number, required: true },    
        
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