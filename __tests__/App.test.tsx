import { shallow } from 'enzyme';
import { ImageData } from '../src/types';
import { v4 as uuidv4 } from 'uuid';

import App from '../src/App';
import ImageContainer, {
  ImageCard,
  PleaseUploadImages,
  MinImageCount,
} from '../src/ImageConatiner';
import UsernameContainer, {
  UsernameInput,
  SubmitBtn,
  Username,
} from '../src/UsernameContainer';
import DisplayShortBio, {
  makeSentence,
  SentenceKeywordType,
  Color,
  Mbti,
  ColorBtn,
  MbtiBtn,
  LastnameBtn,
} from '../src/DisplayShortBio';

describe('App.tsx 컴퍼넌트 정상 출력', () => {
  // it('모든 컴퍼넌트가 정상적으로 출력된다.', () => {
  //   let wrapper = shallow(<App />);
  //   expect(wrapper.children().map((child) => child)).not.toThrowError;
  // });
  // it('Username 컴퍼넌트가 존재한다.', () => {
  //   let wrapper = shallow(<App />);
  //   expect(wrapper.children('.Username'));
  // });
  // it('ImageContainer 컴퍼넌트가 존재한다.', () => {
  //   let wrapper = shallow(<App />);
  //   expect(wrapper.children('.ImageContainer').props);
  // });
});

const buildImages = (count: number) => {
  return Array.from(Array(count)).map(() => {
    return { url: '', uid: uuidv4() } as ImageData;
  });
};

const minImageCount = 3;
const maxImageCount = 12;

const initializeImageWrapper = (count: number) => {
  let wrapper;
  const images = buildImages(count);
  wrapper = shallow(
    <ImageContainer
      images={images}
      minImageCount={minImageCount}
      maxImageCount={maxImageCount}
    />
  );
  return wrapper;
};

describe('아무것도 없는 프로필 페이지 표시', () => {
  it('이미지가 3개 미만이면 아무것도 출력하지 않는다.', () => {
    let wrapper;
    const images = buildImages(3);

    [0, 1, 2].forEach((e) => {
      wrapper = shallow(
        <ImageContainer
          images={images.slice(0, e)}
          minImageCount={3}
          maxImageCount={12}
        />
      );
      expect(wrapper.find(PleaseUploadImages)).not.toBeNull();
    });

    wrapper = shallow(
      <ImageContainer images={images} minImageCount={3} maxImageCount={12} />
    );
    expect(wrapper.find(ImageCard)).toHaveLength(images.length);
  });

  it('최대 개수 초과 이미지는 출력하지 않는다.', () => {
    const wrapper = initializeImageWrapper(14);

    expect(wrapper.find(ImageCard)).toHaveLength(12);
  });

  it('최소 이미지 개수 안내문이 정상적으로 출력된다.', () => {
    const wrapper = initializeImageWrapper(0);

    expect(wrapper.find(MinImageCount)).toHaveLength(1);
    expect(wrapper.find(MinImageCount).text()).toEqual(
      minImageCount.toString()
    );
  });
});

const maxUsernameLength = 12;

const initializeUsernameWrapper = (name: string) => {
  let wrapper;
  wrapper = shallow(
    <UsernameContainer name={name} maxLength={maxUsernameLength} />
  );
  return wrapper;
};

describe('사용자 이름 표시', () => {
  it('사용자의 이름이 출력된다.', () => {
    const name = '김태연';
    const wrapper = initializeUsernameWrapper(name);

    expect(wrapper.find(Username).text()).toEqual(name);
  });

  it('최대 글자수만큼만 출력된다.', () => {
    const wrapper = initializeUsernameWrapper('김태연김태연김태연김태연김태연');

    expect(wrapper.find(Username).text()).toHaveLength(maxUsernameLength);
  });

  const myModule = require('../src/UsernameContainer');

  it('최대 글자수만큼만 입력된다.', () => {
    const wrapper = initializeUsernameWrapper('');

    wrapper.find(UsernameInput).simulate('change', {
      target: { value: '김태연김태연김태연김태연김태연' },
    });

    expect(wrapper.find(UsernameInput).props().value).toHaveLength(12);
  });

  it('등록 버튼을 누르면 저장된다.', () => {
    const wrapper = initializeUsernameWrapper('');

    myModule.onClick = jest.fn();
    wrapper.find(SubmitBtn).simulate('click');
    expect(myModule.onClick).toBeCalled();
  });
});

describe('소개 문구 텍스트 표시', () => {
  it('키워드 3개가 문장 형식으로 표현된다.', () => {
    const sentenceKeyword: SentenceKeywordType = {
      color: Color.GREEN,
      mbti: Mbti.ENFJ,
      lastName: '김',
    };

    expect(makeSentence(sentenceKeyword)).toEqual(
      '초록색을 좋아하는 ENFJ인 김씨'
    );
  });
  it('색상 선택 버튼이 색상 개수만큼 출력된다.', () => {
    let wrapper = shallow(<DisplayShortBio />);
    expect(wrapper.find(ColorBtn)).toHaveLength(5);
  });

  it('mbti 선택 버튼이 색상 개수만큼 출력된다.', () => {
    let wrapper = shallow(<DisplayShortBio />);
    expect(wrapper.find(MbtiBtn)).toHaveLength(4);
  });

  it('성씨 선택 버튼이 색상 개수만큼 출력된다.', () => {
    let wrapper = shallow(<DisplayShortBio />);
    expect(wrapper.find(LastnameBtn)).toHaveLength(4);
  });
});
