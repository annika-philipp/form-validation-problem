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
  }

  // update state to reflect what the user types into the form fields
  handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  // updates animals array in state, 1st if statement allows for unchecking of prev selected animal
  handleAnimalChoice = (e) => {
    const value = e.target.value
    const {animals} = this.state
    if (animals.includes(value)) {
      this.setState({
        animals: [...animals].filter(animal => animal != value)
      })
    } else {
      this.setState({
        animals: [...animals, value],
      })
    }
  }

  // to do:
  // add validation
  // add error class
  
  render() {
    const {email, password, colour} = this.state
    return(
      <div>
        <form method='post' action=''>
          <div className='h1'>Fill out this awesome form</div>

          <fieldset classname='fieldset'>
            <div className='h3'>Your details</div>
            <div className='details'>
              <label className='label' htmlFor='email'>
                Email
              </label>
              <input type='text' id='email' name='email' value={email} onChange={this.handleInput}></input>
            </div>
            <div>
              <label className='label' htmlFor='password'>
                Password
              </label>
              <input type='password' id='password' name='password' placeholder='Password needs at least 8 characters' value={password} onChange={this.handleInput}></input>
            </div>
          </fieldset>

          <fieldset classname='fieldset'>
            <div className='h3'>Your animal</div>
            <div>
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
            </div>

            <div>
              <div className='animal-selection'>
                <div>
                  <span class='label'>
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
              </div> 
            </div>

            <div>
              <div className='details'>
                <label className='label' htmlFor='tiger_type'>
                  Type of tiger
                </label>
                <input type='text' name='tiger_type' id='tiger_type' placeholder='If you selected "tiger", please describe it here.' onChange={this.handleInput}></input>
              </div>
            </div>
          </fieldset>
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