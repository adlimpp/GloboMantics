import React, {useState, useEffect} from 'react';
import {FlatList, Text, useWindowDimensions, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
const BlogItem = (props: any) => {
  const {width} = useWindowDimensions();
  const rendererProps = {
    a: {
      onPress(event: any, url: any, htmlAttributes: any, target: any) {
        props.choosePost(props.id);
      },
    },
  };

  const blogItems = {
    html: `
        <a
        href=${props.id}
        style="text-decoration-line: none; color:#000000; textAlign:center"
        >
        <img src=${props.imageSrc}/>
        <h1>${props.title}</h1>
        ${props.excerpt}
        </a>
        `,
  };

  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        borderStyle: 'solid',
      }}>
      <RenderHtml
        source={blogItems}
        renderersProps={rendererProps}
        contentWidth={width}
      />
    </View>
  );
};

const BlogScreen = ({navigation}) => {
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts',
      );
      const jsonResponse = await response.json();
      setBlogList(Array.from(jsonResponse.posts));
    } catch (error) {
      console.log('Error', error);
    } finally {
      setBlogLoaded(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const chooseBlog = (blogID: any) => {
    navigation.navigate('BlogDetail', {blogId: blogID});
  };
  return (
    <View>
      {blogLoaded && (
        <View style={{paddingTop: 40}}>
          <FlatList
            data={blogList}
            renderItem={({item}) => (
              <BlogItem
                id={item.ID}
                title={item.title}
                imageSrc={item.featured_image}
                excerpt={item.excerp}
                choosePost={chooseBlog}
              />
            )}
            keyExtractor={item => item.ID.toString()}
          />
        </View>
      )}
      {!blogLoaded && (
        <View style={{padding: 30}}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};
export default BlogScreen;
