import {useEffect, useState} from 'react';
import {Image, ScrollView, Text, useWindowDimensions, View} from 'react-native';
import RenderHTML, { MixedStyleDeclaration } from 'react-native-render-html';

const BlogDetailScreen = ({route, navigation}) => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postID, setPostID] = useState('');
  const {width} = useWindowDimensions();
  const {blogId} = route.params;

  const getPosts = async () => {
    try {
      const response = await fetch(
        `https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts/${blogId}`,
      );
      const post = await response.json();
      setPostTitle(post.title);
      setPostImage(post.featured_image);
      setPostContent(post.content);
      setPostID(post.ID);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoaded(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const blogTagStyles: Record<string, MixedStyleDeclaration> = {
    img: {display: 'none' as 'none'},  // Explicitly typing 'none'
  };

  const blogClassStyles = {
    blTitle: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    blContent: {marginLeft: 10, marginRight: 10},
    blBack: {marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20},
  };

  const postDetails = {
    html: ` 
        <div class="blTitle">
            <h1>${postTitle}</h1>
        </div>
        <div class="blContent">
            <h1>${postContent}</h1>
        </div>

        <div class="blBack>
            <a href=${postID} style="textDecorationLine: none; color: #000000">
                <h2>GO BACK</h2>
            </a>
        </div>
        `,
  };

  const renderersProps = {
    a: {
      onPress(event, url, htmlAttribs, target) {
        navigation.navigate('Blog');
      },
    },
  };

  return (
    <View style={{paddingTop: 30}}>
      {postLoaded && (
        <ScrollView>
          <Image
            style={{width: '100%', height: 200}}
            source={{uri: postImage}}
          />

          <RenderHTML
            source={postDetails}
            tagsStyles={blogTagStyles}
            classesStyles={blogClassStyles}
            renderersProps={renderersProps}
            contentWidth={width}
          />
        </ScrollView>
      )}

      {!postLoaded && (
        <View style={{padding: 30, alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default BlogDetailScreen;
