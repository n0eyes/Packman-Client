import { useRouter } from 'next/router';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface DropBoxProps {
  folderList: { id: string; name: string }[];
  closeDropBox: () => void;
  currentId: string;
  categoryName: string;
}

function DropBox(props: DropBoxProps) {
  const { folderList, closeDropBox, currentId, categoryName } = props;
  const router = useRouter();

  const onClickFolderItem = (id: string) => {
    router.replace(`/packing-list/${categoryName}?id=${id}`);

    closeDropBox();
  };

  return (
    <>
      <StyledBackground onClick={closeDropBox} />
      <StyledRoot>
        {folderList.map(({ id, name }) => (
          <StyledItem key={id} currentId={id === currentId} onClick={() => onClickFolderItem(id)}>
            {name}
          </StyledItem>
        ))}
      </StyledRoot>
    </>
  );
}

export default DropBox;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  z-index: 10;
`;

const StyledRoot = styled.div`
  position: absolute;
  width: 16rem;
  top: 4.2rem;
  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
  z-index: 100;
`;
const StyledItem = styled.div<{ currentId: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  font-weight: ${({ currentId }) => (currentId ? '600' : '400')};
  font-size: 1.5rem;
  color: ${packmanColors.pmDarkGrey};
  border-bottom: 1px solid ${packmanColors.pmGrey};
`;
