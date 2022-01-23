import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';
import userApi from 'apis/userApi';
import DatePickerField from 'components/Custom/Field/DatePickerField';
import InputField from 'components/Custom/Field/InputField';
import SelectField from 'components/Custom/Field/SelectField';
import constants from 'constants/index';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userReducers from 'reducers/user';

import * as Yup from 'yup';
function UpdateAccountForm() {
  const user = useSelector((state) => state.user);
  const { _id, name, email, address, gender } = user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // giá trọ khởi tạo cho formik
  const initialValue = {
    email,
    name,
    address,
    gender,
  };

  // validate form trước submit với yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('* Email bạn là gì ?')
      .email('* Email không hợp lệ !'),
    name: Yup.string()
      .trim()
      .required('* Tên bạn là gì ?')
      .matches(
        /[^~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`]/,
        '* Không được chứa ký tự đặc biệt',
      )
      .max(70, '* Tối đa 70 ký tự'),
    gender: Yup.boolean().required('* Giới tính của bạn'),
    address: Yup.string()
      .trim()
      .max(100, '* Tối đa 100 ký tự'),
  });

  // fn: update account
  const handleUpdate = async (value) => {
    try {
      setIsSubmitting(true);
      if (JSON.stringify(initialValue) === JSON.stringify(value)) {
        setIsSubmitting(false);
        return;
      }
      const response = await userApi.putUpdateUser(_id, value);
      if (response) {
        message.success('Cập nhật thành công.');
        setIsSubmitting(false);
        setTimeout(() => {
          dispatch(userReducers.getUserRequest());
        }, 500);
      }
    } catch (error) {
      message.error('Cập nhật thất bại. Thử lại', 2);
      setIsSubmitting(false);
    }
  };

  //rendering...
  return (
    <>
      {email && (
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(value) => handleUpdate(value)}>
          {(formikProps) => {
            const suffixColor = 'rgba(0, 0, 0, 0.25)';
            return (
              <Form className="box-sha-home bg-white bor-rad-8">
                <Row className=" p-16" gutter={[32, 32]} style={{ margin: 0 }}>
                  <Col className="p-b-0" span={24} md={12}>
                    {/* email field */}
                    <FastField
                      name="email"
                      component={InputField}
                      disabled={true}
                      className="input-form-common"
                      placeholder="Email *"
                      size="large"
                      suffix={
                        <Tooltip title="Email của bạn">
                          <InfoCircleOutlined
                            style={{
                              color: suffixColor,
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col className="p-b-0" span={24} md={12}>
                    {/* full name filed */}
                    <FastField
                      name="name"
                      component={InputField}
                      className="input-form-common"
                      placeholder="Họ và tên *"
                      size="large"
                      suffix={
                        <Tooltip title="Họ và tên của bạn">
                          <InfoCircleOutlined style={{ color: suffixColor }} />
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col className="p-b-0" span={24} md={12}>
                    {/* gender field */}
                    <FastField
                      className="input-form-common gender-field"
                      size="large"
                      name="gender"
                      component={SelectField}
                      placeholder="Giới tính *"
                      options={constants.GENDER_OPTIONS}
                    />
                  </Col>
                  <Col className="p-b-0" span={24} md={12}>
                    {/* address filed */}
                    <FastField
                      name="address"
                      component={InputField}
                      className="input-form-common"
                      placeholder="Địa chỉ"
                      size="large"
                      suffix={
                        <Tooltip title="Địa chỉ của bạn">
                          <InfoCircleOutlined style={{ color: suffixColor }} />
                        </Tooltip>
                      }
                    />
                  </Col>
                  {/* Button submit */}
                  <Col className="p-tb-16 t-left" span={24}>
                    <Button
                      className="w-30"
                      size="large"
                      type="primary"
                      loading={isSubmitting}
                      htmlType="submit">
                      {isSubmitting ? 'Đang cập nhật ...' : 'Cập nhật'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

export default UpdateAccountForm;
