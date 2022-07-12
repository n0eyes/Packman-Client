import styled from 'styled-components';
import 'react-swipeable-list/dist/styles.css';
import { SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import iCheck from '../public/assets/svg/iCheck.svg';
import iRightArrow from '../public/assets/svg/iRightArrow.svg';
import Image from 'next/image';
import React from 'react';

interface SwipeablePackingListItemProps {
  packingItem: {
    id: string;
    departureDate: string;
    title: string;
    packTotalNum: number;
  };
  isDeleting: boolean;
  deleteList: string[];
  checkDeleteList: (id: string) => void;
}

function SwipeablePackingListItem(props: SwipeablePackingListItemProps) {
  const { packingItem, isDeleting, deleteList, checkDeleteList } = props;
  const { id, departureDate, title, packTotalNum } = packingItem;

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={false}
        onClick={() => {
          //   console.log('아이템 삭제');
        }}
      >
        <StyledDeleteItemButton>삭제</StyledDeleteItemButton>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableListItem key={id} trailingActions={trailingActions()} blockSwipe={isDeleting}>
      <StyledSwipeableListItemWrapper>
        {isDeleting && (
          <StyledSelectDelete>
            <StyledCheckImage
              src={iCheck}
              alt="체크"
              isChecked={deleteList.includes(id)}
              onClick={() => checkDeleteList(id)}
            />
          </StyledSelectDelete>
        )}
        <StyledSwipeableListItem>
          <div>
            <p>{departureDate}</p>
            <p>{title}</p>
            <span>{packTotalNum}개의 짐</span>
          </div>
          <Image src={iRightArrow} alt="열기" width={10} height={20} />
        </StyledSwipeableListItem>
      </StyledSwipeableListItemWrapper>
    </SwipeableListItem>
  );
}

export default SwipeablePackingListItem;

const StyledSwipeableListItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  overflow: hidden;
`;
const StyledDeleteItemButton = styled.button`
  margin-left: 2rem;
  background-color: #ff0000;
  color: #fff;
  border: none;
  font-size: 1.6rem;
`;
const StyledSelectDelete = styled.div`
  display: flex;
  justify-content: center;
  width: 7.8rem;
  height: 2.4rem;
`;
const StyledCheckImage = styled(Image)<{ isChecked: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid #000;
  border-radius: 50%;
  background-color: ${({ isChecked }) => (isChecked ? 'green' : '#fff')};
`;
const StyledSwipeableListItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.5rem;
  height: inherit;
  padding: 2.1rem 1.8rem 2.1rem 2.5rem;
  border-radius: 1.5rem;
  background-color: #fff;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;

    & > span {
      width: fit-content;
      height: 2rem;
      background-color: #fff;
      color: #30ccd8;
      font-size: 1.2rem;
      border: 0.1rem solid #30ccd8;
      border-radius: 1rem;
      padding: 0 1rem;
      text-align: center;
    }
    & > p {
      margin: 0;
    }
    & > p:first-child {
      font-size: 1.2rem;
      color: #808080;
    }
    & > p:nth-child(2) {
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;
