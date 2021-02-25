import React from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.jpeg';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const ProductCard = ({ products, removeItem }) => {
  const { title, description, images, slug } = products;
  return (
    <Card
      style={{ width: '300px', height: '300px' }}
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          alt=''
          style={{ height: '150px', width: '150px' }}
        />
      }
      actions={[
        <Link to={`/admin/productProfile/update/${slug}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined onClick={() => removeItem(slug)} />,
      ]}>
      <Meta title={title} description={description} />
    </Card>
  );
};

export default ProductCard;
