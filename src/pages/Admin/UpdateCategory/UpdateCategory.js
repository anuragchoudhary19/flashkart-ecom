import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//components
import Sidebar from '../../../components/nav/Sidebar/Sidebar';
import Input from '../../../components/Elements/Input/Input';
import Button from '../../../components/Elements/Button/Button';
//functions
import { updateCategory, getCategory } from '../../../functions/category';
//css
import classes from './UpdateCategory.module.css';

const UpdateCategory = ({ history, match }) => {
  const [name, setName] = useState('');
  //const [loading, setLoading] = useState(false);

  useEffect(() => getCategory(match.params.slug).then((res) => setName(res.data.name)), []);
  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    e.preventDefault();
    //setLoading(true);
    console.log(match);
    updateCategory(match.params.slug, { name }, user.idToken)
      .then((res) => {
        if (window.confirm('Category was updated successfully')) {
          history.replace('/admin/category');
        }
      })
      .catch((err) => {
        window.alert('Category update failed');
      });
  };

  return (
    <div className={classes.update}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Update Category</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              label='New Category Name'
              type='text'
              name='category'
              value={name}
              change={(e) => setName(e.target.value)}
            />
            <Button type='submit'>Update</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
