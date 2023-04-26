import { ComponentMeta, ComponentStory } from "@storybook/react";

import DataList from "./DataList";
import { Button } from "@mui/material";

export default {
  title: "data-display/DataList",
  component: DataList,
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = (args) => (
  <DataList
    header={
      <div>
        Data: 05/05/2022
        <br />
        Limpeza simples
      </div>
    }
    body={
      <div>
        Cidade: São Paulo
        <br />
        Número de cômodos
      </div>
    }
    actions={
      <Button variant="contained" color="secondary">
        Se candidatar
      </Button>
    }
  />
);

export const Default = Template.bind({});

Default.args = {};
