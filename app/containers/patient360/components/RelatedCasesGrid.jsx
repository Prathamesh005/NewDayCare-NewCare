import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { compose } from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { MessageComponent } from '../../../components';
import CardDemo from './SearchpatientCard';

const useStyles = makeStyles({
  gridRoot: {
    // width: "100vw",
    // margin: "0 auto"
    padding: 20,
  },
  gridRoot1: {
    width: '100vw',
    margin: '0 auto',
  },
  sliderContainer: {
    '& .slick-slide img': {
      display: 'unset !important',
    },
  },
});

function RelatedCasesGrid(props) {
  const classes = useStyles();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          height: '35px',
          width: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ff9f9f',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          zIndex: 1,
          height: '35px',
          width: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ff9f9f',
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.sidebarShow ? 2 : 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: classes.sliderContainer,
    // autoplay:true,
    // autoplaySpeed:3000
  };

  let Data = props.relatedCasesData && props.relatedCasesData.cancerPatients;
  return (
    <>
      {(Data && Data.length >= 3) || props.sidebarShow ? (
        <Grid item xs={12} className={classes.gridRoot}>
          <Slider {...settings}>
            {Data &&
              Data.map((x, index) => {
                return (
                  <div key={(index + 1).toString()}>
                    <CardDemo
                      display={x.patient.display}
                      first={x.patient.first}
                      last={x.patient.last}
                      age={x.patient.age}
                      gender={x.patient.gender}
                      resourceId={x.patient.resourceId}
                      address={x.patient.address}
                      image={x.patient.image}
                      // open={data.isDrawerOpen}

                      disease={
                        x.primaryCancerCondition.code != null
                          ? x.primaryCancerCondition.code.display
                          : null
                      }
                    />
                  </div>
                );
              })}
          </Slider>
        </Grid>
      ) : (
        Data &&
        Data.map((x, index) => {
          return (
            <Grid item sm={4} xs={12} key={(index + 1).toString()}>
              <CardDemo
                display={x.patient.display}
                first={x.patient.first}
                last={x.patient.last}
                age={x.patient.age}
                gender={x.patient.gender}
                resourceId={x.patient.resourceId}
                address={x.patient.address}
                image={x.patient.image}
                // open={data.isDrawerOpen}

                disease={
                  x.primaryCancerCondition.code != null
                    ? x.primaryCancerCondition.code.display
                    : null
                }
              />
            </Grid>
          );
        })
      )}
    </>
  );
}

const mapStateToProps = state => state.patient360;

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  MessageComponent,
)(RelatedCasesGrid);
