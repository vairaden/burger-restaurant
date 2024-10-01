import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ConstructorListItem.module.css';
import { Ingredient } from '../../types';
import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../services/store';
import {
  moveIngredient,
  moveIngredientToBottom,
} from '../../services/burgerConstructor/burgerConstructorSlice';

interface Props {
  item: Ingredient;
  type?: 'top' | 'bottom';
  onDelete?: () => void;
  locked?: boolean;
  constructorListId?: string;
}

interface DropParams {
  itemId: string;
}

const ConstructorListItem = ({
  item,
  type,
  onDelete,
  locked,
  constructorListId,
}: Props) => {
  const dispatch = useAppDispatch();

  const dropHandler = (params: DropParams) => {
    if (type === 'bottom') {
      return dispatch(
        moveIngredientToBottom({
          itemId: params.itemId,
        })
      );
    }

    if (!constructorListId) {
      return;
    }

    dispatch(
      moveIngredient({
        itemId: params.itemId,
        targetId: constructorListId,
      })
    );
  };

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: 'constructorItem',
    item: { itemId: constructorListId },
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
