import { ComponentMeta, ComponentStory } from "@storybook/react";

import UserProfileAvatar from "./UserProfileAvatar";
import { UserType } from "data/@types/UserInterface";

export default {
  title: "data-display/UserProfileAvatar",
  component: UserProfileAvatar,
} as ComponentMeta<typeof UserProfileAvatar>;

const Template: ComponentStory<typeof UserProfileAvatar> = (args) => (
  <UserProfileAvatar {...args} />
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
};
