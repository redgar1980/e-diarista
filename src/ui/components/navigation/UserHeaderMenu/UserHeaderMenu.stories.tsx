import { ComponentMeta, ComponentStory } from "@storybook/react";

import UserHeaderMenu from "./UserHeaderMenu";
import { UserType } from "data/@types/UserInterface";

export default {
  title: "navigation/UserHeaderMenu",
  component: UserHeaderMenu,
} as ComponentMeta<typeof UserHeaderMenu>;

const Template: ComponentStory<typeof UserHeaderMenu> = (args) => (
  <UserHeaderMenu {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    nome_completo: "Rodrigo Custodio",
    nascimento: "2000-01-01",
    cpf: "13793683400",
    email: "fernando_pedro_alves@asconnet.com.br",
    foto_usuario: "https://github.com/redgar1980.png",
    telefone: "(99)9999-9999",
    tipo_usuario: UserType.Cliente,
    reputacao: 0,
    password: "",
    chave_pix: "",
  },
  isMenuOpen: false,
};
