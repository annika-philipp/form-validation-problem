import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import Form from '../components/Form'
import './setup-dom'

// Test suite setup
test('Test suite working', () => {
  expect(true).toBeTruthy
})

// Initial State
test('Initial State gets returned correclt', () => {
  const expected = {
    email: '',
    password: '',
    colour: '',
    animals: [],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const wrapper = shallow(<Form />)
  const actual = wrapper.instance().state
    expect(actual).toEqual(expected)
})

// User Input gets handled
test('handleInput adds to state', () => {
  const initialState = {
    colour: '',
    errors: []
  }

  const testEvent = {
    target: {
      name: 'colour',
      value: 'blue'
    }
  }

  const expected = {
    colour: 'blue',
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleInput(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})

test('handleInput removes appropriate error from state on change', () => {
  const initialState = {
    email: '@foo.com',
    errors: ['email']
  }

  const testEvent = {
    target: {
      name: 'email',
      value: 'bar@foo.com'
    }
  }

  const expected = {
    email: 'bar@foo.com',
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleInput(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})

test('handleAnimalChoice adds to empty state', () => {
  const initialState = {
    animals: [],
    errors: []
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'tiger'
    }
  }

  const expected = {
    animals: ['tiger'],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})


test('handleAnimalChoice filters out animals when user unchecks them', () => {

  const initialState = {
    animals: ['bear', 'tiger'],
    errors: []
  }

  const testEvent = {
    target: {
      name: 'animal',
      value: 'tiger'
    }
  }

  const expected = {
    animals: ['bear'],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})

test('handleAnimalChoice removes animal error from state on change (once second animal gets selected)', () => {
  const initialState = {
    animals: ['bear'],
    errors: ['animal']
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'tiger'
    }
  }

  const expected = {
    animals: ['bear', 'tiger'],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})

test('handleAnimalChoice prevents animal being selected twice/removes them from array)', () => {
  const initialState = {
    animals: ['snake']
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'snake'
    }
  }

  const expected = {
    animals: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)

})

// onSubmit validation
test('validate recognises valid inputs in state', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foofoofoo',
    colour: 'blue',
    animals: ['snake', 'donkey'],
    tiger_type: '',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    valid: true
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

// The following test have been written post the 2hr mark //

test('validate recognises valid inputs in state with Tiger', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foofoofoo',
    colour: 'blue',
    animals: ['snake', 'tiger'],
    tiger_type: 'happy',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    valid: true
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

/* According to https://www.w3resource.com/javascript/form/email-validation.php documentation for email validation regex 
    the following emails will be valid:
    mysite@ourearth.com
    my.ownsite@ourearth.org
    mysite@you.me.net
    Example of invalid email id
    
    the following emails will be invalid:
    mysite.ourearth.com [@ is not present] 
    mysite@.com.my [ tld (Top Level domain) can not start with dot "." ]
    @you.me.net [ No character before @ ]
    mysite123@gmail.b [ ".b" is not a valid tld ]
    mysite@.org.org [ tld can not start with dot "." ]
    .mysite@mysite.org [ an email should not be start with "." ]
    mysite()*@gmail.com [ here the regular expression only allows character, digit, underscore, and dash ]
    mysite..1234@yahoo.com [double dots are not allowed]

    *** this should be included in my own testing with more time ***
*/

test('validate recognises invalid email input', () => {
  const initialState = {
    email: '@foo.com' || 'mysite.ourearth.com',
    password: 'foofoofoo',
    colour: 'blue',
    animals: ['snake', 'tiger'],
    tiger_type: 'happy',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    errors: ['email']
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid password input', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foobar',
    colour: 'blue',
    animals: ['snake', 'tiger'],
    tiger_type: 'happy',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    errors: ['password']
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid colour input', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foobarbar',
    colour: '',
    animals: ['snake', 'tiger'],
    tiger_type: 'happy',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    errors: ['colour']
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid animal input', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foobarbar',
    colour: 'blue',
    animals: ['snake'],
    tiger_type: 'happy',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    errors: ['animal']
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid tiger input', () => {
  const initialState = {
    email: 'bar@foo.com',
    password: 'foobarbar',
    colour: 'blue',
    animals: ['snake', 'tiger'],
    tiger_type: '',
    errors: [],
    valid: false
  }

  const expected = {
    ...initialState,
    errors: ['tiger_type']
  }

  const e = {
    preventDefault: () => ({})
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

// Errors

test('email error text displays when error in state', () => {
  const state = {
    errors: ['email']
  }

  const expected = 'Please enter a valid email address'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#emailError').text()).toBe(expected)
})

test('password error text displays when error in state', () => {
  const state = {
    errors: ['password']
  }

  const expected = 'Your password must contain at least 8 characters'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#passwordError').text()).toBe(expected)
})

test('colour error text displays when error in state', () => {
  const state = {
    errors: ['colour']
  }

  const expected = 'Please select a colour'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#colourError').text()).toBe(expected)
})

test('animal error text displays when error in state', () => {
  const state = {
    errors: ['animal']
  }

  const expected = 'Please select at least 2 animals'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#animalError').text()).toBe(expected)
})

test('tiger error text displays when error in state', () => {
  const state = {
    errors: ['tiger_type']
  }

  const expected = '***Please enter your type of tiger***'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#tigerError').text()).toBe(expected)
})


// Success message on Submit
test('Success message gets displayed when valid form submit is true', () => {
  const state = {
    valid: true,
    errors: []
  }

  const expected = 'Yay, you just submitted a valid form!'

  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#success').text()).toBe(expected)
})
