import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ConstructorListItem.module.css';
import { Ingredient } from '../../types';
import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../services/store';
import { moveIngredient } from '../../services/constructorSlice';

interface Props {
  item: Ingredient;
  type?: 'top' | 'bottom';
  onDelete?: () => void;
  locked?: boolean;
  constructorListIndex: number;
}

interface DropParams {
  itemIndex: number;
}

const ConstructorListItem = ({
  item,
  type,
  onDelete,
  locked,
  constructorListIndex,
}: Props) => {
  const dispatch = useAppDispatch();
  const dropHandler = (params: DropParams) => {
    dispatch(
      moveIngredient({
        itemIndex: params.itemIndex,
        targetIndex: constructorListIndex,
      })
    );
  };

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: 'constructorItem',
    item: { itemIndex: constructorListIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: 'constructorItem',
    drop(params: DropParams) {
      dropHandler(params);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  if (isDragging) {
    return null;
  }

  return (
    <li
      ref={(el) => {
        switch (type) {
          case 'top':
            return;
          case 'bottom':
            dropRef(el);
            return;
          default:
            dropRef(el);
            dragPreviewRef(el);
            return;
        }
      }}
      className={clsx(styles.listItemContent, {
        'mt-4': type !== 'top',
        [styles.listItemHovered]: isHover,
      })}
    >
      {!locked && (
        <div ref={dragRef} style={{ cursor: 'grab' }}>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        extraClass={locked ? 'ml-8' : 'ml-2'}
        type={type}
        isLocked={locked}
        text={
          item.name +
          (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')
        }
        price={item.price}
        thumbnail={item.image}
        handleClose={onDelete}
      />
    </li>
  );
};
export default ConstructorListItem;
