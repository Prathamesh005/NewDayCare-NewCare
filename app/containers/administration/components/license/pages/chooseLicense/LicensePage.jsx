import React, { useState, Fragment } from 'react'
import LicenseCard from '../../component/LicenseCard'
import { OuterBoxPaper } from '../../../../../../components'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'


const Licensepage = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)

  const data = [
    {
      id: '1',
      title: '7 Day free Trial',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '2',
      title: 'License Pack Title2',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '3',
      title: 'License Pack Title 3',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '4',
      title: 'License Pack Title 4',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '5',
      title: 'License Pack Title 5',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '6',
      title: 'License Pack Title 6',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '7',
      title: '7 Day free Trial2',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '8',
      title: 'License Pack Title8',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '9',
      title: 'License Pack Title 9',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '10',
      title: 'License Pack Title 10',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '11',
      title: 'License Pack Title 11 ',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    },
    {
      id: '12',
      title: 'License Pack Title 6',
      subheader: 'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        { parameter: 'Parameter One', price: 100, parameterValidation: 'parameterOne' },
        { parameter: 'Parameter Two', price: 300, parameterValidation: 'parameterTwo' },
        { parameter: 'Parameter Three', price: 100, parameterValidation: 'parameterThree' },
        { parameter: 'Parameter Four', price: 100, parameterValidation: 'parameterFour' },
        { parameter: 'Parameter FIve', price: 400, parameterValidation: 'parameterFive' },
      ]
    }
  ]


  const BottomComponent = (props) => {
    const [id, setId] = useState('')
    const [state, setState] = useState(null)

    const handleLicense = (id, data) => {
      setId(id)
      setState(data)
    }

    const moveAhead = () => {
      console.log(value);
      value === -110 * (data.length - 4)
        ? setValue(0)
        : setValue(value - 110);
    };
    const moveBehind = () => {
      console.log(value);
      value === 0
        ? setValue(-110 * (data.length - 4))
        : setValue(value + 110);
    };
    return (
      <>
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          navButtonsProps={{
            style: {
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 0px 10px #00000029',
              color: '#FF3399',
              width: 36,
              height: 36,
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#FF3399'
              }

            }
          }}

          next={() => { moveAhead() }}
          prev={() => { moveBehind() }}

        >
          <Grid style={{ display: 'flex', flexDirection: 'row' }}>
            {data.map((ele, index) => {
              return <Fragment key={index} >
                {/* <Grid item lg={3} > */}
                <div style={{ transform: `translateX(${value}%)`, margin: 7 }} >
                  <LicenseCard data={ele} handleLicense={handleLicense} id={id} state={state} />
                </div>
                {/* </Grid> */}
              </Fragment>
            })
            }
          </Grid>
        </Carousel>


      </>
    )
  }

  const close = () => {
    history.goBack()
  }

  return (
    <div>
      <OuterBoxPaper
        title={'Choose a License'}
        bottomComponent={BottomComponent()}
        handleClose={close}
        bottomHeight={'75vh'}
      />

    </div>
  )
}

export default Licensepage
