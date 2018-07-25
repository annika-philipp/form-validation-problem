import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      colour: '',
      animals: [],
      tiger_type: '',
      errors: [],
      valid: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleAnimalChoice = this.handleAnimalChoice.bind(this)
    this.validate = this.validate.bind(this)
    this.addErrorClass = this.addErrorClass.bind(this)
  }

  // update state to reflect what the user types into the form fields/also removes respective error is user corrects missing/wrong entry
  handleInput = (e) => {
    const name = e.target.name
    const {errors} = this.state
    const value = e.target.value
    this.setState({
      [name]: value,
      errors: errors.filter(error => error != name)
    })
  }

  // updates animals array in state, 1st if statement allows for unchecking of prev selected animal
  handleAnimalChoice = (e) => {
    const value = e.target.value
    const {animals, errors} = this.state
    if (animals.includes(value)) {
      this.setState({
        animals: [...animals].filter(animal => animal != value),
      })
    } else {
      this.setState({
        animals: [...animals, value],
        errors: errors.filter(error => error != 'animal')
      })
    }
  }

  validate =(e) => {
    e.preventDefault()
    const {email, password, colour, animals, tiger_type, errors} = this.state
    //check for valid email, regex taken from https://www.w3resource.com/javascript/form/email-validation.php
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) errors.push('email')
    //check if password at least 8 characters
    if (password.length < 8) errors.push('password')
    //check that colour selected
    if (colour.length == 0) errors.push('colour')
    //check that at least 2 animals selected
    if (animals.length < 2) errors.push('animal')
    //check if animals includes tiger, tiger type is given
    if (animals.includes('tiger') && tiger_type == '') errors.push('tiger_type')

    this.setState({
      valid: errors.length == 0, // true only when no errors
      errors
    })
  }

  // to change css class to error - but only if error included in errors array in state
  addErrorClass(error){
    const {errors} = this.state
    return errors.includes(error)
      ? 'error' // className='error'
      : ''
  }
  
  render() {
    const {email, password, colour, errors, valid} = this.state
    return(
      <div>
        <form method='post' action='' onSubmit={this.validate}>
          <div>
            {errors.length > 0 && <div className='error'>Sorry, there were some errors</div>}
          </div>
        
          <div className='h1'>Fill Out This Awesome Form!</div>

          <fieldset className='fieldset'>

            <div className='h3'>Your details</div>

            <div className={this.addErrorClass('email')}>
              <div className='details'>
                <label className='label' htmlFor='email'>
                  Email
                </label>
                <input type='text' id='email' name='email' value={email} onChange={this.handleInput}></input>
                {errors.includes('email') && <p className='required' id='emailError'>Please enter a valid email address</p>}
              </div>
            </div>
            
            <div className={this.addErrorClass('password')}>
              <div className='details'>
                <label className='label' htmlFor='password'>
                  Password
                </label>
                <input type='password' id='password' name='password' placeholder='Password needs at least 8 characters' value={password} onChange={this.handleInput}></input>
                {errors.includes('password') && <p className='required' id='passwordError'>Your password must contain at least 8 characters</p>}
              </div>
            </div>

          </fieldset>

          <fieldset className='fieldset'>

            <div className='h3'>Your Animals</div>

              <div className={this.addErrorClass('colour')}>
              <label className='label' htmlFor='colour'>
                Colour
              </label>
              <select name='colour' id='colour' value={colour} onChange={this.handleInput}>
                  <option value=''>Choose colour</option>
                  <option value='blue'>Blue</option>
                  <option value='green'>Green</option>
                  <option value='red'>Red</option>
                  <option value='black'>Black</option>
                  <option value='brown'>Brown</option>
              </select>
              {errors.includes('colour') && <p className='required' id='colourError'>Please select a colour</p>}
            </div>

            <div className={this.addErrorClass('animal')}>
              <div className='animal-selection'>
                <div>
                  <span className='label'>
                    Animals
                  </span>
                </div>
                <div className='animals'>
                  <div className='animals__individual'>
                    <input type='checkbox' name='animal' value='bear' id='bear' onClick={this.handleAnimalChoice}></input>
                    <label htmlFor='bear'>
                      Bear
                    </label>
                  </div>
                  <div className='animals__individual'>
                    <input type='checkbox' name='animal' value='tiger' id='tiger' onClick={this.handleAnimalChoice}></input>
                    <label htmlFor='tiger'>
                      Tiger
                    </label>
                  </div>
                  <div className='animals__individual'>
                    <input type='checkbox' name='animal' value='snake' id='snake' onClick={this.handleAnimalChoice}></input>
                    <label htmlFor='snake'>
                      Snake
                    </label>
                  </div>
                  <div className='animals__individual'>
                    <input type='checkbox' name='animal' value='donkey' id='donkey' onClick={this.handleAnimalChoice}></input>
                    <label htmlFor='donkey'>
                      Donkey
                    </label>
                  </div>
                </div> 
                {errors.includes('animal') && <p className='required' id='animalError'>Please select at least 2 animals</p>}
              </div> 
            </div>

            <div className={this.addErrorClass('tiger_type')}>
              <div className='details'>
                <label className='label' htmlFor='tiger_type'>
                  Type of tiger
                </label>
                <input type='text' name='tiger_type' id='tiger_type' placeholder='If you selected "tiger", please describe it here.' onChange={this.handleInput}></input>
                {errors.includes('tiger_type') && <p className='required' id='tigerError'>***Please enter your type of tiger***</p>}
              </div>
            </div>

          </fieldset>

          <div>
            {valid && <div id='success' className='h3'>Yay, you just submitted a valid form!</div>}
          </div>

          <fieldset>
            <p>
              <input type='submit' value='Create your account'></input>
            </p>
          </fieldset>
        </form>
    </div>
    )
  }
}

export default Form