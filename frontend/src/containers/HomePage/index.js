import { BackTop, Col, Row } from 'antd';
import Filter from 'components/Filter';
import RelatedProduct from 'containers/ProductDetailPage/RelatedProduct';
import React from 'react';
import AllProduct from './AllProduct';
import DiscountList from './DiscountList';
import FamousBrand from './FamousBrand';
import './index.scss';
import SaleOff from './SaleOff';

function HomePage() {
  // kéo về đầu trang
  document.querySelector('body').scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  return (
    <div className="Home">
      {/* Carousel cho sale off */}
      <div className="pos-relative">
        <SaleOff />
        <div className="filter-wrapper trans-center container w-100 h-80">
          <Filter />
        </div>
      </div>

      <Row className="container">
        {/* Tổng hợp sản phẩm */}
        <Col span={24} className="m-b-32 m-t-20 bg-white box-sha-home bor-rad-8">
          <AllProduct />
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
