import { useState } from 'react';
import styled from 'styled-components';
import SwipeablelistItem from './SwipeableListItem';
import Image from 'next/image';
import iTrash from '../../../public/assets/svg/iTrash.svg';
import { packmanColors } from '../../../styles/color';
import Modal from '../common/Modal';
interface PackingList {
  id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

interface SwipeableListProps {
  alonePackingList: PackingList[];
}

export default function SwipeableList(props: SwipeableListProps) {
  const { alonePackingList } = props;

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [isDragged, setIsDragged] = useState<boolean[]>(
    Array(alonePackingList?.length).fill(false),
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const checkDeleteList = (id: string) => {
    if (deleteList.includes(id)) {
      setDeleteList((prev) => prev.filter((idx) => idx !== id));
    } else {
      setDeleteList([...deleteList, id]);
    }
  };

  const handleIsDragged = (tmpArr: boolean[]) => {
    setIsDragged(tmpArr);
  };

  const onClickDeleteButton = (idx: number) => {
    setIsDragged((prev) => prev.filter((_, i) => i !== idx));
  };

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
  };

  return (
    <StyledRoot
      onClick={() => {
        handleIsDragged(Array(alonePackingList?.length).fill(false));
      }}
    >
      {showModal && (
        <Modal
          content="정말 삭제하시겠어요?"
          leftButtonContent="아니오"
          rightButtonContent="예"
          closeModal={() => {
            document.body.style.overflow = 'unset';
            setShowModal(false);
          }}
          leftButtonFn={() => {
            handleIsDragged(Array(alonePackingList?.length).fill(false));
            setShowModal(false);
          }}
          rightButtonFn={() => {
            //togetherPackingListId params로 보내서 삭제
            onClickDeleteButton(selectedIndex);
            setShowModal(false);
          }}
        />
      )}

      <StyledCaptionWrapper>
        {!isDeleting && (
          <StyledCaptionText>
            <span>{alonePackingList?.length}</span>개의 패킹 리스트
          </StyledCaptionText>
        )}
        {isDeleting && (
          <span
            onClick={() => {
              deleteList.length > 0 && setDeleteList([]);
            }}
          >
            선택해제
          </span>
        )}

        <StyledCaptionButtonWrapper
          onClick={() => {
            setIsDragged(Array(alonePackingList?.length).fill(false));
            setIsDeleting((prev) => !prev);
            if (!isDeleting) {
              setDeleteList([]);
            }
          }}
        >
          {isDeleting ? (
            <p onClick={() => setIsDragged(Array(alonePackingList?.length).fill(false))}>취소</p>
          ) : (
            <Image
              src={iTrash}
              alt="삭제"
              width={24}
              height={24}
              onClick={() => setIsDragged(Array(alonePackingList?.length).fill(false))}
            />
          )}
        </StyledCaptionButtonWrapper>
      </StyledCaptionWrapper>
      <StyledSwipeableListWrapper>
        {alonePackingList?.map((item, idx) => (
          <SwipeablelistItem
            key={item.id}
            idx={idx}
            isDragged={isDragged[idx]}
            handleIsDragged={(tmpArr: boolean[]) => handleIsDragged(tmpArr)}
            isDeleting={isDeleting}
            deleteList={deleteList}
            checkDeleteList={(id: string) => checkDeleteList(id)}
            onClickDeleteButton={() => {
              setSelectedIndex(idx);
              openModal();
            }}
            packingList={alonePackingList}
          />
        ))}
      </StyledSwipeableListWrapper>
      {isDeleting && (
        <StyledDeleteButton>
          {!deleteList.length ? (
            <div
              onClick={() => {
                const tempArr: string[] = [];
                if (alonePackingList) {
                  alonePackingList.forEach(({ id }) => tempArr.push(id));
                }
                setDeleteList(tempArr);
              }}
            >
              전체 선택
            </div>
          ) : deleteList.length === alonePackingList?.length ? (
            <div
              onClick={() => {
                document.body.style.overflow = 'hidden';
                openModal();
              }}
            >
              전체 삭제
            </div>
          ) : (
            <div
              onClick={() => {
                document.body.style.overflow = 'hidden';
                openModal();
              }}
            >
              선택 삭제
            </div>
          )}
        </StyledDeleteButton>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
  background-color: #fff;
  overflow: hidden;
`;

const StyledCaptionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8.4rem;
  font-size: 1.2rem;
  font-weight: 300;

  & > span {
    position: absolute;
    font-size: 1.4rem;
    left: 2.6rem;
    bottom: 1rem;
    color: ${packmanColors.darkGray};
  }
`;
const StyledCaptionText = styled.p`
  display: flex;
  justify-content: start;
  padding: 1.8rem 0 0 2.4rem;
  margin: 0;
  font-size: 1.4rem;
  color: ${packmanColors.deepGray};
  & > span {
    font-weight: 600;
    color: ${packmanColors.pink};
  }
`;
const StyledCaptionButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  bottom: 0.9rem;
  & > p {
    color: ${packmanColors.deepGray};
  }
`;
const StyledSwipeableListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 9.7rem;
`;
const StyledDeleteButton = styled.button`
  position: fixed;
  bottom: 1.507rem;
  width: 100%;
  height: 4.7rem;
  font-size: 1.2rem;
  background-color: ${packmanColors.pink};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
`;
