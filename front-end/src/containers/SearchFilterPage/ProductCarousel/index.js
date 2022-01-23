import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai_103211774.jpg',
  'https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai-iphone_103211414.png',
  'https://www.viettablet.com/images/promo/47/tra-gop-0_-lai-suot-trong-3-thang-mobi-banner-viettablet.jpg',
];

function ProductCarousel() {
  return (
    <Carousel className="Product-Carousel m-tb-24 bor-rad-8" autoplay>
      {list.map((item, index) => (
        <img
          className="Product-Carousel-img bor-rad-8"
          src={item}
          key={index}
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
