import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Tabs, Tab, } from '@mui/material';

import CategoryCard from './CategoryCard';

CategoriesCarousel.propTypes = {
    items: PropTypes.array.isRequired,
    returnSelectedCategory: PropTypes.func.isRequired
  };


export default function CategoriesCarousel ({items, returnSelectedCategory}) {

    const [selectedItem, setSelectedItem]=useState(null)

    useEffect(()=>{
        setSelectedItem(items?.[0]?._id);
    },[items])

    useEffect(()=>{
        returnSelectedCategory(selectedItem)
    },[returnSelectedCategory, selectedItem])

    return <Box style={{maxWidth: '100%'}}>
        <Tabs
        value={selectedItem}
        onChange={(event, value)=>{
            setSelectedItem(value)
        }}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable'
        indicatorColor=''
         >
{items?.map((item, index)=>{
 
    const { _id : id, name, imageURL} = item
    return <Tab key={index}
    value={id}
    component={() => (<CategoryCard id={id} name={name?.en} imageURL={imageURL} isSelected={id=== selectedItem} onPress={(val)=>{setSelectedItem(val)}}/>)}
    
    />

})}
            </Tabs>
    </Box>
}

