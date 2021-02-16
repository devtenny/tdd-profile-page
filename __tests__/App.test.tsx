import { mount, shallow } from 'enzyme';
import { ImageData } from '../src/types';
import { v4 as uuidv4 } from 'uuid';
import { StyledComponent } from 'styled-components';

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
  Lastname,
  ColorBtn,
  MbtiBtn,
  LastnameBtn,
  ColorBtnContainer,
  MbtiBtnContainer,
  LastnameBtnContainer,
  UserSentence,
} from '../src/DisplayShortBio';
import ImageEditor, {
  BorderColorPicker,
  BorderRadius,
  BorderRadiusBtnContainer,
  BorderWidth,
  BorderWidthBtnContainer,
  CustomImageContainer,
  PaletteColor,
  PaletteColorBtn,
  PaletteColorBtnContainer,
} from '../src/ImageEditor';
// import ColorPalette, {
//   PaletteColorBtn,
//   PaletteColorBtnContainer,
// } from '../src/ColorPalette';

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
  let wrapper: any = null;
  beforeEach(() => {
    wrapper = shallow(<DisplayShortBio />);
  });
  it('키워드 3개가 문장 형식으로 표현된다.', () => {
    const sentenceKeyword: SentenceKeywordType = {
      color: Color.GREEN,
      mbti: Mbti.ENFJ,
      lastname: Lastname.KIM,
    };

    expect(makeSentence(sentenceKeyword)).toEqual(
      '초록색을 좋아하는 ENFJ인 김씨'
    );
  });
  it('색상 선택 버튼이 색상 개수만큼 출력된다.', () => {
    expect(wrapper.find(ColorBtn)).toHaveLength(5);
  });

  it('mbti 선택 버튼이 색상 개수만큼 출력된다.', () => {
    expect(wrapper.find(MbtiBtn)).toHaveLength(4);
  });

  it('성씨 선택 버튼이 색상 개수만큼 출력된다.', () => {
    expect(wrapper.find(LastnameBtn)).toHaveLength(4);
  });

  const btnContainerFinder = (
    container: StyledComponent<'div', any, {}, never>,
    index: number
  ) => {
    return {
      container: wrapper.find(container).childAt(index),
      text: wrapper.find(container).childAt(index).text(),
    };
  };

  it('키워드 3개를 모두 선택해야 소개 문구가 출력된다.', () => {
    const color = btnContainerFinder(ColorBtnContainer, 0);
    const mbti = btnContainerFinder(MbtiBtnContainer, 0);
    const lastname = btnContainerFinder(LastnameBtnContainer, 0);

    color.container.simulate('click');
    expect(wrapper.find(UserSentence).text()).toEqual('');

    mbti.container.simulate('click');
    expect(wrapper.find(UserSentence).text()).toEqual('');

    lastname.container.simulate('click');
    expect(wrapper.find(UserSentence).text()).toEqual(
      `${color.text}을 좋아하는 ${mbti.text}인 ${lastname.text}씨`
    );
  });
});

describe('출력한 이미지의 모서리 스타일 지정', () => {
  it('세가지 borderRadius presets을 선택할 수 있는 버튼이 출력된다.', () => {
    let wrapper = shallow(<ImageEditor />);
    expect(wrapper.find(BorderRadiusBtnContainer).children()).toHaveLength(3);
  });
  it('버튼을 클릭하면 해당 preset으로 모서리 스타일이 지정된다.', () => {
    let wrapper = shallow(<ImageEditor />);
    wrapper.find(BorderRadiusBtnContainer).childAt(0).simulate('click');

    const Image = wrapper.find(CustomImageContainer).childAt(0).getElement()
      .props.style;

    expect(Image.borderRadius).toMatch(`${BorderRadius.SQUARE}%`);
  });
});

describe('출력한 이미지의 테두리 두께 지정.', () => {
  it('네가지 borderWidth presets을 선택할 수 있는 버튼이 출력된다.', () => {
    let wrapper = shallow(<ImageEditor />);
    expect(wrapper.find(BorderWidthBtnContainer).children()).toHaveLength(4);
  });
  it('버튼을 클릭하면 해당 preset으로 테두리 두께가 지정된다.', () => {
    let wrapper = shallow(<ImageEditor />);

    const Image = wrapper.find(CustomImageContainer).childAt(0).getElement()
      .props.style;

    expect(Image.borderWidth).toMatch(`${BorderWidth.NONE}px`);
  });
});

describe('출력한 이미지의 테두리 색상 지정', () => {
  it('일곱가지 borderColor presets을 선택할 수 있는 버튼(팔렛트)이 출력된다.', () => {
    let wrapper = shallow(<ImageEditor />);

    expect(wrapper.find(PaletteColorBtn)).toHaveLength(7);
  });
  it('color picker 기능으로 테두리의 색상을 변경한다.', () => {
    let wrapper = shallow(<ImageEditor />);
    wrapper.find(BorderColorPicker).simulate('change', { hex: '#d7197d' });

    const Image = wrapper.find(CustomImageContainer).childAt(0).getElement()
      .props.style;

    expect(Image.borderColor).toMatch('#d7197d');
  });
  it('color 팔렛트의 버튼을 클릭히면 테두리의 색상이 변경된다.', () => {
    let wrapper = shallow(<ImageEditor />);
    wrapper.find(PaletteColorBtnContainer).childAt(0).simulate('click');

    const Image = wrapper.find(CustomImageContainer).childAt(0).getElement()
      .props.style;

    expect(Image.borderColor).toMatch(`${Object.keys(PaletteColor)[0]}`);
  });
});

// describe('페이지 UI 요소에 색상을 팔렛트에서 선택하거나 RGB값을 직접 입력하여 지정', () => {
//   it('색상을 고를 수 있는 팔렛트가 출력된다.', () => {
//     let wrapper = shallow(<ColorPalette onClick={() => {}} />);
//     expect(wrapper.find(PaletteColorBtn)).toHaveLength(7);
//     // console.log(
//     //   wrapper.find(PaletteColorBtnContainer).childAt(0).getElement().props.style
//     // );
//   });
// it('선택한 색상으로 배경의 색이 변경된다.', () => {});
// it('선택한 색상으로 사용자 이름의 색이 변경된다.', () => {});
// it('선택한 색상으로 소개 문구의 색이 변경된다.', () => {});
// });
