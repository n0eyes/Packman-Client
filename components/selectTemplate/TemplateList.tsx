import styled from 'styled-components';
import { ReactNode } from 'react';
import { packmanColors } from '../../styles/color';

interface TemplateListProps {
  templateList: ReactNode;
}

function TemplateList(props: TemplateListProps) {
  const { templateList } = props;

  return <StyledRoot>{templateList}</StyledRoot>;
}

export default TemplateList;

const StyledRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 13rem;
  gap: 1rem;
  padding: 1rem 0;
  overflow-y: scroll;
  // 스크롤바 항상 표시
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${packmanColors.pmDeepGrey};
  }
`;
