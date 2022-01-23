import commentApi from 'apis/commentApi';
import EvaluationView from 'components/ProductDetail/Evaluation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Evaluation(props) {
  const { productId, rates, reviews } = props;
  return (
    <EvaluationView productId={productId} rates={rates} cmtList={reviews} />
  );
}

Evaluation.defaultProps = {};
Evaluation.propTypes = {
  productId: PropTypes.string,
  rates: PropTypes.array || PropTypes.object,
  reviews: PropTypes.array,
};

export default Evaluation;
