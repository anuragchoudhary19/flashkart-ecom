import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import { Avatar, Badge } from 'antd';

const ImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({
    ...state,
  }));

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
            //console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: { authtoken: user ? user.idToken : '' },
                }
              )
              .then((res) => {
                console.log(res.data);
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
            authtoken: user ? user.idToken : '',
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
    <div>
      <div>
        {props.value.images &&
          props.value.images.map((image) => (
            <div key={image.public_id}>
              <Badge id='badge' count={'X'} onClick={() => deleteImage(image.public_id)}>
                <Avatar size={64} shape='square' src={image.url} />
              </Badge>
            </div>
          ))}
        {loading ? <Spinner /> : null}
      </div>
      <label className='btn btn-primary'>
        Upload Images
        <input type='file' hidden multiple accept='/images/*' onChange={uploadFileAndResize} />
      </label>
    </div>
  );
};

export default ImageUpload;
