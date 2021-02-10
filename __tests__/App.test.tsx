import { shallow, mount } from 'enzyme';
import { ImageData } from '../src/types';
import { v4 as uuidv4 } from 'uuid';

import ImageContainer, {
  ImageCard,
  PleaseUploadImages,
  MinImageCount,
} from '../src/ImageConatiner';
import Username from '../src/Username';

const buildImages = (count: number) => {
  return Array.from(Array(count)).map(() => {
    return { url: '', uid: uuidv4() } as ImageData;
  });
};

describe('아무것도 없는 프로필 페이지 표시', () => {
  it('이미지가 없으면 아무것도 출력하지 않는다.', () => {
    let wrapper;
    const images = buildImages(3);

    [
      [0, 0],
      [0, 1],
      [0, 2],
    ].forEach(([s, e]) => {
      wrapper = shallow(
        <ImageContainer
          images={images.slice(s, e)}
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
    let wrapper;
    let images = buildImages(14);

    wrapper = shallow(
      <ImageContainer images={images} minImageCount={3} maxImageCount={12} />
    );
    expect(wrapper.find(ImageCard)).toHaveLength(12);
  });

  it('최소 이미지 개수 안내문이 정상적으로 출력된다.', () => {
    let wrapper;
    let images: ImageData[] = [];
    const minImageCount = 3;

    wrapper = shallow(
      <ImageContainer
        images={images}
        minImageCount={minImageCount}
        maxImageCount={12}
      />
    );
    expect(wrapper.find(MinImageCount)).toHaveLength(1);
    expect(wrapper.find(MinImageCount).text()).toEqual(
      minImageCount.toString()
    );
  });
});

describe('사용자 이름 표시', () => {
  it('사용자의 이름이 출력된다.', () => {
    let wrapper;
    const name = '김태연';

    wrapper = shallow(<Username name={name} maxLength={12} />);
    expect(wrapper.text()).toEqual(name);
  });

  it('최대 글자수만큼만 출력된다.', () => {
    let wrapper;
    const name = '김태연김태연김태연김태연김태연';
    const maxLength = 12;

    wrapper = shallow(<Username name={name} maxLength={maxLength} />);
    expect(wrapper.text()).toHaveLength(maxLength);
  });
});
