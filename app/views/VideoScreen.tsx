import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const TubeItem = props => {
  const videoChoice = () => {
    props.chooseVid(props.id);
  };

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          paddingTop: 20,
          alignItems: 'center',
          borderTopColor: '#000000',
          borderTopWidth: 2,
        }}>
        <Image
          style={{width: '100%', height: 200}}
          source={{uri: props.imageSrc}}
        />
        <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const VideoScreen = ({navigation}) => {
  const [listLoaded, setListLoaded] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const getVids = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyB6Zsm_uze2A0GrWEavpc-GLL0hBsmXktc`,
      );
      const vids = await response.json();
      setVideoList(Array.from(vids.items));
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setListLoaded(true);
    }
  };

  useEffect(() => {
    getVids();
  }, []);

  const selectVid = vidID => {
    navigation.navigate('VideoDetail', {vidID: vidID});
  };

  return (
    <View>
      {listLoaded && (
        <View style={{paddingTop: 30}}>
          <FlatList
            data={videoList}
            renderItem={item => {
              console.log('ITEM VIDEO', item);
              return (
                <TubeItem
                  id={item.item.id.videoId}
                  title={item.item.snippet.title}
                  imageSrc={item.item.snippet.thumbnails.high.url}
                  chooseVid={selectVid}
                />
              );
            }}
          />
        </View>
      )}

      {!listLoaded && (
        <View style={{paddingTop: 30}}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default VideoScreen;
