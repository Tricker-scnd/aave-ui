import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import goToTop from '../../../helpers/goToTop';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';
import IsolatedBadge from '../../isolationMode/IsolatedBadge';

import staticStyles from './style';

interface MobileCardWrapperProps {
  onClick?: () => void;
  disabled?: boolean;
  withGoToTop?: boolean;
  symbol: string;
  className?: string;
  isIsolated?: boolean;
  subSymbolComponent?: ReactNode;
  children: ReactNode;
}

export default function MobileCardWrapper({
  symbol,
  onClick,
  disabled,
  withGoToTop,
  className,
  isIsolated,
  subSymbolComponent,
  children,
}: MobileCardWrapperProps) {
  const { currentTheme } = useThemeContext();

  const asset = getAssetInfo(symbol);

  return (
    <div
      className={classNames('MobileCardWrapper', className)}
      onClick={() => {
        !disabled && onClick && onClick();
        withGoToTop && goToTop();
      }}
    >
      <div className="MobileCardWrapper__symbol--inner">
        <div className="MobileCardWrapper__symbol">
          <TokenIcon tokenSymbol={symbol} height={24} width={24} tokenFullName={asset.name} />
          {isIsolated && <IsolatedBadge />}
        </div>

        {subSymbolComponent}
      </div>

      <div className="MobileCardWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MobileCardWrapper {
          background: ${currentTheme.whiteElement.hex};

          &__symbol--inner {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
