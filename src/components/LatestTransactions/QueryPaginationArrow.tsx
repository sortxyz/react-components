import styles from '../styles/global.module.css';

interface QueryPaginationArrowProps {
  theme: string;
  direction: 'left' | 'right';
  isActive: boolean;
  onClick: () => void;
}

const QueryPaginationArrow = ({
  theme,
  isActive,
  direction,
  onClick,
}: QueryPaginationArrowProps) => {
  const classNameSuffix = isActive ? '' : '-grey';
  const className = styles[`${theme}-${direction}${classNameSuffix}`];
  const arrow = direction === 'left' ? '\u2039' : '\u203A';

  return (
    <li
      onClick={isActive ? onClick : undefined}
      className={className}
      data-testid={`${direction}-arrow`}
    >
      <span aria-hidden="true">{arrow}</span>
    </li>
  );
};

export default QueryPaginationArrow;
