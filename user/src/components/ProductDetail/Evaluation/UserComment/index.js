import { Avatar, Button, Comment, Rate } from 'antd';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function UserComment(props) {
  const { name, createdAt, comment, rating } = props.comment;
  const avt = '';
  const isReduceCmt = comment.length >= 200 ? true : false;
  const [isMore, setIsMore] = useState(false);
  // rendering ...
  return (
    <>
      {/* Comment */}
      <Comment
        author={<b className="font-size-14px">{name}</b>}
        avatar={
          <Avatar
            src={avt !== '' ? avt : constants.DEFAULT_USER_AVT}
            alt={name}
          />
        }
        content={
          <>
            {rating !== -1 && (
              <>
                <Rate defaultValue={rating} disabled style={{ fontSize: 14 }} />
                <h3>{helpers.convertRateToText(rating - 1)}</h3>
              </>
            )}

            <p className="t-justify">
              {isMore ? comment : comment.slice(0, 200)}
              {isReduceCmt && (
                <Button type="link" onClick={() => setIsMore(!isMore)}>
                  {isMore ? 'Thu gọn' : 'Xem thêm'}
                </Button>
              )}
            </p>
          </>
        }
        datetime={<span>{helpers.formatDate(createdAt)}</span>}
      />
    </>
  );
}

UserComment.propTypes = {
  comment: PropTypes.object,
};

export default UserComment;
