import {View, Text} from 'react-native';
import React from 'react';
import Masonry from 'react-masonry-component';

const ReactMasonryComponent = childElements => {
  return (
    <View>
      <Text>ReactMasonryComponent</Text>
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'ul'} // default 'div'
        // options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        // imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {childElements}
      </Masonry>
    </View>
  );
};

export default ReactMasonryComponent;
