import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface CommentProps {
  name: string;
  body: string;
}

const CommentCard: React.FC<CommentProps> = ({ name, body }) => {
  return (
    <View style={[styles.commentBox, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.name, { color: theme.colors.primary }]}>{name}</Text>
      <Text style={[styles.body, { color: theme.colors.text }]}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    padding: 12,
    borderRadius: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default CommentCard;
