import { useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import { GetAloneTemplateListOutput } from '../../../service/ect/index';
import { packmanColors } from '../../../styles/color';

interface Template {
  _id: string;
  title: string;
}
interface TemplateItemProps {
  template: Template;
  isSelected: string;
  onClick?: () => void;
  changeTemplateImage?: (templateId: string) => void;
  changeUserOwnTemplateImage?: () => void;
  checkIsTemplate?: (isTemplate: boolean) => void;
}

function TemplateItem(props: TemplateItemProps) {
  const {
    template,
    isSelected,
    onClick,
    changeTemplateImage,
    changeUserOwnTemplateImage,
    checkIsTemplate,
  } = props;
  const { _id, title } = template;
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData('templateList') as GetAloneTemplateListOutput;

  if (!data) return null;

  const onClickTemplateItem = (id: string) => {
    data.basicTemplate.forEach((template) => {
      if (id === template._id) {
        checkIsTemplate && checkIsTemplate(true);
      }
    });
    data.myTemplate.forEach((template) => {
      if (id === template._id) {
        checkIsTemplate && checkIsTemplate(false);
      }
    });

    onClick && onClick();
    changeTemplateImage && changeTemplateImage(id);
    changeUserOwnTemplateImage && changeUserOwnTemplateImage();
  };

  return (
    <StyledRoot
      isSelected={isSelected === _id}
      isListEmpty={_id === ''}
      onClick={() => onClickTemplateItem(_id)}
    >
      {title}
    </StyledRoot>
  );
}

export default TemplateItem;

const StyledRoot = styled.div<{ isListEmpty: boolean; isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.4rem;
  padding: 0.7rem 1.1rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 1px solid ${packmanColors.pmPink};
          background-color: ${packmanColors.pmWhite};
          color: ${packmanColors.pmPink};
        `
      : css`
          border: 1px solid ${packmanColors.pmBlueGrey};
          background-color: ${packmanColors.pmBlueGrey};
          color: ${packmanColors.pmDeepGrey};
        `};
  color: ${({ isListEmpty }) => isListEmpty && packmanColors.pmGrey};
`;
