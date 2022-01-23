import {
  Button,
  Col,
  Modal,
  Row,
  Spin,
  Table,
  Tooltip,
  Popconfirm,
  message,
  Rate,
  Input,
} from 'antd';
import orderApi from 'apis/orderApi';
import productApi from 'apis/productApi';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

function OrderDetail(props) {
  const { orderId, onClose, setIsDestroy } = props;
  const [visible, setVisible] = useState(true);
  const [commentVisible, setCommentVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');

  console.log(order);

  // event: lấy chi tiết đơn hàng
  useEffect(() => {
    let isSubscribe = true;
    async function getOrderDetails() {
      try {
        const response = await orderApi.getOrderDetails(orderId);
        console.log(response);
        if (isSubscribe && response) {
          setOrder(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) {
          setIsLoading(false);
          setOrder(null);
        }
      }
    }
    getOrderDetails();
    return () => {
      isSubscribe = false;
    };
  }, [orderId]);

  const onSubmitReview = async () => {
    try {
      const response = await productApi.reviewProduct(
        order.orderProd.id,
        comment,
        rate,
      );
      if (response.status === 200) {
        message.success('Nhận xét thành công', 2);
        setIsDestroy(true);
        onClose();
      }
    } catch (error) {
      if (error.response.data === 'already review') {
        message.error('Bạn đã review sản phẩm này rồi!', 2);
      } else {
        message.error('Có lỗi xảy ra', 2);
      }
      setIsDestroy(true);
      onClose();
    }
  };

  const onCancelOrder = async () => {
    try {
      const response = await orderApi.destroyOrder(orderId);
      if (response.status === 200 || response.status === 204) {
        message.success('Huỷ đơn hàng thành công', 2);
        setIsDestroy(true);
        onClose();
      }
    } catch (error) {
      message.error('Huỷ đơn hàng thất bại', 2);
      setIsDestroy(true);
      onClose();
    }
  };

  // cột cho bảng chi tiết sản phẩm
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'prod',
      key: 'prod',
      render: (v, record) => (
        <Link to={`/product/${record.orderProd.id}`}>
          <Tooltip title={record.orderProd.name}>
            {helpers.reduceProductName(record.orderProd.name, 40)}
          </Tooltip>
        </Link>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'prod',
      render: (v, record) => helpers.formatProductPrice(record.orderProd.price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'numOfProd',
      key: 'numOfProd',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'prod',
      render: (v, record) => `${record.orderProd.discount} %`,
    },
    {
      title: 'Tạm tính',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      render: (v, record) => {
        return helpers.formatProductPrice(
          record.orderProd.priceDiscount * record.numOfProd,
        );
      },
    },
  ];

  // rendering...
  return (
    <Modal
      width={1000}
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
        onClose();
      }}
      maskClosable={false}
      footer={null}
      title={
        <p className="font-size-18px m-b-0">
          Chi tiết đơn hàng
          {order && (
            <>
              <span style={{ color: '#4670FF' }}>{` #${order._id}`}</span>
              <b>{` - ${helpers.convertOrderStatus(order.orderStatus)}`}</b>
            </>
          )}
        </p>
      }>
      <>
        {isLoading ? (
          <div className="pos-relative" style={{ minHeight: 180 }}>
            <Spin
              className="trans-center"
              tip="Đang tải chi tiết đơn hàng..."
              size="large"
            />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {/* thời gian đặt hàng */}
            <Col span={24} className="t-right">
              <b className="font-size-14px">
                {`Ngày đặt hàng  ${helpers.formatOrderDate(
                  order.createdAt,
                  1,
                )}`}
              </b>
            </Col>

            {/* địa chỉ người nhận */}
            <Col span={12}>
              <h3 className="t-center m-b-12">ĐỊA CHỈ NGƯỜI NHẬN</h3>
              <div
                className="p-tb-12 p-lr-16 bg-gray bor-rad-8"
                style={{ minHeight: 150 }}>
                <h3 className="m-b-8">
                  <b>{order.deliveryAdd.name.toUpperCase()}</b>
                </h3>
                <p className="m-b-8">{`Địa chỉ: ${order.deliveryAdd.address.details}, ${order.deliveryAdd.address.wards}, ${order.deliveryAdd.address.district}, ${order.deliveryAdd.address.province},`}</p>
                <p className="m-b-8">
                  Số điện thoại: {order.deliveryAdd.phone}
                </p>
              </div>
            </Col>

            {/* Hình thức thanh toán */}
            <Col span={12}>
              <h3 className="t-center m-b-12">HÌNH THỨC THANH TOÁN</h3>
              <div
                className="p-tb-12 p-lr-16 bg-gray bor-rad-8"
                style={{ minHeight: 150 }}>
                <p className="m-b-8">
                  {helpers.convertPaymentMethod(order.paymentMethod)}
                </p>
              </div>
            </Col>

            {/* Chi tiết sản phẩm đã mua */}
            <Col span={24}>
              <Table
                pagination={false}
                columns={columns}
                dataSource={[{ key: 1, ...order }]}
              />
            </Col>

            {/* Tổng cộng */}
            <Col span={24} className="t-right">
              <div className="d-flex font-weight-500 justify-content-end">
                <p style={{ color: '#bbb' }}>Tạm tính</p>
                <span
                  className="m-l-32"
                  style={{ color: '#888', minWidth: 180 }}>
                  {helpers.formatProductPrice(
                    order.orderProd.priceDiscount * order.numOfProd,
                  )}
                </span>
              </div>
              <div className="d-flex font-weight-500 justify-content-end">
                <p style={{ color: '#bbb' }}>Phí vận chuyển</p>
                <span
                  className="m-l-32"
                  style={{ color: '#888', minWidth: 180 }}>
                  {helpers.formatProductPrice(order.transportFee)}
                </span>
              </div>
              <div className="d-flex font-weight-500 justify-content-end">
                <p style={{ color: '#bbb' }}>Tổng cộng</p>
                <span
                  className="m-l-32 font-size-18px"
                  style={{ color: '#ff2000', minWidth: 180 }}>
                  {helpers.formatProductPrice(
                    order.orderProd.priceDiscount * order.numOfProd -
                      order.transportFee,
                  )}
                </span>
              </div>
            </Col>
            {order.orderStatus === 0 && (
              <Row>
                <Popconfirm
                  title="Bạn có chắc muốn huỷ đơn hàng này không ?"
                  placement="top"
                  okButtonProps={{ type: 'primary' }}
                  onConfirm={onCancelOrder}
                  okText="Đồng ý"
                  cancelText="Huỷ bỏ">
                  <Button danger size="large">
                    Huỷ đơn hàng
                  </Button>
                </Popconfirm>
              </Row>
            )}
            {order.orderStatus === 5 && (
              <Row>
                <Button onClick={() => setCommentVisible(true)}>
                  Nhận xét sản phẩm
                </Button>
                <Modal
                  width={500}
                  centered
                  visible={commentVisible}
                  onCancel={() => {
                    setCommentVisible(false);
                  }}
                  okText={'Gửi nhận xét'}
                  onOk={onSubmitReview}
                  okButtonProps={{
                    disabled: rate === 0,
                  }}
                  maskClosable={false}
                  title={
                    <p className="font-size-18px m-b-0">Nhận xét sản phẩm</p>
                  }>
                  <>
                    <span className="m-b-20">
                      <Rate onChange={(rate) => setRate(rate)} value={rate} />
                      {rate ? (
                        <span className="ant-rate-text">
                          {helpers.convertRateToText(rate - 1)}
                        </span>
                      ) : (
                        ''
                      )}
                    </span>
                    <TextArea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="m-t-20"
                      rows={4}
                    />
                  </>
                </Modal>
              </Row>
            )}
          </Row>
        )}
      </>
    </Modal>
  );
}

OrderDetail.propTypes = {
  orderId: PropTypes.string,
  onClose: PropTypes.func,
  setIsDestory: PropTypes.func,
};

export default OrderDetail;
