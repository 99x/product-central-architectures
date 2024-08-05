import React from 'react';
import { Skeleton as AntSkeleton } from 'antd';

type ButtonShape = 'circle' | 'round' | 'square' | 'default';
type AvatarShape = 'circle' | 'square';

interface BaseSkeletonProps {
  active?: boolean;
  loading?: boolean;
}

interface ButtonSkeletonProps extends BaseSkeletonProps {
  type: 'button';
  shape?: ButtonShape;
  size?: 'large' | 'small' | 'default';
}

interface AvatarSkeletonProps extends BaseSkeletonProps {
  type: 'avatar';
  shape?: AvatarShape;
  size?: 'large' | 'small' | 'default';
}

interface ImageSkeletonProps extends BaseSkeletonProps {
  type: 'image';
}

interface CustomSkeletonProps extends BaseSkeletonProps {
  type: 'custom';
  className?: string;
}

interface DefaultSkeletonProps extends BaseSkeletonProps {
  type?: 'default';
  avatar?: boolean | { size?: 'large' | 'small' | 'default' };
  paragraph?: boolean | { rows?: number; width?: number | string };
  title?: boolean | { width?: number | string };
}

type SkeletonProps =
  | ButtonSkeletonProps
  | AvatarSkeletonProps
  | ImageSkeletonProps
  | CustomSkeletonProps
  | DefaultSkeletonProps;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  switch (props.type) {
    case 'button':
      return (
        <AntSkeleton.Button
          active={props.active}
          size={props.size}
          shape={props.shape}
        />
      );
    case 'image':
      return <AntSkeleton.Image />;
    case 'avatar':
      return (
        <AntSkeleton.Avatar
          active={props.active}
          size={props.size}
          shape={props.shape as AvatarShape}
        />
      );
    case 'custom':
      return (
        <AntSkeleton.Node className={props.className}>
          <div></div>
        </AntSkeleton.Node>
      );
    default:
      return <AntSkeleton {...props} />;
  }
};
