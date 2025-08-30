import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PostCard from '../components/postCard';
import { fetchPostsWithUsers } from '../api/gorest';
import theme from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postsWithUsers = await fetchPostsWithUsers();
      setPosts(postsWithUsers);
    };
    loadPosts();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.textInverse,
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            body={item.body}
            userName={item.user?.name || "?"} // <- now using actual user name
            onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default HomeScreen;
