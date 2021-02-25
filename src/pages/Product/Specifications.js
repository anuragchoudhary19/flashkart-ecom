import React, { useState } from 'react';
import classes from './Product.module.css';

const Specifications = ({ product }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className={classes.specifications}>
      <header>Specifications</header>
      <div className={classes.data} style={expand ? { height: 'fit-content' } : { height: '300px' }}>
        <table>
          <tbody>
            <th>General</th>
            <tr>
              <td>
                <b>SIM Type</b>
              </td>
              {product.specification ? <td>{product.specification.SIM}</td> : null}
            </tr>
            <tr>
              <td>
                <b>Network</b>
              </td>
              {product.specification ? <td>{product.specification.network}</td> : null}
            </tr>
            <tr>
              <td>
                <b>Operating System</b>
              </td>
              {product.specification ? <td>{product.specification.OS}</td> : null}
            </tr>
            <tr>
              <td>
                <b>Processor</b>
              </td>
              {product.specification ? <td>{product.specification.processor}</td> : null}
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <th>Memory</th>
            <tr>
              <td>
                <b>Processor</b>
              </td>
              {product.specification ? (
                <td>{product.specification.memory.ram.size + ' ' + product.specification.memory.ram.unit}</td>
              ) : null}
            </tr>
            <tr>
              <td>
                <b>Processor</b>
              </td>
              {product.specification ? (
                <td>{product.specification.memory.rom.size + ' ' + product.specification.memory.rom.unit}</td>
              ) : null}
            </tr>
            <tr>
              <td>
                <b>Processor</b>
              </td>
              {product.specification ? (
                <td>
                  {product.specification.memory.expandable.size + ' ' + product.specification.memory.expandable.unit}
                </td>
              ) : null}
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <th>Display</th>
            <tr>
              <td>
                <b>Screen Size</b>
              </td>
              {product.specification ? (
                <td>{product.specification.display.screen.size + ' ' + product.specification.display.screen.unit}</td>
              ) : null}
            </tr>
            <tr>
              <td>
                <b>Processor</b>
              </td>
              {product.specification ? <td>{product.specification.display.resolution}</td> : null}
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <th>Camera</th>
            <tr>
              <td>
                <b>Front Camera</b>
              </td>
              {product.specification ? (
                <td>{product.specification.camera.front.value + ' ' + product.specification.camera.front.unit}</td>
              ) : null}
            </tr>
            <tr>
              <td>
                <b>Rear Camera</b>
              </td>
              {product.specification ? (
                <td>{product.specification.camera.rear.value + ' ' + product.specification.camera.rear.unit}</td>
              ) : null}
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <th>Battery</th>
            <tr>
              <td>
                <b>Battery Capacity</b>
              </td>
              {product.specification ? (
                <td>{product.specification.battery.size + ' ' + product.specification.battery.unit}</td>
              ) : null}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.expand} onClick={() => setExpand(!expand)}>
        {expand ? 'Show Less' : 'Show More'}
      </div>
    </div>
  );
};

export default Specifications;
