import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import {
  SideInformationContainer,
  SideInformationHeader,
  SideInformationFooter,
  SideInformationItem,
} from "./SideInformation.styled";
import Index from "pages";

export interface SideInformationProps {
  title?: string;
  items: {
    title: string;
    descricao: string[];
    icon?: string;
  }[];
  footer?: {
    text: string;
    icon: string;
  };
}

const SideInformation: React.FC<PropsWithChildren<SideInformationProps>> = (
  props
) => {
  return (
    <SideInformationContainer>
      {props.title && (
        <SideInformationHeader>
          <h3>{props.title}</h3>
        </SideInformationHeader>
      )}
      <ul>
        {props.items.map((item, index) => {
          return (
            <SideInformationItem key={index}>
              {item.icon && <i className={item.icon} />}
              <div>
                <h4>{item.title}</h4>
                <ul>
                  {item.descricao.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            </SideInformationItem>
          );
        })}
      </ul>
      {props.footer && (
        <SideInformationFooter>
          {props.footer?.icon && <i className={props.footer.icon} />}
          {props.footer?.text}
        </SideInformationFooter>
      )}
    </SideInformationContainer>
  );
};

export default SideInformation;
