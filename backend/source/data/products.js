const products = [

    {
        name        : 'iPhone 11 Pro 256GB Memory',
        price       : 20000000,
        brand       : 'Apple',
        image       : '/images/phone.jpg',
        countInStock: 10,
        priceDiscount: 18000000,
     
        description : 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
       
        chipset     : 'Apple A13 Bionic',
        operating   : 'iOS 15',
        rom         : 64,
        ram         : 4, 
        color       : 'xanh',
        cameraTruoc: '12 MP',
        cameraSau  : '2 camera 12 MP',
        manHinh    : 'IPS LCD6.1"Liquid Retina',
        pin         : '3110 mAh'      
        
    },

    {
        name        : 'Điện Thoại Samsung Galaxy Note 20 (8GB/256GB) - Hàng Chính Hãng',
        price       : 23990000,
        brand       : 'Samsung',
        image       : 'https://salt.tikicdn.com/cache/400x400/ts/product/25/bb/61/3761c7ab7a73a7636e752756923aed66.jpg.webp',
        countInStock: 10,
        priceDiscount: 15990000,
     
        description : 'Galaxy Note 20 mẫu flagship được Samsung cho ra mắt vào giữa tháng 8/2020. Chiếc smartphone đã gây ấn tượng mạnh mẽ và được nhiều người trông chờ nhất đã xuất hiện hứa hẹn mang lại trải nghiệm ấn tượng.Ngôn ngữ thiết kế đơn giản mà sang trọng\nNhìn chung thì chiếc Note 20 này vẫn mang thiết kế đơn giản nhưng rất sang trọng khi cầm trên tay. Khung máy gia cố bằng kim loại và mặt lưng nhựa nhám hạn chế việc bám dấu vân tay cũng như dễ dàng vệ sinh hơn khi dính bẩn.',
       
        chipset     : '	Exynos 990 8 nhân',
        operating   : 'Android 10.0',
        rom         : 256,
        ram         : 8, 
        color       : 'xanh',
        cameraTruoc: '10 MP',
        cameraSau  : 'Chính 12 MP & Phụ 64 MP, 12 MP',
        manHinh    : 'Super AMOLED Plus',
        pin         : '4300 mAh'      
        
    },

    {
        name        : 'Xiaomi 11T 8GB - 128GB',
        price       : 10990000,
        brand       : 'Xiaomi',
        image       : 'https://images.fpt.shop/unsafe/fit-in/960x640/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2021/10/18/637701610269155220_XIAOMI-MI11T-10.jpg',
        countInStock: 10,
        priceDiscount: 9990000,
     
        description : 'Xiaomi 11T sẽ biến mỗi khoảnh khắc thường ngày của bạn thành những thước phim điện ảnh sống động với trải nghiệm camera 108MP đỉnh cao. Hơn nữa, Xiaomi 11T còn là một cỗ máy đầy tốc độ dưới vẻ ngoài của kiệt tác thời trang',
       
        chipset     : 'MediaTek Dimensity 1200U',
        operating   : 'Android 11',
        rom         : 128,
        ram         : 8, 
        color       : 'xanh',
        cameraTruoc: '16 MP',
        cameraSau  : '108.0 MP + 8.0 MP + 5.0 MP',
        manHinh    : '6.67", FHD+, AMOLED DotDisplay, 1080 x 2400 Pixel',
        pin         : '4500 mAh'      
        
    },
    {
        name        : 'iPhone XR 128GB',
        price       : 17490000,
        brand       : 'Apple',
        image       : 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-do-1-1-org.jpg',
        countInStock: 10,
        priceDiscount: 15490000,
     
        description : 'Được xem là phiên bản iPhone giá rẻ đầy hoàn hảo, iPhone Xr 128GB khiến người dùng có nhiều sự lựa chọn hơn về màu sắc đa dạng nhưng vẫn sở hữu cấu hình mạnh mẽ và thiết kế sang trọng',
       
        chipset     : 'Apple A12 Bionic',
        operating   : 'iOS 15',
        rom         : 128,
        ram         : 3, 
        color       : 'đỏ',
        cameraTruoc: '7 MP',
        cameraSau  : '12 MP',
        manHinh    : 'IPS LCD6.1"Liquid Retina',
        pin         : '2942 mAh'      
        
    },
    {
        name        : 'Samsung Galaxy Z Fold3 5G 512GB',
        price       : 44990000,
        brand       : 'Samsung',
        image       : 'https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg',
        countInStock: 2,
        priceDiscount: 42990000,
     
        description : 'Galaxy Z Fold3 5G đánh dấu bước tiến mới của Samsung trong phân khúc điện thoại gập cao cấp khi được cải tiến về độ bền cùng những nâng cấp đáng giá về cấu hình hiệu năng, hứa hẹn sẽ mang đến trải nghiệm sử dụng đột phá cho người dùng',
       
        chipset     : 'Snapdragon 888',
        operating   : 'Android 11',
        rom         : 512,
        ram         : 12, 
        color       : 'đỏ',
        cameraTruoc: '10 MP & 4 MP',
        cameraSau  : '3 camera 12 MP',
        manHinh    : 'IPS LCD6.1"Liquid Retina',
        pin         : '4400 mAh'      
        
    },
    {
        name        : 'Samsung Galaxy 1',
        price       : 20500000,
        brand       : 'Samsung',
        image       : 'https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg',
        countInStock: 1,
        priceDiscount: 15500000,
     
        description : 'Galaxy 1 đánh dấu bước tiến mới của Samsung trong phân khúc điện thoại gập cao cấp khi được cải tiến về độ bền cùng những nâng cấp đáng giá về cấu hình hiệu năng, hứa hẹn sẽ mang đến trải nghiệm sử dụng đột phá cho người dùng',
       
        chipset     : 'Snapdragon 2',
        operating   : 'Android 10',
        rom         : 128,
        ram         : 8, 
        color       : 'xanh',
        cameraTruoc: '10 MP',
        cameraSau  : '12 MP',
        manHinh    : 'IPS LCD6.1"Liquid Retina',
        pin         : '3000 mAh'      
        
    },
]

export default products