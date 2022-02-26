import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph, Title, Divider } from 'react-native-paper';

import colors from '../config/colors';

const ReminderBadge = ({
  reminderTime,
  reminderContent,
  reminderType,
  reminderStatus,
}) => {
  const [icon, setIcon] = useState('');
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    if (reminderStatus === 'complete') {
      setIconColor(colors.accept);
    } else if (reminderStatus === 'rejected') {
      setIconColor(colors.reject);
    } else {
      setIconColor(colors.caution);
    }

    if (reminderStatus === 'complete') {
      setIcon('check-bold');
    } else if (reminderStatus === 'rejected') {
      setIcon('close-circle');
    } else {
      if (reminderType === 'medication') {
        setIcon('pill');
      } else if (reminderType === 'appointment') {
        setIcon('calendar');
      } else if (reminderType === 'exercise') {
        setIcon('walk');
      } else if (reminderType === 'diet') {
        setIcon('food');
      } else {
        setIcon('alert-circle-outline');
      }
    }
  }, [reminderStatus, reminderType]);

  const handlePressIn = () => {
    // do something like re route to the actual card - maybe pop a modal?
    console.log('Pressed');
  };

  return (
    <Card onPress={handlePressIn}>
      <View style={styles.innerContainer}>
        <Avatar.Icon
          icon={icon}
          backgroundColor={iconColor}
          style={styles.iconCircle}
        />
        <Title
          style={{
            fontSize: 30,
          }}
        >
          {reminderTime}
        </Title>
      </View>
      <View>
        <Paragraph style={styles.content}>{reminderContent}</Paragraph>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});

export default ReminderBadge;
