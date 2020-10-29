import React from 'react';
import Product from '../../Product'
import './SliderListProducts'
import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { LinearProgress } from '@material-ui/core';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y]);


const SliderListProducts = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    swiper: {
      height: 460
    },
    swiperSlide: {
      padding: "2rem 0",
      width: '180px!important',
      height: 380,
      '&:hover': {
        height:'100%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '260px!important'
      }
    }
  })
  const classes = useStyles()
  const { loading, error, data } = useQuery(products);

  if (loading) {
     return (
        <h1> <LinearProgress /> </h1>
     )
  }

  if (error) {
     console.dir(error)
     return <h1> error </h1>;
  }
    return (
        <Swiper
          spaceBetween={10}
          slidesPerView='auto'
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className={classes.swiper}
        >
          {
            data.products.listProducts.data.map((prod) => (
              <SwiperSlide key={prod.id} className={classes.swiperSlide}>
               <Product {...prod} />
               </SwiperSlide>
            ))
         }
        </Swiper>
      );
}

export default SliderListProducts;

