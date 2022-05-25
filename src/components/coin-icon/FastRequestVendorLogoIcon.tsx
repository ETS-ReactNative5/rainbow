import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { initials } from '../../utils';
import ChainBadge from '../coin-icon/ChainBadge';
import { Text } from '../text';
import { CoinIconSize } from './CoinIcon';
import { ImgixImage } from '@rainbow-me/images';
import { position } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const RVLIBorderRadius = 16.25;
const RVLIShadows = (colors: ReturnType<typeof useTheme>['colors']) => ({
  default: [[0, 4, 12, colors.shadow, 0.06]],
  large: [[0, 6, 10, colors.shadow, 0.14]],
  none: [[0, 0, 0, colors.transparent, 0]],
});

export default function RequestVendorLogoIcon({
  backgroundColor,
  badgeYPosition = 14,
  borderRadius = RVLIBorderRadius,
  dappName,
  imageUrl,
  noShadow,
  shouldPrioritizeImageLoading,
  showLargeShadow,
  size = CoinIconSize,
  network,
  ...props
}: {
  backgroundColor?: string;
  badgeYPosition?: number;
  borderRadius?: number;
  dappName: string;
  imageUrl: string;
  noShadow?: boolean;
  shouldPrioritizeImageLoading?: boolean;
  showLargeShadow?: boolean;
  size?: number;
  network?: string;
}) {
  const [error, setError] = useState(false);
  const { colors } = useTheme();

  // When dapps have no icon the bgColor provided to us is transparent.
  // Having a transparent background breaks our UI, so we instead show a background
  // color of white.
  const bgColor =
    backgroundColor === 'transparent'
      ? colors.white
      : backgroundColor || colors.dark;

  const imageSource = useMemo(
    () => ({
      priority:
        ImgixImage.priority[shouldPrioritizeImageLoading ? 'high' : 'low'],
      uri: imageUrl,
    }),
    [imageUrl, shouldPrioritizeImageLoading]
  );

  return (
    <View>
      {/* @ts-ignore ShadowStack is not in TS */}
      <ShadowStack
        {...props}
        {...position.sizeAsObject(size)}
        backgroundColor={colors.white}
        borderRadius={borderRadius}
        shadows={
          RVLIShadows(colors)[
            noShadow ? 'none' : showLargeShadow ? 'large' : 'default'
          ]
        }
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: bgColor,
            justifyContent: 'center',
            ...position.sizeAsObject(size),
          }}
        >
          {imageUrl && !error ? (
            <ImgixImage
              onError={() => setError(true)}
              source={imageSource}
              style={position.sizeAsObject('100%')}
            />
          ) : (
            <Text
              align="center"
              color={colors.getFallbackTextColor(bgColor)}
              size="smedium"
              weight="semibold"
            >
              {initials(dappName)}
            </Text>
          )}
        </View>
      </ShadowStack>
      <ChainBadge assetType={network} badgeYPosition={badgeYPosition} />
    </View>
  );
}
