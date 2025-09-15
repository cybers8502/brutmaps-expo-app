import Svg, {Path} from 'react-native-svg';
import React from 'react';
import IconsProps from '@/components/Icons/IconsProps';
import COLORS from '@/constants/Colors';

export default function IconFilter({size = 18, color = COLORS.textWhite}: IconsProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 18 18' fill='none'>
      <Path
        d='M5.25569 7.7181L0.434273 2.15493C-0.126953 1.50736 0.333037 0.5 1.18996 0.5H16.1988C17.0732 0.5 17.5264 1.5431 16.9298 2.18232L11.7689 7.71184C11.5961 7.89702 11.5 8.14087 11.5 8.39416V14.882C11.5 15.2607 11.286 15.607 10.9472 15.7764L6.94721 17.7764C6.28231 18.1088 5.5 17.6253 5.5 16.882V8.37303C5.5 8.13244 5.41326 7.89991 5.25569 7.7181Z'
        fill={color}
      />
    </Svg>
  );
}
