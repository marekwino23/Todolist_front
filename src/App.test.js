import {mount} from '@vue/test-utils';
import App from "./App.vue";

test('load links', () => {
const wrapper = mount(App)
    const name = wrapper.get('[data-test="status"]')
    expect(name.text()).toContain(false)
})