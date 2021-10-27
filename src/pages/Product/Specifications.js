import React, { useState } from 'react';
import classes from './Product.module.css';

const Specifications = ({ product }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className={classes.specifications}>
      <header>Specifications</header>
      <div
        className={classes.data}
        style={expand ? { height: 'fit-content' } : { height: '300px', overflow: 'hidden' }}>
        <div>
          <div>General</div>
          <div>
            <span>
              <b>SIM Type</b>
            </span>
            {product.specification ? <span>{product.specification.SIM}</span> : null}
          </div>
          <div>
            <span>
              <b>Network</b>
            </span>
            {product?.specification?.network.forEach((n) => (
              <>{n}</>
            ))}
          </div>
          <div>
            <span>
              <b>Operating System</b>
            </span>
            {product.specification ? <span>{product.specification.OS}</span> : null}
          </div>
          <div>
            <span>
              <b>Processor</b>
            </span>
            {product.specification ? <span>{product.specification.processor}</span> : null}
          </div>
        </div>
        <div>
          <div>Memory</div>
          <div>
            <span>
              <b>RAM</b>
            </span>
            {product.specification ? (
              <span>{product.specification.memory.ram.size + ' ' + product.specification.memory.ram.unit}</span>
            ) : null}
          </div>
          <div>
            <span>
              <b>ROM</b>
            </span>
            {product.specification ? (
              <span>{product.specification.memory.rom.size + ' ' + product.specification.memory.rom.unit}</span>
            ) : null}
          </div>
          <div>
            <span>
              <b>Expandable</b>
            </span>
            {product.specification ? (
              <span>
                {product.specification.memory.expandable.size + ' ' + product.specification.memory.expandable.unit}
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <div>Display</div>
          <div>
            <span>
              <b>Screen Size</b>
            </span>
            {product.specification ? (
              <span>{product.specification.display.screen.size + ' ' + product.specification.display.screen.unit}</span>
            ) : null}
          </div>
          <div>
            <span>
              <b>Display</b>
            </span>
            {product.specification ? <span>{product.specification.display.resolution}</span> : null}
          </div>
        </div>
        <div>
          <div>Camera</div>
          <div>
            <span>
              <b>Front Camera</b>
            </span>
            {product.specification ? (
              <span>{product.specification.camera.front.value + ' ' + product.specification.camera.front.unit}</span>
            ) : null}
          </div>
          <div>
            <span>
              <b>Rear Camera</b>
            </span>
            {product.specification ? (
              <span>{product.specification.camera.rear.value + ' ' + product.specification.camera.rear.unit}</span>
            ) : null}
          </div>
        </div>
        <div>
          <div>Battery</div>
          <div>
            <span>
              <b>Battery Capacity</b>
            </span>
            {product.specification ? (
              <span>{product.specification.battery.size + ' ' + product.specification.battery.unit}</span>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={classes.expand}
        onClick={() => setExpand(!expand)}
        style={expand ? { position: 'relative' } : { position: 'absolute' }}>
        <span>{expand ? 'Less' : 'More'}</span>
      </div>
    </div>
  );
};

export default Specifications;
