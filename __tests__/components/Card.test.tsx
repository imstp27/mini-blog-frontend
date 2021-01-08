import React from 'react'
import Card, { MyCardProps } from '@components/Card'
import { shallow, mount, ShallowWrapper } from 'enzyme'
import moment from 'moment';

const mock: MyCardProps = {
    _id: "id",
    name: "name",
    status: "new",
    category: "category",
    content: "content",
    author: { _id: "user", name: "name", image: "image" },
    createdOn: moment().toISOString(),
    user: "user",
    onEdit: () => jest.fn(),
    onDelete: () => jest.fn()
}

describe("Card component", () => {
    test("it's renders with default value", () => {
        const wrapper = shallow(<Card {...mock} />);
        expect(wrapper.exists()).toBe(true);

    });
    test("it's renders with unmatch author", () => {
        const wrapper = shallow(<Card {...mock} user="someone_else" />);
        expect(wrapper.exists()).toBe(true);

    });
    test("it's renders with status publish", () => {
        const wrapper = shallow(<Card {...mock} status="publish" />);
        expect(wrapper.exists()).toBe(true);

    });
    test("it's renders with status draft", () => {
        const wrapper = shallow(<Card {...mock} status="draft" />);
        expect(wrapper.exists()).toBe(true);

    });
    test("it's renders with status banned", () => {
        const wrapper = shallow(<Card {...mock} status="banned" />);
        expect(wrapper.exists()).toBe(true);

    });
});