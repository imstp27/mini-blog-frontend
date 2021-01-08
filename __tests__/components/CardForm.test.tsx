import React from 'react'
import { CardForm, CardFormProps } from '@components/CardForm'
import { shallow, mount, ShallowWrapper } from 'enzyme'
import moment from 'moment';

const mock: CardFormProps = {
    editData: {
        _id: "id",
        name: "name",
        status: "new",
        category: "biology",
        content: "content",
        author: { _id: "user", name: "name", image: "image" },
        createdOn: moment().toISOString(),
        user: "user",
        onEdit: () => jest.fn(),
        onDelete: () => jest.fn()
    },
    onSubmit: () => jest.fn()
}

describe("CardForm component", () => {
    let wrapper: ShallowWrapper<CardFormProps>
    beforeAll(() => {
        wrapper = shallow(<CardForm {...mock} />);
    })
    it("should renders", () => {
        expect(wrapper.exists()).toBe(true);
    });
    it("should match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});