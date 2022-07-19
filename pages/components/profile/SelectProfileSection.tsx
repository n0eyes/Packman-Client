import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';
import useAPI from '../../../utils/hooks/useAPI';
import profile1 from '../../../public/assets/svg/profile1.svg';
import profile2 from '../../../public/assets/svg/profile2.svg';
import profile3 from '../../../public/assets/svg/profile3.svg';
import profile4 from '../../../public/assets/svg/profile4.svg';
import profile5 from '../../../public/assets/svg/profile5.svg';
import profile6 from '../../../public/assets/svg/profile6.svg';
import useGlobalState from '../../../utils/hooks/useGlobalState';
import { useMutation, useQueryClient } from 'react-query';

interface UpdateUserProfileData {
  nickname: string;
  profileImageId: string;
}

interface ProfileImageData {
  id: string;
  src: any;
}

interface SelectProfileSectionProps {
  isEditing?: boolean;
  oldNickname?: string;
  finishEditing?: () => void;
}

function SelectProfileSection(props: SelectProfileSectionProps) {
  const queryClient = useQueryClient();
  const { isEditing, oldNickname, finishEditing } = props;
  const [profileImage] = useGlobalState<ProfileImageData[]>('profileImageList', [
    { id: '0', src: profile1 },
    { id: '1', src: profile2 },
    { id: '2', src: profile3 },
    { id: '3', src: profile4 },
    { id: '4', src: profile5 },
    { id: '5', src: profile6 },
  ]);
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState(profileImage[0].id);
  const router = useRouter();

  //프로필 수정
  const updateUserProfile = useAPI(
    (api) => (info: UpdateUserProfileData) => api.user.updateUserProfile(info),
  );
  const { mutate: updateUserProfileMutate } = useMutation(
    (updateUserProfileData: UpdateUserProfileData) => {
      return updateUserProfile(updateUserProfileData);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    },
  );

  const setIsActivate = () => {
    if (isEditing) {
      return nickname.length > 0;
    } else {
      return nickname.length > 0 && nickname.length < 5;
    }
  };
  useEffect(() => {
    if (oldNickname) {
      setNickname(oldNickname);
    }
  }, []);

  return (
    <StyledRoot>
      <Image src={profileImage[+profile].src} alt="profile-image" width={120} height={120} />
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="김팩맨"
          value={nickname}
          maxLength={4}
          onChange={(e) => {
            if (nickname.length > 4) {
              setNickname((prev) => prev.substring(0, 4));
            } else {
              setNickname(e.target.value);
            }
          }}
        />
        <StyledText nickname={nickname !== ''}>닉네임을 입력해주세요 (4자 이내)</StyledText>
      </StyledInputWrapper>

      <StyledSelectProfileWrapper>
        {profileImage.map(({ id, src }) => (
          <Image
            key={id}
            src={src}
            alt="profile-images"
            width={80}
            height={80}
            onClick={() => setProfile(id)}
          />
        ))}
      </StyledSelectProfileWrapper>

      <StyledButton
        type="button"
        disabled={!setIsActivate()}
        isActivate={setIsActivate()}
        onClick={
          isEditing
            ? async () => {
                if (finishEditing) {
                  updateUserProfileMutate({
                    nickname,
                    profileImageId: profile,
                  });
                  finishEditing();
                }
              }
            : () => router.push('/folder')
        }
      >
        {isEditing ? '수정 완료' : '패킹하러 가기'}
      </StyledButton>
    </StyledRoot>
  );
}

export default SelectProfileSection;

const StyledRoot = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4.84rem;
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledText = styled.div<{ nickname: boolean }>`
  opacity: ${({ nickname }) => nickname && '0'};
  padding-top: 0.77rem;
  color: ${packmanColors.pmDeepGrey};
  font-weight: 400;
  font-size: 1.3rem;
`;
const StyledInput = styled.input`
  width: 12rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem;
  color: ${packmanColors.pmBlack};
  border: none;
  border-bottom: 1px solid ${packmanColors.pmDeepGrey};
  border-radius: 0;
  margin-top: 1.6rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dddddd;
  }
`;
const StyledSelectProfileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 25.6rem;
  gap: 0.8rem;
  margin: 1.5rem 0 5.57rem 0;
`;
const StyledButton = styled.button<{ isActivate: boolean }>`
  position: absolute;
  bottom: 1.5rem;
  width: 33.6rem;
  height: 4.1rem;
  border: none;
  border-radius: 0.8rem;
  padding: 1.2rem 6.4rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.pmWhite};
  background-color: ${({ isActivate }) =>
    isActivate ? packmanColors.pmPink : packmanColors.pmGrey};
`;
