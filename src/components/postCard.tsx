import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';
import Avatar from './avatar'; 

interface PostCardProps {
  title: string;
  body: string;
  userName?: string; 
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, userName, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      {/* Heart pin */}
      <Text style={styles.heart}>💜</Text>

      {/* Avatar + title/body */}
      <View style={styles.row}>
        {userName && <Avatar name={userName} />} {/* <- Added Avatar */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>{title}</Text>
          <Text style={[styles.body, { color: theme.colors.text }]} numberOfLines={2}>
            {body}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  heart: {
    position: 'absolute',
    top: -4,
    left: 8,
    fontSize: 18,
    color: theme.colors.heart,
    transform: [{ rotate: '-20deg' }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default PostCard;
