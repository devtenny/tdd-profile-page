import { shallow, mount } from 'enzyme';
import {ImageData} from '../src/types';

import ImageContainer, {
  ImageCard,
  PleaseUploadImages,
} from '../src/ImageConatiner';

describe('아무것도 없는 프로필 페이지 표시', () => {
  it('이미지가 없으면 아무것도 출력하지 않는다.', () => {
    let wrapper;
    const images: ImageData[] = [
      {url: ''},
      {url: ''},
      {url: ''},
    ];

    [[0, 0], [0, 1], [0, 2]].forEach(([s, e]) => {
      wrapper = shallow(<ImageContainer images={images.slice(s, e)} minImageCount={3} />);
      expect(wrapper.find(PleaseUploadImages)).not.toBeNull();
    });

    wrapper = shallow(<ImageContainer images={images} minImageCount={3} />);
    expect(wrapper.find(ImageCard)).toHaveLength(images.length);
  });
});

