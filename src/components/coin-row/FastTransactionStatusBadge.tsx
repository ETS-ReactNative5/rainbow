import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Spinner from '../Spinner';
import { Icon } from '../icons';
import { ThemeType } from '@rainbow-me/context';
import { Text } from '@rainbow-me/design-system';
import { TransactionStatusTypes } from '@rainbow-me/entities';
import { position } from '@rainbow-me/styles';

const StatusProps = {
  [TransactionStatusTypes.approved]: {
    marginRight: 4,
    name: 'dot',
  },
  [TransactionStatusTypes.cancelled]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.cancelling]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.deposited]: {
    name: 'sunflower',
    style: { fontSize: 11, left: -1.3, marginBottom: 1.5, marginRight: 1 },
  },
  [TransactionStatusTypes.depositing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.approving]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.swapping]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.speeding_up]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.failed]: {
    marginRight: 4,
    name: 'closeCircled',
    style: position.maxSizeAsObject(12),
  },
  [TransactionStatusTypes.purchased]: {
    marginRight: 2,
    name: 'arrow',
  },
  [TransactionStatusTypes.purchasing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.received]: {
    marginRight: 2,
    name: 'arrow',
  },
  [TransactionStatusTypes.self]: {
    marginRight: 4,
    name: 'dot',
  },
  [TransactionStatusTypes.sending]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.sent]: {
    marginRight: 3,
    name: 'sendSmall',
  },
  [TransactionStatusTypes.swapped]: {
    marginRight: 3,
    name: 'swap',
    small: true,
    style: position.maxSizeAsObject(12),
  },
  [TransactionStatusTypes.contract_interaction]: {
    name: 'robot',
    style: { fontSize: 11, left: -1.3, marginBottom: 1.5, marginRight: 1 },
  },
  [TransactionStatusTypes.swapping]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.withdrawing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.withdrew]: {
    name: 'sunflower',
    style: { fontSize: 11, left: -1.3, marginBottom: 1.5, marginRight: 1 },
  },
};

const cx = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const FastTransactionStatusBadge = ({
  pending,
  status,
  style,
  title,
  colors,
}: {
  colors: ThemeType['colors'];
  pending: boolean;
  status: keyof typeof TransactionStatusTypes;
  title: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const isSwapping = status === TransactionStatusTypes.swapping;

  let statusColor = colors.statusColor;
  if (pending) {
    if (isSwapping) {
      statusColor = colors.swapPurple;
    } else {
      statusColor = colors.appleBlue;
    }
  } else if (status === TransactionStatusTypes.swapped) {
    statusColor = colors.swapPurple;
  }

  return (
    <View style={[cx.row, style]}>
      {pending && (
        <Spinner
          color={isSwapping ? colors.swapPurple : colors.appleBlue}
          size={12}
        />
      )}
      {status && Object.keys(StatusProps).includes(status) && (
        <Icon
          color={statusColor}
          style={position.maxSizeAsObject(10)}
          {...StatusProps[status]}
        />
      )}
      <Text color={{ custom: statusColor }} size="14px" weight="semibold">
        {title}
      </Text>
    </View>
  );
};

export default React.memo(FastTransactionStatusBadge);
