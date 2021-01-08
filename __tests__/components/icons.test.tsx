import React from 'react'
import { CircleOutlined } from '@components/icons'
import { shallow, mount, ShallowWrapper } from 'enzyme'

describe("Card component", () => {
    let wrapper: ShallowWrapper
    beforeAll(() => {
        wrapper = shallow(<CircleOutlined />);
    })
    test("it's renders", () => {
        expect(wrapper.exists()).toBe(true);
    });
    test("it's must match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});