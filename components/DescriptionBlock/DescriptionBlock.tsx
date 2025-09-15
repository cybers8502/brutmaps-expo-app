import React, {useMemo} from 'react';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import FONT_SiZE from '@/constants/Text';
import COLORS from '@/constants/Colors';

interface DescriptionBlockProps {
  description?: string | null;
}

export default function DescriptionBlock({description}: DescriptionBlockProps) {
  const {width} = useWindowDimensions();

  const hasContent = !!description && description.trim().length > 0;

  const source = useMemo(() => (hasContent ? {html: description} : {html: ''}), [hasContent, description]);

  const baseStyle = useMemo(
    () => ({color: COLORS.textWhite, fontSize: FONT_SiZE.primary, lineHeight: 24}),
    [],
  );

  if (!hasContent) return null;

  return <RenderHTML contentWidth={width} source={source} baseStyle={baseStyle} />;
}
