import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai-dep_103211368.jpg',
  'https://i.ytimg.com/vi/vMVwdSp489E/maxresdefault.jpg',
  'https://thietkehaithanh.com/wp-content/uploads/2019/06/huong-dan-thiet-ke-banner-dien-thoai-bang-photoshop.jpg',
  'https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai_103211774.jpg',
  'https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-gioi-thieu-san-pham_103215430.jpg',
  'https://i.pinimg.com/originals/ca/e7/2c/cae72ce86998abcadd5051acd91a696b.jpg',
  'https://i.pinimg.com/originals/07/b4/27/07b427c6bfabfb5d663efaaf05392b0c.png',
];

function SaleOff() {
  return (
    <Carousel className="Sale-Off" autoplay>
      {list.map((item, index) => (
        <img className="Sale-Off-img" src={item} key={index} />
      ))}
    </Carousel>
  );
}

export default SaleOff;
