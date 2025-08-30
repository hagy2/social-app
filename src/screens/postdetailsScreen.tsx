import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Post, Comment, User } from '../types';
import theme from '../theme';
import { fetchFullPost } from '../api/gorest';
import Avatar from '../components/avatar';
import CommentCard from '../components/CommentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

const PostDetails: React.FC<Props> = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Set purple header like Home
    navigation.setOptions({
      title: 'Post Details',
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.textInverse,
    });

    fetchFullPost(postId).then(({ post, user, comments }) => {
      setPost(post);
      setUser(user);
      setComments(comments);
    });
  }, [postId, navigation]);

  if (!post) return <Text style={[styles.loading, { color: theme.colors.text }]}>Loading...</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Post Header: Avatar + Title + Author */}
      <View style={styles.postHeader}>
        {user && <Avatar name={user.name} />}
        <View style={styles.postText}>
          <Text style={[styles.postTitle, { color: theme.colors.primary }]}>{post.title}</Text>
          {user?.name && (
            <Text style={[styles.userName, { color: theme.colors.textLight }]}>{user.name}</Text>
          )}
        </View>
      </View>

      {/* Post Body */}
      <Text style={[styles.postBody, { color: theme.colors.text }]}>{post.body}</Text>

      {/* Comments Section */}
      <Text style={[styles.commentHeader, { color: theme.colors.primary }]}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <Avatar name={item.name} />
            <View style={{ flex: 1 }}>
              <CommentCard name={item.name} body={item.body} />
            </View>
          </View>
        )}
        scrollEnabled={false} // ScrollView handles scrolling
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postText: {
    flex: 1,
    marginLeft: 8,
  },
  postTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  postBody: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  commentHeader: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
});

export default PostDetails;
