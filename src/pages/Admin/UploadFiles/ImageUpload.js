import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { LoadingOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import styles from './ImageUpload.module.css';

const ImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const uploadFileAndResize = (e) => {
    setLoading(true);
    const files = e.target.files;
    let allUploadedFiles = props.value.images;
    if (files) {
      [...files].forEach((file) => {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: { authtoken: user ? user.token : '' },
                }
              )
              .then((res) => {
                allUploadedFiles.push(res.data);
                props.setValue({ ...props.value, images: allUploadedFiles });
                setLoading(false);
              })
              .catch((err) => console.log(err));
          },
          'base64'
        );
      });
    }
  };

  const deleteImage = (public_id) => {
    console.log(public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { images } = props.value;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        props.setValue({ ...props.value, images: filteredImages });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.upload}>
      <div>
        {props.value.images &&
          props.value.images.map((image) => (
            <div key={image.public_id}>
              <Badge id='badge' count={'X'} onClick={() => deleteImage(image.public_id)}>
                <img alt='mobile' src={image.url} width='100px' height='100px' />
              </Badge>
            </div>
          ))}
        {loading ? <LoadingOutlined /> : null}
      </div>
      <label className='btn'>
        Upload Images
        <input type='file' hidden multiple accept='/images/*' onChange={uploadFileAndResize} />
      </label>
    </div>
  );
};

export default ImageUpload;
