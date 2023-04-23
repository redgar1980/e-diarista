import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import { BreadCrumberContainer, BreadCrumberItem } from "./BreadCrumb.styled";

export interface BreadCrumbProps {
  items: string[];
  selected: string;
}

const BreadCrumb: React.FC<PropsWithChildren<BreadCrumbProps>> = ({
  items,
  selected,
}) => {
  return (
    <BreadCrumberContainer>
      {items.map((item) => (
        <React.Fragment key={item}>
          <BreadCrumberItem isSelected={selected == item}>
            {item}
          </BreadCrumberItem>
          <span> &gt; </span>
        </React.Fragment>
      ))}
    </BreadCrumberContainer>
  );
};

export default BreadCrumb;
